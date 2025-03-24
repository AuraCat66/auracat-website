import {} from "$fresh/runtime.ts";
interface FalseButtonProps {
  children?: string | unknown[];
  href?: string;
}

export default function FalseButton(props: FalseButtonProps) {
  return (
    <div class="false-button">
      <a href={props.href || "./unknown"}>{props.children}</a>
    </div>
  );
}
