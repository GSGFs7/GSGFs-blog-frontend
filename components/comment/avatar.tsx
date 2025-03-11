import Image from "next/image";

export default async function CommentAvatar({
  col = false,
  avatar,
  name,
}: {
  col?: boolean;
  avatar?: string;
  name?: string;
}) {
  const defaultAvatar = "/default-avatar.png";

  return (
    <div
      className={`flex w-fit items-center ${col ? "flex-col" : "flex-row gap-3"}`}
    >
      <Image
        alt={name ?? "avatar"}
        className="m-2 h-9 w-fit rounded-full"
        height={"40"}
        src={avatar ? avatar : defaultAvatar}
        width={"40"}
      />
      <span>{name ? name : "未登录"}</span>
    </div>
  );
}
