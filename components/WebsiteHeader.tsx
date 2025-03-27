import { JSX } from "preact";
import FalseButton from "../islands/FalseButton.tsx";

export function WebsiteHeader(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      class="flex flex-col"
    >
      <div class="pink-bg text-center">
        <h1 style={{ margin: "10px" }}>
          <FalseButton
            class="homepage-button"
            href="/"
            title="Return to home page"
          >
            AuraCat
          </FalseButton>
        </h1>
      </div>
      <div class="flex flex-row blue-bg text-center justify-evenly">
        <FalseButton href="/about_me" title="About me">About me</FalseButton>
        <FalseButton href="/portfolio" title="Portfolio">Portfolio</FalseButton>
        <FalseButton href="/blog" title="Blog">Blog</FalseButton>
        <FalseButton href="/contact" title="Contact">Contact</FalseButton>
      </div>
    </header>
  );
}
