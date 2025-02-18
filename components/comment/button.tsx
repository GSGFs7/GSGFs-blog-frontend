export default function Button({ disabled = false }: { disabled?: boolean }) {
  return (
    <button
      className={`mr-2 rounded-lg bg-blue-600 px-5 py-2 ${disabled ? "cursor-not-allowed bg-blue-800 text-gray-400" : "cursor-pointer"}`}
      form="comment-form"
      type="submit"
    >
      Submit
    </button>
  );
}
