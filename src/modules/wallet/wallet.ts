import convert from "../exchange/convert";
import * as E from "../exchange/types";
import {IWallet} from "./types";

export default class Wallet implements IWallet {
  constructor(private currencies: E.ICurrencies) { }

  public exchange(rates: E.ICurrencies, base: E.Currency, target: E.Currency, exchangeValue: number): IWallet {
    if (exchangeValue > this.currencies[base]) {
      throw new Error("not enough balance");
    }
    this.currencies[base] -= exchangeValue;
    this.currencies[target] += convert(rates, base, target, exchangeValue);
    return this;
  }
}
