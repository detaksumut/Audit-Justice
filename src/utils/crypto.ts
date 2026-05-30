import jwt from 'jsonwebtoken';

const LICENSE_SECRET = 'AuditJusticeSecret2026!@#';

export function generateLicenseKey(hwid: string): string {
  // Buat token yang valid selamanya untuk hwid tersebut
  return jwt.sign({ hwid }, LICENSE_SECRET);
}
