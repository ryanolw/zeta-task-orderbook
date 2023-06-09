# Orderbook component demonstration

This repo contains a modular Orderbook component, that renders bids and asks.

## Installation

```bash
$ pnpm install
```

## Basic Usage
```jsx
<Orderbook
  dataAdapter={({ zeta }) => zeta('<datasource URL>')}
  pollingIntervalMs={5000} />
```

### Props

#### `dataAdapter: (dataAdapters: DataAdapters) => OrderBookData | Promise<OrderBookData>`
 (Required) A function that retrieves orderbook data when called. A map of whitelisted data adapters are passed into this function as the first argument for convenience.

 A custom data adapter implementation can also be used - this function should return an object that satisfies the `OrderBookData` type. Examples:
 
 **Custom fetch function:**
 ```ts
 <Orderbook
    dataAdapter={() => fetch('<datasource URL>').then(res => res.json())}
    pollingIntervalMs={5000} />
 ```

**Local state store:**
 ```ts
 <Orderbook
    dataAdapter={() => localStore.retrieveOrderData()}
    pollingIntervalMs={5000} />
 ```
/

#### `pollingIntervalMs?: number`
Interval (in milliseconds) to invoke `dataAdapter` for new data. Default: 5000


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

