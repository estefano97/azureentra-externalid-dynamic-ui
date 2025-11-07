type EmailType = "educational" | "public" | "private";

export function classifyEmailType(email: string): EmailType {
  if (!email || !email.includes("@")) return "private";

  const domain = email.split("@")[1].toLowerCase();

  // List of public domains
  const publicDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "live.com",
    "icloud.com",
    "msn.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
  ];

  // filter educational domains
  if (domain.includes(".edu") || domain.includes(".ac")) {
    return "educational";
  }

  // filter public domains
  if (publicDomains.some(pub => domain.endsWith(pub))) {
    return "public";
  }

  // Everythin else is considered private (Enterprise)
  return "private";
}
