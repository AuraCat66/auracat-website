import { JSX } from "preact";

export default function PageTitle(
  props: JSX.HTMLAttributes<HTMLHeadingElement>,
) {
  return (
    <>
      {props.children ? <h1 {...props}>{props.children}</h1> : null}
    </>
  );
}
