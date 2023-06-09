import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Orderbook from '../components/Orderbook/Orderbook';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const meta = {
  title: 'Orderbook',
  component: Orderbook,
} satisfies Meta<typeof Orderbook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HappyPath: Story = {
  args: {
    pollingIntervalMs: 5000,
    dataAdapter: ({ zeta }) =>
      zeta(
        'https://dex-mainnet-webserver-ecs.zeta.markets/orderbooks/SOL?marketIndexes[]=137'
      ),
  },
  decorators: [
    (Story) => (
      <ChakraProvider
        theme={extendTheme({
          styles: {
            global: () => {
              return {
                body: {
                  fontSize: 'sm',
                },
              };
            },
          },
        })}
      >
        <Story />
      </ChakraProvider>
    ),
  ],
};

export const ApiUnavailable: Story = {
  args: {
    pollingIntervalMs: 5000,
    dataAdapter: ({ zeta }) => zeta('https://foo.bar'),
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};
