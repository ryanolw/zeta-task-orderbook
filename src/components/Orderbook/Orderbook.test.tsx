import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Orderbook from './Orderbook';
import dataAdapters from './adapters';

jest.mock('./adapters');

describe('Orderbook', () => {
  test('should match snapshot when rendering order data using whitelisted data adapter', async () => {
    (dataAdapters.zeta as jest.Mock).mockReturnValue(sampleData);
    const res = render(<Orderbook dataAdapter={({ zeta }) => zeta('foo')} />);
    await waitForElementToBeRemoved(await res.findByText('Loading...'));
    expect(res.asFragment()).toMatchSnapshot();
  });

  test('should match snapshot when rendering order data using custom data adapter', async () => {
    const res = render(<Orderbook dataAdapter={() => sampleData} />);
    await waitForElementToBeRemoved(await res.findByText('Loading...'));
    expect(res.asFragment()).toMatchSnapshot();
  });
});

const sampleData = {
  bids: [
    { price: 18.7201, size: 168.895 },
    { price: 18.717, size: 10.69 },
    { price: 18.7163, size: 844.473 },
    { price: 18.7089, size: 2251.928 },
    { price: 18.708, size: 53.45 },
    { price: 18.7014, size: 2529.446 },
    { price: 18.698, size: 267.26 },
    { price: 18.689, size: 267.26 },
    { price: 18.642, size: 801.79 },
    { price: 18, size: 0.084 },
    { price: 15, size: 0.05 },
    { price: 2.01, size: 3 },
    { price: 2, size: 1 },
    { price: 1.3, size: 1 },
    { price: 0.01, size: 1.66 },
  ],
  asks: [
    { price: 18.7303, size: 151.701 },
    { price: 18.734, size: 758.507 },
    { price: 18.7415, size: 2022.685 },
    { price: 18.749, size: 1142.531 },
    { price: 19, size: 5 },
    { price: 19.25, size: 5 },
    { price: 19.5, size: 5 },
    { price: 20, size: 5 },
    { price: 21, size: 5 },
    { price: 24.5, size: 0.5 },
    { price: 25, size: 0.5 },
    { price: 26, size: 0.38 },
  ],
};
