// export default function adapter() {
//   if (process.env.NEXT_RUNTIME == "nodejs") {
//     return  import("./server-blog-wrapper");
//   } else {
//     return  import("./client-blog-wrapper");
//   }
// }

export default function adapter() {
  return import("./client-blog-wrapper");
}
