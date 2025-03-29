import { JSX } from "preact";
import FalseButton from "../islands/FalseButton.tsx";

export function WebsiteHeader(
  props: JSX.HTMLAttributes<HTMLElement>,
) {
  return (
    <header
      {...props}
      class="main-header"
    >
      <div class="main-bar">
        <h1 class="text-center" style={{ margin: "8px" }}>
          <FalseButton
            class="website-logo-button"
            href="/"
            title="Return to home page"
          >
            AuraCat
          </FalseButton>
        </h1>
      </div>

      <div class="nav-bar">
        <FalseButton href="/about_me" title="About me">About me</FalseButton>
        <FalseButton href="/portfolio" title="Portfolio">Portfolio</FalseButton>
        <FalseButton href="/blog" title="Blog">Blog</FalseButton>
        <FalseButton href="/contact" title="Contact">Contact</FalseButton>
      </div>
    </header>
  );
}
