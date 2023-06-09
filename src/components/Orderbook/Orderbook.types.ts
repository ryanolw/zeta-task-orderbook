export type OrderBookData = { bids: Order[]; asks: Order[] };

type DataAdapter = (apiUrl: string) => Promise<OrderBookData>;

export type DataAdapters = Record<'zeta', DataAdapter>;

export type Order = {
  price: number;
  size: number;
};
export type EnrichedOrderProp = {
  cumulativeTotalPct: number;
  orderTotal: number;
  cumulativeTotal: number;
  price: number;
  size: number;
};

export type OrderbookProps = {
  /**
   * API endpoint to retrieve the orderbook data.
   */
  apiUrl: string;

  /**
   * Name of the whitelisted dataAdapter to use. The data adapter is responsible for transforming data retrieved from `apiUrl` to a structure that is understood by the Orderbook component. default: "zeta"
   * A custom data adapter can also be used by passing in a function. The function will receive an `apiUrl` argument and should return an object that satisfies the `OrderBookData` type.
   */
  dataAdapter: keyof DataAdapters | DataAdapter;

  /**
   * Interval (in milliseconds) to poll `apiUrl` for new data. Default: 5000
   */
  pollingIntervalMs?: number;
};
