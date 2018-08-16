import loadWasm from "../src/lib.rs";

loadWasm().then(result => {
  const instance = result.instance;
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
});
