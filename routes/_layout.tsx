import { PageProps } from "$fresh/server.ts";
import { NavigationPath } from "../components/NavigationPath.tsx";
import { WebsiteHeader } from "../components/WebsiteHeader.tsx";
import GayFrog from "../islands/GayFrog.tsx";

export default function Layout({ Component, state, url }: PageProps) {
  return (
    <div class="layout">
      <WebsiteHeader></WebsiteHeader>
      <div class="flex flex-row justify-between font-bold">
        <div class="sidebar">
          <NavigationPath url={url}></NavigationPath>
        </div>
        <main class="text-center">
          <Component />
        </main>
        {
          /* Right side bar, only used for balancing the left side bar
        and centering the main content */
        }
        <div class="sidebar">
        </div>
      </div>
      <GayFrog></GayFrog>
    </div>
  );
}
