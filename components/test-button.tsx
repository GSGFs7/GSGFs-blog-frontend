"use client";

//! 仅测试使用
export default function TestButton({ action }: { action: () => void }) {
  return <button onClick={() => action()}>test</button>;
}
