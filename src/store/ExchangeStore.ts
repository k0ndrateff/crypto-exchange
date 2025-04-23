import { makeAutoObservable } from "mobx";
import { Coin, ConversionRequest, ConversionResult } from "@/models";
import { exchangeApi } from "@/api";
import { CoinInputModel } from "@/store/CoinInputModel";
import { debounce } from "@/helpers";

const EXCHANGE_DEBOUNCE = 350;

class ExchangeStore {
  coins: Coin[] = [];
  areCoinsLoading = false;

  conversion: ConversionResult | null = null;
  successMessage: string | null = null;

  sourceModel: CoinInputModel;
  targetModel: CoinInputModel;

  constructor() {
    this.sourceModel = new CoinInputModel().onChangeCb(debounce(this.convertFrom, EXCHANGE_DEBOUNCE));
    this.targetModel = new CoinInputModel().onChangeCb(debounce(this.convertTo, EXCHANGE_DEBOUNCE));

    makeAutoObservable(this);
  }

  get isLoading(): boolean {
    return !this.sourceModel.coin || !this.targetModel.coin || !this.conversion || this.sourceModel.isLoading || this.targetModel.isLoading;
  }

  get rateDisplay(): string {
    if (!this.sourceModel.coin || !this.targetModel.coin || !this.conversion || this.sourceModel.isLoading || this.targetModel.isLoading)
      return `##########`;

    return `1 ${this.sourceModel.coin.symbol} ≈ ${this.conversion.rate.toFixed(6)} ${this.targetModel.coin.symbol}`;
  }

  initialize = async (): Promise<void> => {
    try {
      this.areCoinsLoading = true;
      this.targetModel.isLoading = true;
      this.sourceModel.setAmount(1);

      this.coins = await exchangeApi.getCoins();

      if (!this.coins.length)
        console.error("No coins found on API");

      this.sourceModel.setCoin(this.coins[0]);
      this.targetModel.setCoin(this.coins[1]);

      await this.convertFrom();
    }
    catch (error) {
      console.log(`Failed to fetch coins from API: ${error}`);
    }
    finally {
      this.targetModel.isLoading = false;
      this.areCoinsLoading = false;
    }
  };

  convertFrom = async (): Promise<void> => {
    if (!this.sourceModel.coin || !this.targetModel.coin || this.sourceModel.error)
      return;

    try {
      this.targetModel.clearError();
      this.targetModel.isLoading = true;

      const request: ConversionRequest = {
        from: this.sourceModel.coin.id,
        to: this.targetModel.coin.id,
        fromAmount: this.sourceModel.amount
      };

      this.conversion = await exchangeApi.convertCoins(request);
      this.targetModel.setAmount(this.conversion.estimatedAmount);
    }
    catch (error) {
      console.log(`Failed to perform conversion from API: ${error}`);
    }
    finally {
      this.targetModel.isLoading = false;
    }
  };

  convertTo = async (): Promise<void> => {
    if (!this.sourceModel.coin || !this.targetModel.coin || this.targetModel.error)
      return;

    try {
      this.sourceModel.clearError();
      this.sourceModel.isLoading = true;

      const request: ConversionRequest = {
        from: this.sourceModel.coin.id,
        to: this.targetModel.coin.id,
        toAmount: this.targetModel.amount,
      };

      this.conversion = await exchangeApi.convertCoins(request);
      this.sourceModel.setAmount(this.conversion.estimatedAmount);
    }
    catch (error) {
      console.log(`Failed to perform conversion from API: ${error}`);
    }
    finally {
      this.sourceModel.isLoading = false;
    }
  };

  swapCoins = (): void => {
    if (!this.sourceModel.coin || !this.targetModel.coin)
      return;

    const targetCoin = this.targetModel.coin;
    const targetAmount = this.targetModel.amount;

    this.targetModel.setCoin(this.sourceModel.coin);
    this.targetModel.setAmount(this.sourceModel.amount);
    this.sourceModel.setAmount(targetAmount);
    this.sourceModel.setCoin(targetCoin);

    this.convertFrom();
  };

  exchange = async (): Promise<void> => {
    if (this.successMessage || !this.sourceModel.coin || !this.targetModel.coin || this.targetModel.error || this.sourceModel.error || !this.conversion)
      return;

    this.successMessage = `Exchanged ${this.sourceModel.amount.toFixed(6)} $${this.sourceModel.coin.symbol} to ${this.targetModel.amount.toFixed(6)} $${this.targetModel.coin.symbol}`;

    setTimeout(() => {
      this.successMessage = null;
    }, 5000);
  };
}

export const exchangeStore = new ExchangeStore();
