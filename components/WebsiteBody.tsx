import { JSX } from "preact";
import { WebsiteHeader } from "./WebsiteHeader.tsx";

export default function WebsiteBody(
  props: JSX.HTMLAttributes<HTMLElement>,
) {
  return (
    <>
      {/* This might be useful later, for example if we have a footer */}
      {/* <div class="flex flex-row"> */}
      <WebsiteHeader></WebsiteHeader>
      <main
        {...props}
      >
        {props.children}
      </main>
      {/* </div> */}
    </>
  );
}
