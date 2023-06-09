import { BoxProps } from '@chakra-ui/react';

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
   * (Required) A function that retrieves orderbook data when called. A map of whitelisted data adapters are passed into this function as the first argument for convenience.
   *
   * A custom data adapter implementation can also be used - this function should return an object that satisfies the `OrderBookData` type.
   * Examples:
   * ```ts
   * <Orderbook
   *    dataAdapter={() => fetch('<datasource URL>').then(res => res.json())}
   *    pollingIntervalMs={5000} />
   * ```
   *
   * ```ts
   * <Orderbook
   *    dataAdapter={() => localStore.retrieveOrderData()}
   *    pollingIntervalMs={5000} />
   * ```
   */
  dataAdapter: (
    whitelistedAdapters: DataAdapters
  ) => Promise<OrderBookData> | OrderBookData;

  /**
   * Interval (in milliseconds) to invoke `dataAdapter` for new data. Default: 5000
   */
  pollingIntervalMs?: number;

  /**
   * Optional CSS classname that will be passed to the Orderbook container element
   */
  className?: string;

  /**
   * Optional Chakra UI Box props that will be passed to the Orderbook container element
   */
  containerStyles?: BoxProps;
};
