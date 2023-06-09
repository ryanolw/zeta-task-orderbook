import React, { useMemo } from 'react';
import type { Order } from '../Orderbook.types';
import { Stack, StackDirection } from '@chakra-ui/react';
import OrderEntry from './OrderEntry';

export default function OrderGroup({
  data,
  colorScheme,
  direction = 'up',
}: {
  data: Order[];
  colorScheme: string;
  direction?: 'up' | 'down';
}) {
  const enrichedData = useMemo(() => {
    if (!data.length) return [];
    let cumulativeTotal = 0;
    const res = data.map((order) => {
      const orderTotal = order.price * order.size;
      cumulativeTotal += orderTotal;
      return {
        ...order,
        orderTotal,
        cumulativeTotal,
      };
    });
    const finalTotal = res[res.length - 1].cumulativeTotal;

    return res.map((order) => ({
      ...order,
      cumulativeTotalPct: (order.cumulativeTotal / finalTotal) * 100,
    }));
  }, [data]);

  const containerStyle = useMemo(
    () =>
      ({
        up: 'column-reverse',
        down: 'column',
      }[direction] as StackDirection),
    [direction]
  );

  return (
    <Stack direction={containerStyle} spacing={0}>
      {enrichedData.map((order, idx) => (
        <OrderEntry key={idx} colorScheme={colorScheme} order={order} />
      ))}
    </Stack>
  );
}
