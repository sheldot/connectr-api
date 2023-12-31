export enum SourceEnum {
  AIRSTACK = "AIRSTACK",
  ETHERSCAN = "ETHERSCAN",
  DEFI_LLAMA = "DEFI_LLAMA",
  SUBGRAPH = "SUBGRAPH",
}

export enum ProductTypeEnum {
  DEX = "DEX",
  LENDING = "LENDING",
  MISC = "MISC",
  TOKEN = "TOKEN",
}

// DEX DETAILS

export enum DexProductEnum {
  // BALANCER = "BALANCER",
  CURVE = "CURVE",
  PANCAKESWAP = "PANCAKESWAP",
  SUSHISWAP = "SUSHISWAP",
  // UNISWAP_V2 = "UNISWAP_V2",
  UNISWAP_V3 = "UNISWAP_V3",
}

export const DexProductNames = {
  // [DexProductEnum.BALANCER]: "Balancer",
  [DexProductEnum.CURVE]: "Curve",
  [DexProductEnum.PANCAKESWAP]: "Pancake Swap",
  [DexProductEnum.SUSHISWAP]: "Sushi Swap",
  // [DexProductEnum.UNISWAP_V2]: "Uniswap V2",
  [DexProductEnum.UNISWAP_V3]: "Uniswap V3",
};

export enum DexFieldEnum {
  COUNT_DEPOSITS = "COUNT_DEPOSITS",
  COUNT_SWAPS = "COUNT_SWAPS",
  COUNT_WITHDRAWALS = "COUNT_WITHDRAWALS",
  COUNT_UNIQUE_LPS = "COUNT_UNIQUE_LPS",
  COUNT_UNIQUE_USERS = "COUNT_UNIQUE_USERS",
  SUM_DEPOSITS_TOKEN_1 = "SUM_DEPOSITS_TOKEN_1",
  SUM_DEPOSITS_TOKEN_2 = "SUM_DEPOSITS_TOKEN_2",
  SUM_SWAPS_TOKEN_1 = "SUM_SWAPS_TOKEN_1",
  SUM_SWAPS_TOKEN_2 = "SUM_SWAPS_TOKEN_2",
  SUM_WITHDRAWALS_TOKEN_1 = "SUM_WITHDRAWALS_TOKEN_1",
  SUM_WITHDRAWALS_TOKEN_2 = "SUM_WITHDRAWALS_TOKEN_2",
  TVL = "TVL",
}

export const DexFieldNames = {
  [DexFieldEnum.COUNT_DEPOSITS]: "Deposit Transaction Count",
  [DexFieldEnum.COUNT_SWAPS]: "Swap Transaction Count",
  [DexFieldEnum.COUNT_WITHDRAWALS]: "Withdraw Transaction Count",
  [DexFieldEnum.COUNT_UNIQUE_LPS]: "Unique LPs Count",
  [DexFieldEnum.COUNT_UNIQUE_USERS]: "Unique Users Count",
  [DexFieldEnum.SUM_DEPOSITS_TOKEN_1]: "Sum of deposits for token 1",
  [DexFieldEnum.SUM_DEPOSITS_TOKEN_2]: "Sum of deposits for token 2",
  [DexFieldEnum.SUM_SWAPS_TOKEN_1]: "Sum of swaps for token 1",
  [DexFieldEnum.SUM_SWAPS_TOKEN_2]: "Sum of swaps for token 2",
  [DexFieldEnum.SUM_WITHDRAWALS_TOKEN_1]: "Sum of withdraws for token 1",
  [DexFieldEnum.SUM_WITHDRAWALS_TOKEN_2]: "Sum of withdraws for token 2",
  [DexFieldEnum.TVL]: "TVL",
};

// LENDING DETAILS

export enum LendingProductEnum {
  AAVE_V2 = "AAVE_V2",
  AAVE_V3 = "AAVE_V3",
  COMPOUND = "COMPOUND",
  MORPHO = "MORPHO",
}

export const LendingProductNames = {
  [LendingProductEnum.AAVE_V2]: "Aave V2",
  [LendingProductEnum.AAVE_V3]: "Aave V3",
  [LendingProductEnum.COMPOUND]: "Compound",
  [LendingProductEnum.MORPHO]: "Morpho",
};

export enum LendingFieldEnum {
  COUNT_TRANSACTIONS = "COUNT_TRANSACTIONS",
  COUNT_TRANSACTIONS_BORROW = "COUNT_TRANSACTIONS_BORROW",
  COUNT_TRANSACTIONS_SUPPLY = "COUNT_TRANSACTIONS_SUPPLY",
  COUNT_UNIQUE_BORROWERS = "COUNT_UNIQUE_BORROWERS",
  COUNT_UNIQUE_SUPPLIERS = "COUNT_UNIQUE_SUPPLIERS",
  RATE_APR = "RATE_APR",
  RATE_APY = "RATE_APY",
  SUM_AMOUNT_BORROW = "SUM_AMOUNT_BORROW",
  SUM_AMOUNT_SUPPLY = "SUM_AMOUNT_SUPPLY",
  TVL = "TVL",
}

