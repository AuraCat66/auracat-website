import { JSX } from "preact";
import { WebsiteHeader } from "./WebsiteHeader.tsx";

export default function WebsiteBody(
  props: JSX.HTMLAttributes<HTMLElement> & { pageTitle?: string },
) {
  return (
    <>
      <WebsiteHeader></WebsiteHeader>
      <main
        {...props}
      >
        {props.pageTitle
          ? <h1 class="text-center">{props.pageTitle}</h1>
          : null}
        {props.children}
      </main>
    </>
  );
}
