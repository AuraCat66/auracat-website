import { PageProps } from "$fresh/server.ts";
import { NavigationPath } from "../components/NavigationPath.tsx";
import { WebsiteHeader } from "../components/WebsiteHeader.tsx";
import GayFrog from "../islands/GayFrog.tsx";

export default function Layout({ Component, state, url }: PageProps) {
  return (
    <div class="layout">
      <WebsiteHeader></WebsiteHeader>
      <main>
        <div
          class="flex flex-row justify-between font-bold"
          style={{ marginTop: "0.5vw" }}
        >
          <div class="side-bar">
            <NavigationPath url={url}></NavigationPath>
          </div>
          <article>
            <Component />
          </article>
          {
            /* Right side bar, only used for balancing the left side bar
        and centering the main content */
          }
          <div class="side-bar">
          </div>
        </div>
      </main>
      <GayFrog></GayFrog>
    </div>
  );
}
