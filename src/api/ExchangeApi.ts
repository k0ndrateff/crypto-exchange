import axios from "axios";
import {Coin, ConversionResult} from "@/models";
import {ApiRoutes} from "./ApiRoutes";
import {ConversionRequest} from "@/models/ConversionRequest.ts";

class ExchangeApi {
  private _axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
  });

  getCoins = async (): Promise<Coin[]> => {
    const response = await this._axios.get(ApiRoutes.GET_COINS);

    return response.data;
  };

  convertCoins = async (request: ConversionRequest): Promise<ConversionResult> => {
    const response = await this._axios.get(ApiRoutes.CONVERT_COINS, { params: request });

    return response.data;
  };
}

export const exchangeApi = new ExchangeApi();
