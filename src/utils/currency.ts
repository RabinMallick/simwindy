// utils/currency.ts
export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'AED':
      return 'د.إ'; // AED symbol
    case 'USD':
      return '$';  // US Dollar
    case 'BDT':
      return '৳'; // Bangladeshi Taka
    default:
      return currency; // fallback: just show currency code
  }
};
