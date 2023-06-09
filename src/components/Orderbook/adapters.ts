import { DataAdapters, OrderBookData } from './Orderbook.types';

const dataAdapters: DataAdapters = {
  zeta: async (apiUrl: string) => {
    const result: { orderbooks: OrderBookData[] } = await fetch(apiUrl).then(
      (res) => res.json()
    );
    return result.orderbooks[0];
  },
};

export default dataAdapters;
