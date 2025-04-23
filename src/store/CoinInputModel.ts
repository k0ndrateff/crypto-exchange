import { makeAutoObservable } from "mobx";
import { Coin } from "@/models";

type OnChangeCallback = () => void;

export class CoinInputModel {
  amount: number = 0;
  coin: Coin | null = null;

  isLoading = false;
  error: string | null = null;

  onChange?: OnChangeCallback;

  constructor() {
    makeAutoObservable(this);
  }

  onChangeCb = (onChange: OnChangeCallback) => {
    this.onChange = onChange;

    return this;
  };

  setAmount = (amount: number): void => {
    this.amount = amount;
  };

  setCoin = (coin: Coin): void => {
    this.coin = coin;
  };

  changeCoin = (coin: Coin): void => {
    this.setCoin(coin);

    this.onChange?.();
  }

  changeAmount = (amount: number): void => {
    if (amount < 0) {
      this.error = "Amount must be positive";
    }
    else {
      this.error = null;
    }

    this.setAmount(amount);

    this.onChange?.();
  }
}
