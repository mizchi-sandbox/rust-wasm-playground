const { promisify } = require("util");
const fs = require("fs");
const path = require("path");
const readFile = promisify(fs.readFile);

const loadPath = path.join(
  __dirname,
  "target/wasm32-unknown-unknown/debug/rust_wasm.wasm"
);

const main = async () => {
  const buf = await readFile(loadPath);
  const source = await WebAssembly.instantiate(buf, {});
  console.log(source.instance.exports.add(1, 2));
};

main();
