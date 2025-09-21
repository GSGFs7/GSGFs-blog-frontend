import { defaultValueCtx, Editor, rootCtx } from "@milkdown/kit/core";
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener";
import { commonmark } from "@milkdown/kit/preset/commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import React from "react";

function MilkdownEditor({
  content,
  onChange,
  disabled,
}: {
  content: string;
  onChange: (content: string) => void;
  disabled: boolean;
}) {
  const {} = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, content);
        ctx.get(listenerCtx).markdownUpdated((ctx, markdown) => {
          onChange(markdown);
        });
      })
      .use(commonmark)
      .use(listener),
  );

  if (disabled) {
    return (
      <textarea
        disabled
        className="min-h-36 w-full resize-none bg-transparent p-3 focus:outline-0 sm:min-h-48"
      />
    );
  }

  return <Milkdown />;
}

export default function CommentMilkdownEditor({
  commentContent,
  disabled,
  saveDraft,
}: {
  commentContent: string;
  disabled: boolean;
  saveDraft: () => void;
}): React.ReactNode {
  return (
    <MilkdownProvider>
      <div className="markdown-body min-h-36 overflow-hidden rounded-lg border border-gray-300 sm:min-h-48 dark:border-gray-600">
        <MilkdownEditor
          content={commentContent}
          disabled={disabled}
          onChange={saveDraft}
        />
      </div>
    </MilkdownProvider>
  );
}
