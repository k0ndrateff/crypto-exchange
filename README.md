# Crypto Exchange Widget 💰

Take a look at [Live Example](https://crypto-exchange-lac.vercel.app/)!

## Goal

Create a functional crypto exchange widget, that works with custom API. It should support converting to and from 
different cryptocurrencies, searching a list of currencies, swapping them and displaying the exchange rate.

## Technologies

The widget was built using:

* React
* TypeScript
* Vite
* MobX
* SCSS Modules
* Radix-UI Primitives
* Radix Icons and Chikin Icons

## Run application

`VITE_BASE_API_URL` environment variable is required to run the application. Should be specified in the `.env` or `.env.local` file in the root directory.

```bash
# Clone the repo to an empty directory
git clone https://github.com/k0ndrateff/crypto-exchange . 

# Install dependencies
npm install

# Start application
npm run dev
```

## Implementation Details

Logic is organized based on __separation of concerns__ principle. `ExchangeStore` handles all business logic, such 
as storing currencies, performing exchanges and other. `CoinInputModel` just stores current amount and selected 
coin and does not know anything about exchanges. 

