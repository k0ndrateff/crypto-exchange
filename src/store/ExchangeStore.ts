import { makeAutoObservable } from "mobx";
import {Coin, ConversionRequest, ConversionResult} from "@/models";
import { exchangeApi } from "@/api";
import {CoinInputModel} from "@/store/CoinInputModel.ts";

class ExchangeStore {
  coins: Coin[] = [];
  areCoinsLoading = false;

  conversion: ConversionResult | null = null;

  sourceModel: CoinInputModel;
  targetModel: CoinInputModel;

  constructor() {
    this.sourceModel = new CoinInputModel();
    this.targetModel = new CoinInputModel();

    makeAutoObservable(this);
  }

  get rateDisplay() {
    if (!this.sourceModel.coin || !this.targetModel.coin || !this.conversion)
      return `##########`;

    return `1 ${this.sourceModel.coin.symbol} ≈ ${this.conversion.estimatedAmount} ${this.targetModel.coin.symbol}`;
  }

  initialize = async (): Promise<void> => {
    try {
      this.areCoinsLoading = true;

      this.coins = await exchangeApi.getCoins();

      if (!this.coins.length)
        console.error("No coins found on API");

      this.sourceModel.setCoin(this.coins[0]);
      this.targetModel.setCoin(this.coins[1]);
      this.sourceModel.setAmount(1);

      await this.convertFrom();
    }
    catch (error) {
      console.log(`Failed to fetch coins from API: ${error}`);
    }
    finally {
      this.areCoinsLoading = false;
    }
  };

  convertFrom = async (): Promise<void> => {
    if (!this.sourceModel.coin || !this.targetModel.coin)
      return;

    try {
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
}

export const exchangeStore = new ExchangeStore();
