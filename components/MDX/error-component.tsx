export default function ErrorComponent({ error }) {
  console.error(error.message);

  return <div>渲染MDX出现错误, 赶紧去拷打作者吧</div>;
}
