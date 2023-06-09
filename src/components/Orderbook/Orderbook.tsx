import { useInterval } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { OrderBookData, OrderbookProps } from './Orderbook.types';
import dataAdapters from './adapters';
import OrderbookBase from './components/OrderbookBase';

export default function Orderbook({
  apiUrl,
  dataAdapter = 'zeta',
  pollingIntervalMs = 5000,
}: OrderbookProps) {
  const [data, setData] = useState<OrderBookData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const fetchOrderData = async () => {
    const orderDataFetcher =
      typeof dataAdapter === 'function'
        ? dataAdapter
        : dataAdapters[dataAdapter];
    try {
      const orderData: OrderBookData = await orderDataFetcher(apiUrl);
      setData(orderData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  };

  useEffect(() => {
    // useInterval hook starts after initial delay, so manually trigger a fetch right after mounting
    fetchOrderData();
  }, []);

  useInterval(() => {
    fetchOrderData();
  }, pollingIntervalMs);

  return <OrderbookBase data={data} error={error} />;
}