export const LendingFieldNames = {
  [LendingFieldEnum.COUNT_TRANSACTIONS]: "Transaction Count",
  [LendingFieldEnum.COUNT_TRANSACTIONS_BORROW]: "Borrow Transaction Count",
  [LendingFieldEnum.COUNT_TRANSACTIONS_SUPPLY]: "Supply Transaction Count",
  [LendingFieldEnum.COUNT_UNIQUE_BORROWERS]: "Unique Borrowers Count",
  [LendingFieldEnum.COUNT_UNIQUE_SUPPLIERS]: "Unique Suppliers Count",
  [LendingFieldEnum.RATE_APR]: "APR",
  [LendingFieldEnum.RATE_APY]: "APY",
  [LendingFieldEnum.SUM_AMOUNT_BORROW]: "Total Borrow Amount",
  [LendingFieldEnum.SUM_AMOUNT_SUPPLY]: "Total Supply Amount",
  [LendingFieldEnum.TVL]: "TVL",
};

// MISC DETAILS

export enum MiscProductEnum {
  GAS = "GAS",
}

export const MiscProductNames = {
  [MiscProductEnum.GAS]: "Gas",
};

export enum MiscFieldEnum {
  GAS_PRICE = "GAS_PRICE",
}

export const MiscFieldNames = {
  [MiscFieldEnum.GAS_PRICE]: "Gas Price",
};

// TOKEN DETAILS

export enum TokenProductEnum {
  BUSD = "BUSD",
  DAI = "DAI",
  USDC = "USDC",
  USDT = "USDT",

  CBETH = "CBETH",
  RETH = "RETH",
  STETH = "STETH",

  WETH = "WETH",
  MATIC = "MATIC",
  WBTC = "WBTC",
}

export const TokenProductNames = {
  [TokenProductEnum.BUSD]: "BUSD",
  [TokenProductEnum.DAI]: "DAI",
  [TokenProductEnum.USDC]: "USD Coin",
  [TokenProductEnum.USDT]: "USDT",

  [TokenProductEnum.CBETH]: "Coinbase Wrapped Staked ETH",
  [TokenProductEnum.RETH]: "RocketPool rETH",
  [TokenProductEnum.STETH]: "Lido stETH",

  [TokenProductEnum.WETH]: "Wrapped Ether",
  [TokenProductEnum.MATIC]: "Polygon MATIC",
  [TokenProductEnum.WBTC]: "Wrapped Bitcoin",
};

export enum TokenFieldEnum {
  PRICE = "PRICE",
  TOKEN_VOLUME = "TOKEN_VOLUME",
  COUNT_TRANSACTIONS = "COUNT_TRANSACTIONS",
}

export const TokenFieldNames = {
  [TokenFieldEnum.PRICE]: "Price",
  [TokenFieldEnum.TOKEN_VOLUME]: "Nominal token volume",
  [TokenFieldEnum.COUNT_TRANSACTIONS]: "Transaction count",
};

export enum ActionTypeEnum {
  SWAP = "SWAP",
  TRANSFER = "TRANSFER",
}

export enum ISwapEnum {
  "amount" = "amount",
  "tokenIn" = "tokenIn",
  "tokenOut" = "tokenOut",
}
export interface ISwap {
  [ISwapEnum.amount]: string;
  [ISwapEnum.tokenIn]: TokenProductEnum;
  [ISwapEnum.tokenOut]: TokenProductEnum;
}
const checks = {
  string: (variable: any) => typeof variable === "string",
  token: (variable: any) => Object.values(TokenProductEnum).includes(variable),
};

export const swapChecks: Record<ISwapEnum, Function> = {
  [ISwapEnum.amount]: checks.string,
  [ISwapEnum.tokenIn]: checks.token,
  [ISwapEnum.tokenOut]: checks.token,
};

export enum ITransferEnum {
  "amount" = "amount",
  "token" = "token",
}
export interface ITransfer {
  [ITransferEnum.amount]: string;
  [ITransferEnum.token]: string;
}

export const transferChecks: Record<ITransferEnum, Function> = {
  [ITransferEnum.amount]: checks.string,
  [ITransferEnum.token]: checks.token,
};

export const checkerSet: Record<
  ActionTypeEnum,
  any
  // Record<ISwapEnum, Function> | Record<ITransferEnum, Function>
> = {
  [ActionTypeEnum.SWAP]: swapChecks,
  [ActionTypeEnum.TRANSFER]: transferChecks,
};

const checkAllFields = (actionType: ActionTypeEnum, keyEnums: any, obj: any) =>
  Object.keys(keyEnums).reduce(
    (previous, currentKey: any) =>
      previous &&
      currentKey in obj &&
      (checkerSet[actionType][currentKey] as any)(obj[currentKey]),
    true
  );

export const checkActionTypePayload = {
  [ActionTypeEnum.SWAP]: (obj: any): obj is ISwap =>
    checkAllFields(ActionTypeEnum.SWAP, ISwapEnum, obj),
  [ActionTypeEnum.TRANSFER]: (obj: any): obj is ITransfer =>
    checkAllFields(ActionTypeEnum.TRANSFER, ITransferEnum, obj),
};

export enum OperatorEnum {
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  EQUALS = "EQUALS",
}
