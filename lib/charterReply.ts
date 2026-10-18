// The automatic reply to a Charter applicant (owner, 2026-10-18: "send an automatic response to people that have
// applied for charter membership that comes from a directivefitness.com email address"). Sent from MAIL_FROM
// (info@directivefitness.com by default) through Resend; replies go to support@. Claude's draft wording, for the
// owner to approve; change it here only.

export const CHARTER_REPLY = {
  subject: "Your Directive Charter application is in",
  text: [
    "Hi,",
    "",
    "Thanks for applying to the Directive Charter. Your application came through.",
    "",
    "What happens next: Directive is in a private beta on iPhone, through Apple's TestFlight app. When a place opens for you, I'll email this address with an invitation and the steps to install it.",
    "",
    "There's nothing else you need to do for now. If you have a question, reply to this email.",
    "",
    "Ray",
    "Founder, Directive",
    "",
    "We do the math. You make the decisions.",
    "",
    "--",
    "You're receiving this because this address was used to apply for the Directive Charter at directivefitness.com. If that wasn't you, reply and we'll delete your application.",
  ].join("\n"),
  replyTo: () => process.env.CHARTER_REPLY_TO || "support@directivefitness.com",
};
