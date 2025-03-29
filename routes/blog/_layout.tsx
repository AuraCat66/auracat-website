import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS } from "@deno/gfm";

export default function BlogLayout({ Component, state }: PageProps) {
  return (
    <>
      <Head>
        <style
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: CSS }}
        >
        </style>
      </Head>
      <Component />
    </>
  );
}
