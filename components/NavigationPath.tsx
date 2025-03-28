import { JSX } from "preact/jsx-runtime/src/index.d.ts";

export function NavigationPath(props: { url: URL }) {
  let currentPath = "";
  const pagePath = props.url.pathname.split("/");

  const elements: JSX.Element[] = [];
  if (pagePath[1] === "") {
    elements.push(
      <span title="Home page">
        Home
      </span>,
    );
  } else {
    pagePath.map((e, i) => {
      currentPath += `${e}/`;
      elements.push(
        <>
          {i < pagePath.length - 1
            ? (
              <>
                <a
                  title={i > 0 ? e : "Home page"}
                  href={currentPath}
                >
                  {i > 0 ? e : "Home"}
                </a>
                {" > "}
              </>
            )
            : (
              <span
                title={e}
              >
                {e}
              </span>
            )}
        </>,
      );
    });
  }

  return (
    <div class="navigation-path">
      {...elements}
    </div>
  );
}
