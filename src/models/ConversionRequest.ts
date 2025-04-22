interface ConversionRequestBase {
  from: number;
  to: number;
}

interface ConversionRequestFrom extends ConversionRequestBase {
  fromAmount: number;
}

interface ConversionRequestTo extends ConversionRequestBase {
  toAmount: number;
}

export type ConversionRequest = ConversionRequestFrom | ConversionRequestTo;
