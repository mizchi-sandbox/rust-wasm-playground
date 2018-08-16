const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const loadPath = path.join(
  __dirname,
  "target/wasm32-unknown-unknown/debug/rust_wasm.wasm"
);

const main = async () => {
  const buf = await fs.promises.readFile(loadPath);
  const source = await WebAssembly.instantiate(buf, {});
  const instance = source.instance;

  // call your code
  // console.log(instance.exports.add(1, 2));
};

main();
