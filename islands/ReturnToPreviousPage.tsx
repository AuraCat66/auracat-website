export default function ReturnToPreviousPage() {
  return (
    <button
      type="button"
      onClick={() => globalThis.history.back()}
    >
      Return to previous page
    </button>
  );
}
