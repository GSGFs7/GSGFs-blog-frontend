export default async function Page({
  params,
}: {
  params: Promise<{ tagId: number }>;
}) {
  const tagId = (await params).tagId;

  return (
    <div>
      <p>TagId: {tagId}</p>
      <p>这里还没有写完哦</p>
      <p>晚点再来看看吧</p>
    </div>
  );
}
