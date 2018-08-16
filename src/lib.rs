#![feature(use_extern_macros)]

use std::ffi::CString;
use std::os::raw::c_char;
use wasm_bindgen::prelude::*;

extern crate wasm_bindgen;

static HELLO: &'static str = "hello from rust";

// Import the `window.alert` function from the Web.
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

// Export a `greet` function from Rust to JavaScript, that alerts a
// hello message.
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn get_hello() -> *mut c_char {
    let s = CString::new(HELLO).unwrap();
    s.into_raw()
}

#[wasm_bindgen]
pub fn get_hello_len() -> usize {
    HELLO.len()
}
