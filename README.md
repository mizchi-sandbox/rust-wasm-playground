# Rust wasm playground

```bash
# use nightly
rustup default nightly
rustup update
rustup target add wasm32-unknown-unknown
```

## Run

```bash
# build
cargo build --target=wasm32-unknown-unknown

# run as node
node main.js

# run with webpack-serve
yarn webpack-serve
```

## LICENSE

MIT
