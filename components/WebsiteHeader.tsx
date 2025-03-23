import { JSX } from "preact";

export function WebsiteHeader(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      class="flex flex-col"
    >
      <div class="pink-bg text-center">
        <h1>AuraCat</h1>
      </div>
      <div class="flex flex-row blue-bg justify-evenly">
        <p>
          <a href="./about_me">About me</a>
        </p>
        <p>Portfolio</p>
        <p>Blog</p>
        <p>Contact</p>
        <p>
          Anonymous<br />messages
        </p>
      </div>
    </header>
  );
}
