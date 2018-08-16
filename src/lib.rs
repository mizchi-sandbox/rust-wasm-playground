use std::ffi::CString;
use std::os::raw::c_char;

static HELLO: &'static str = "hello from rust";
static ARRAY_SHARE: [i8; 5] = [1, 2, 3, 4, 5];

#[no_mangle]
pub extern "C" fn add(a: f64, b: f64) -> f64 {
    a + b
}

#[no_mangle]
pub extern "C" fn get_address() -> *const i8 {
    &ARRAY_SHARE[0]
}

#[no_mangle]
pub fn get_hello() -> *mut c_char {
    let s = CString::new(HELLO).unwrap();
    s.into_raw()
}

#[no_mangle]
pub fn get_hello_len() -> usize {
    HELLO.len()
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
