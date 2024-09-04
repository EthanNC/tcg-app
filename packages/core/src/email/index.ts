import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { Resource } from "sst";
import { db } from "../drizzle";
import { zod } from "../utils/zod";
import { z } from "zod";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { emailVerificationCode } from "./verification-code.sql";
import { eq } from "drizzle-orm";

export module Email {
  const ses = new SESv2Client({});

  const Schema = z.object({
    email: z.string().email(),
    code: z.string().length(6),
    userId: z.string().uuid(),
    expiresAt: z.date(),
  });

  export async function send(
    from: string,
    to: string,
    subject: string,
    body: string
  ) {
    console.log("sending email", subject, from, to);
    await ses.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [to],
        },
        Content: {
          Simple: {
            Body: {
              Text: {
                Data: body,
              },
            },
            Subject: {
              Data: subject,
            },
          },
        },
        FromEmailAddress: `TCG-app <${Resource.Email.sender}>`,
      })
    );
  }

  export const generateVerificationCode = zod(
    Schema.omit({ code: true, expiresAt: true }),
    async (data) => {
      await db
        .delete(emailVerificationCode)
        .where(eq(emailVerificationCode.userId, data.userId))
        .execute();

      const code = generateRandomString(6, alphabet("0-9"));

      const [verification] = await db
        .insert(emailVerificationCode)
        .values({
          ...data,
          code,
          expiresAt: createDate(new TimeSpan(5, "m")),
        })
        .returning();

      return verification;
    }
  );
}
