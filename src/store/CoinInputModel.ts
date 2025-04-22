import { makeAutoObservable } from "mobx";
import { Coin } from "@/models";

type OnChangeCallback = () => Promise<void>;

export class CoinInputModel {
  amount: number = 0;
  coin: Coin | null = null;

  isLoading = false;

  onChange: OnChangeCallback;

  constructor(onChange: OnChangeCallback) {
    this.onChange = onChange;

    makeAutoObservable(this);
  }

  setAmount = (amount: number): void => {
    this.amount = amount;
  };

  setCoin = (coin: Coin): void => {
    this.coin = coin;
  };

  changeCoin = (coin: Coin): void => {
    this.coin = coin;

    this.onChange();
  }

  changeAmount = (amount: number): void => {
    this.amount = amount;

    this.onChange();
  }
}
