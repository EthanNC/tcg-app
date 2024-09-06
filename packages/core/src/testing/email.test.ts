import { describe, expect, test } from "vitest";
import { Email } from "../email";
import { MailSlurp } from "mailslurp-client";

describe(
  "Email.send",
  {
    timeout: 120_000,
  },
  async () => {
    test("sends an email with Ses", async () => {
      const mailslurp = new MailSlurp({
        apiKey: process.env.MAILSLURP_API_TOKEN!,
      });
      const inbox = await mailslurp.inboxController.createInboxWithDefaults();
      const to = inbox.emailAddress;
      const body = "This is a test email";

      await Email.send(to, "test", body);
      const email = await mailslurp.waitForLatestEmail(inbox.id, 120_000, true);
      expect(email.subject).toBe("test");
    });
  }
);
