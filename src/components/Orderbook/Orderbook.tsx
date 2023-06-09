import { useInterval } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { OrderBookData, OrderbookProps } from './Orderbook.types';
import dataAdapters from './adapters';
import OrderbookBase from './components/OrderbookBase';

export default function Orderbook({
  dataAdapter,
  pollingIntervalMs = 5000,
  className,
  containerStyles,
}: OrderbookProps) {
  const [data, setData] = useState<OrderBookData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const fetchOrderData = async () => {
    try {
      const orderData = await dataAdapter(dataAdapters);
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

  return (
    <OrderbookBase
      data={data}
      error={error}
      className={className}
      containerStyles={containerStyles}
    />
  );
}
