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

  // call function
  console.log(instance.exports.add(1, 2));

  // Get array address
  const offset = instance.exports.get_address();
  const array = new Uint8Array(instance.exports.memory.buffer, offset, 5);
  console.log(array);

  const textOffset = instance.exports.get_hello();
  const len = instance.exports.get_hello_len();
  const stringBuffer = new Uint8Array(
    instance.exports.memory.buffer,
    textOffset,
    len
  );
  let str = "";
  for (let i = 0; i < stringBuffer.length; i++) {
    str += String.fromCharCode(stringBuffer[i]);
  }
  console.log(str);
};

main();
