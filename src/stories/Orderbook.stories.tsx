import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Orderbook from '../components/Orderbook/Orderbook';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Orderbook',
  component: Orderbook,
  // tags: ['autodocs'],
  argTypes: {
    dataAdapter: { control: 'select', options: ['zeta'] },
  },
} satisfies Meta<typeof Orderbook>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HappyPath: Story = {
  args: {
    apiUrl:
      'https://dex-mainnet-webserver-ecs.zeta.markets/orderbooks/SOL?marketIndexes[]=137',
    pollingIntervalMs: 5000,
    dataAdapter: 'zeta',
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
    apiUrl: 'https://foo.bar',
    pollingIntervalMs: 5000,
    dataAdapter: 'zeta',
  },
  decorators: [
    (Story) => (
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    ),
  ],
};
