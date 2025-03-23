import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div class="text-center">
        <h1>404 - Page not found</h1>
        <h3>The page you were looking for doesn't exist.</h3>
      </div>
    </>
  );
}
