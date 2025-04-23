interface ConversionRequestFrom {
  from: number;
  to: number;
  fromAmount: number;
  toAmount?: never;
}

interface ConversionRequestTo {
  from: number;
  to: number;
  fromAmount?: never;
  toAmount: number;
}

export type ConversionRequest = ConversionRequestFrom | ConversionRequestTo;
