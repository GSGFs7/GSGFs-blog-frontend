import "server-only";

export function EmailTemplate({ content }: { content: string }) {
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}
