import { JSX } from "preact";
import FalseButton from "../islands/FalseButton.tsx";

export function WebsiteHeader(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      class="flex flex-col"
    >
      <div class="pink-bg text-center">
        <h1>
          <a href="./">AuraCat</a>
        </h1>
      </div>
      <div class="flex flex-row blue-bg text-center justify-evenly">
        <FalseButton href="./about_me">About me</FalseButton>
        <FalseButton href="./portfolio">Portfolio</FalseButton>
        <FalseButton href="./blog">Blog</FalseButton>
        <FalseButton href="./contact">Contact</FalseButton>
      </div>
    </header>
  );
}
