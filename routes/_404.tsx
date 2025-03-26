import { Head } from "$fresh/runtime.ts";
import PageTitle from "../components/PageTitle.tsx";
import ReturnToPreviousPage from "../islands/ReturnToPreviousPage.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <PageTitle style="color: red;">404 - Page not found</PageTitle>
      <h3>The page you were looking for doesn't exist.</h3>

      <ReturnToPreviousPage></ReturnToPreviousPage>
    </>
  );
}
