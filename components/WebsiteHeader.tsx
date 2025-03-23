import { JSX } from "preact";

export function WebsiteHeader(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header
      {...props}
      class="flex flex-col"
    >
      <div class="pink-bg line-h-1rem text-center">
        <h1>Welcome to my page</h1>
      </div>
      <div class="flex flex-row blue-bg justify-evenly">
        <p>About me</p>
        <p>My projects</p>
        <p>Blog</p>
        <p>Contact</p>
        <p>
          Anonymous<br />messages
        </p>
      </div>
    </header>
  );
}
