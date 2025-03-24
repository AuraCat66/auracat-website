import { JSX } from "preact";
import { colorPalette } from "../constants.ts";

interface FalseButtonProps {
  width?: string | number;
  minHeight?: string | number;
  initialColor?: string;
  hoverColor?: string;
}

export default function FalseButton(
  props: FalseButtonProps & JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <div
      class="false-button"
      style={{
        width: props.width,
        minHeight: props.minHeight,
        backgroundColor: props.initialColor,
      }}
      onMouseEnter={props.hoverColor
        ? (e) => {
          (e.target as HTMLAnchorElement).style.backgroundColor = props
            .hoverColor!;
        }
        : undefined}
      onMouseLeave={props.initialColor
        ? (e) => {
          (e.target as HTMLAnchorElement).style.backgroundColor = props
            .initialColor!;
        }
        : undefined}
    >
      <a
        href={props.href || "./unknown"}
      >
        {props.children}
      </a>
    </div>
  );
}
