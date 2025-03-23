export default function adapter() {
  if (process.env.NEXT_RUNTIME == "nodejs") {
    return import("./nodejs-runtime");
  } else {
    return import("./edge-runtime");
  }
}

// how to use?
// 1. import the module:
//  import adapter from "./runtime-adapter";
// 2. run the function, you will get a module
//  await adapter()
// 3. use the function in module
//  await (await adapter()).generateAuthToken()
