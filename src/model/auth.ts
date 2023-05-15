export interface AuthRequest {
  platformType: number;
  platformVersion: string;
  deviceId: string;
  pnsToken: string;
  bundleId: string;
  state?: string;
}
