import { IS_BROWSER } from "$fresh/runtime.ts";

export default function ReturnToPreviousPage() {
  return (
    !IS_BROWSER ? <div></div> : (
      <button
        type="button"
        onClick={() => globalThis.history.back()}
      >
        Return to previous page
      </button>
    )
  );
}
