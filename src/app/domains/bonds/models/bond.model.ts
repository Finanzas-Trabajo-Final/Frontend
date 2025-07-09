export interface Bond {
  faceValue: number;
  commercialValue: number;
  interestRateType: string;
  annualInterestRate: number;
  capitalizationPeriod: number;
  termInYears: number;
  paymentFrequencyInMonths: number;
  totalGraceMonths: number;
  partialGraceMonths: number;
  currency: string;
  discountRate: number;
  incomeTaxRate: number;
  disbursementDate: string;
  premiumPercentage: number;
  structuringCostPercentage: number;
  placementCostPercentage: number;
  flotationCostPercentage: number;
  cavaliCostPercentage: number;
}

