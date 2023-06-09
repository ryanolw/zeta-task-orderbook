import { Box, BoxProps, Center, HStack, Text } from '@chakra-ui/react';
import { COLUMN_WIDTHS } from '../Orderbook.constants';
import type { Order } from '../Orderbook.types';
import OrderGroup from './OrderGroup';

export default function OrderbookBase({
  data,
  error,
  className,
  containerStyles,
}: {
  data: { bids: Order[]; asks: Order[] } | null;
  error: Error | null;
  className?: string;
  containerStyles?: BoxProps;
}) {
  return (
    <Box
      h="50ch"
      overflow="auto"
      position="relative"
      borderRadius="md"
      className={className}
      {...containerStyles}
    >
      <HStack
        position="sticky"
        top={0}
        zIndex={2}
        fontWeight="semibold"
        color="gray.600"
        px={2}
        py={1}
        bgColor="gray.100"
      >
        <Text w={COLUMN_WIDTHS[0]}>Price</Text>
        <Text w={COLUMN_WIDTHS[1]}>Size</Text>
      </HStack>
      {error ? (
        <Center bgColor="gray.50" h="100%">
          An error occured when attempting to retrieve new data.
        </Center>
      ) : data ? (
        <>
          <OrderGroup data={data.asks} colorScheme="green" direction="up" />
          <OrderGroup data={data.bids} colorScheme="red" direction="down" />
        </>
      ) : (
        <Center h="100%">Loading...</Center>
      )}
    </Box>
  );
}
