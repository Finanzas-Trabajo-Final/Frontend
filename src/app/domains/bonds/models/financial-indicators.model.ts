export interface FinancialIndicators {
  paymentFrequencyDays: number;
  capitalizationDays: number;
  periodsPerYear: number;
  totalPeriods: number;
  annualEffectiveRate: number;
  periodicEffectiveRate: number;
  periodicDiscountRate: number;
  issuerInitialCosts: number;
  bondholderInitialCosts: number;
  currentPrice: number;
  profitOrLoss: number;
  duration: number;
  convexity: number;
  totalDurationPlusConvexity: number;
  modifiedDuration: number;
  tceaIssuer: number;
  tceaIssuerWithShield: number;
  treaBondholder: number;
} 