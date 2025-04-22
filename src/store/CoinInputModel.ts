import { makeAutoObservable } from "mobx";
import { Coin } from "@/models";

export class CoinInputModel {
  amount: number = 0;
  coin: Coin | null = null;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAmount = (amount: number): void => {
    this.amount = amount;
  };

  setCoin = (coin: Coin): void => {
    this.coin = coin;
  };
}
