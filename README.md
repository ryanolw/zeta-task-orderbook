# Orderbook component demonstration


This repo exposes a modular Orderbook component, that renders bids and asks.

## Installation

```bash
$ pnpm install
```

## Usage
```jsx
<Orderbook
  apiUrl={'https://...'} 
  apiAdapter="zeta"
  pollingIntervalMs={5000} />
```
### Props

#### `apiUrl: string`
API endpoint to retrieve the orderbook data.

#### `dataAdapter?: 'zeta' | (apiUrl: string) => OrderBookData`
Name of the whitelisted dataAdapter to use. The data adapter is responsible for transforming data retrieved from `apiUrl` to a structure that is understood by the Orderbook component. 
A custom data adapter can also be used by passing in a function. The function will receive an `apiUrl` argument and should return an object that satisfies the `OrderBookData` type. default: `"zeta"`

#### `pollingIntervalMs?: number`
Interval (in milliseconds) to poll `apiUrl` for new data. Default: 5000

## Development & Testing

### Unit test

```bash
$ pnpm run test
```

### Development

```bash
$ pnpm run storybook
```



## Library choice

### Styling 

[Chakra UI](https://chakra-ui.com/getting-started) - theming library based on styled-system. By using this library, I am also making the assumption that the application codebase in which the Orderbook component will live in is built using Chakra UI / styled system. 

### Code style / linting

ESLint and prettier


### Testing

Jest + React testing library is used as a lightweight unit testing framework for catching regression when new changes are introduced. This is done by comparing a snapshot of the existing component against a known desirable render state.
Deterministic sample data source is used.

Storybook provides visual tools for testing/developing component functionality, and is also used to define typical edge cases for verification. Actual datasource (from API) can be used.

