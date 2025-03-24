import { JSX } from "preact";

export default function FalseButton(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <div class="false-button">
      <a href={props.href || "./unknown"}>{props.children}</a>
    </div>
  );
}
