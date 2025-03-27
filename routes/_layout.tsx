import { PageProps } from "$fresh/server.ts";
import { WebsiteHeader } from "../components/WebsiteHeader.tsx";
import GayFrog from "../islands/GayFrog.tsx";

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="layout">
      <WebsiteHeader></WebsiteHeader>
      <main class="text-center font-bold">
        <Component />
      </main>
      <GayFrog></GayFrog>
    </div>
  );
}
