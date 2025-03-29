import PageTitle from "../components/PageTitle.tsx";

export default function Home() {
  return (
    <>
      <h2 style="color: red;">Work In Progress</h2>
      <PageTitle>Hello, welcome to my page!</PageTitle>
      <h3>
        You can read more about me <a href="./about_me">here.</a>
      </h3>
      <h3>
        You can also find my GitHub and the source code of this website{" "}
        <a href="https://github.com/AuraCat66/auracat-website">here.</a>
      </h3>
      {
        /* <h3>
        You can also look at my projects <a href="./portfolio">here.</a>
      </h3> */
      }
    </>
  );
}
