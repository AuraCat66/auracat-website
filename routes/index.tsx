import WebsiteBody from "../components/WebsiteBody.tsx";

export default function Home() {
  return (
    <>
      <WebsiteBody class="text-center">
        <h2 style="color: red;">Work In Progress</h2>
        <h1>Hello, welcome to my page!</h1>
        <h3>
          You can read more about me <a href="./about_me">here.</a>
        </h3>
        <h3>
          You can also look at my projects <a href="./portfolio">here</a>
        </h3>
      </WebsiteBody>
    </>
  );
}

{
  /* <div class="flex flex-row justify-evenly">
<p>a</p>
<p>a</p>
</div> */
}
