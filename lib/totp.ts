import { authenticator } from "otplib";

export function generateTOTP(secret: string) {
  return authenticator.generate(secret);
}

export function verifyTOTP(secret: string, token: string) {
  return authenticator.verify({ token, secret });
}

export function generateTOTPSecret() {
  return authenticator.generateSecret();
}
