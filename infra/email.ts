export const email = new sst.aws.Email("Email", {
  sender: $dev ? "ethannc.dev" : "tcg@ethannc.dev",
  dns: $dev && sst.cloudflare.dns(),
});
