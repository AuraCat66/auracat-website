import { WebsiteHeader } from "../components/WebsiteHeader.tsx";

export default function Home() {
  return (
    <>
      <WebsiteHeader></WebsiteHeader>
      <main class="text-center font-bold">
        <h2 style="color: red;">Work In Progress</h2>
        <h1>Hello, welcome to my page!</h1>
        <h3>
          You can read more about me <a href="./about_me">here.</a>
        </h3>
        <h3>
          Look at my projects <a href="./portfolio">here</a>
        </h3>
      </main>
    </>
  );
}

{
  /* <div class="flex flex-row justify-evenly">
<p>a</p>
<p>a</p>
</div> */
}
