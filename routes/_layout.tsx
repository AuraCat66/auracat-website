import { PageProps } from "$fresh/server.ts";
import { WebsiteHeader } from "../components/WebsiteHeader.tsx";
import GayFrog from "../islands/GayFrog.tsx";

export default function Layout({ Component, state }: PageProps) {
  // do something with state here
  return (
    <div class="layout">
      <WebsiteHeader></WebsiteHeader>
      <div class="text-center">
        <Component />
      </div>
      <GayFrog></GayFrog>
    </div>
  );
}
