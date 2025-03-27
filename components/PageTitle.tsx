import { JSX } from "preact";

export default function PageTitle(
  props: JSX.HTMLAttributes<HTMLHeadingElement>,
) {
  return (
    <>
      {props.children
        ? (
          <h1
            {...props}
            class={`${props.class ? `${props.class} ` : ""}page-title`}
          >
            {props.children}
          </h1>
        )
        : null}
    </>
  );
}
