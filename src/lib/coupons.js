export const couponCodes = {
  LUXE10: { code: "LUXE10", discount: 0.1, description: "10% off your order" },
  WELCOME15: { code: "WELCOME15", discount: 0.15, description: "15% off for new members" },
};

export function getCoupon(code) {
  if (!code) return null;
  return couponCodes[code.trim().toUpperCase()] ?? null;
}
