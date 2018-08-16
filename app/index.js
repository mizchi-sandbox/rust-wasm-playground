import * as rustWorld from "../src/lib.rs";

rustWorld.wasmBooted.then(result => {
  rustWorld.greet("hoge");
});
