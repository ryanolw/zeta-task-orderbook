import React, { useState, useTransition } from 'react';
import type { EnrichedOrderProp } from '../Orderbook.types';
import { Box, HStack, Text, useUpdateEffect } from '@chakra-ui/react';
import { COLUMN_WIDTHS } from '../Orderbook.constants';

export default function OrderEntry({
  colorScheme,
  order,
}: {
  colorScheme: string;
  order: EnrichedOrderProp;
}) {
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [_, startTransition] = useTransition();

  useUpdateEffect(() => {
    setShouldUpdate(true);
    setTimeout(() => {
      startTransition(() => {
        setShouldUpdate(false);
      });
    }, transitionDelayMs);
  }, [order.size, order.price]);

  const transitionDelayMs = 200;

  return (
    <HStack position="relative" py={1} px={2}>
      <Box
        top={0}
        left={0}
        zIndex={-1}
        h="100%"
        transition={
          shouldUpdate ? '' : `background-color ${transitionDelayMs}ms linear`
        }
        bgColor={`${colorScheme}.${shouldUpdate ? '200' : '100'}`}
        w={`${order.cumulativeTotalPct}%`}
        position="absolute"
      ></Box>
      <Text w={COLUMN_WIDTHS[0]} color={`${colorScheme}.600`}>
        {order.price.toFixed(3)}
      </Text>
      <Text w={COLUMN_WIDTHS[1]}>{order.size.toFixed(3)}</Text>
    </HStack>
  );
}
