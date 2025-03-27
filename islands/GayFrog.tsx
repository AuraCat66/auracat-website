export default function GayFrog() {
  return (
    <div
      style="position: absolute; bottom: 1em; left: 2em;"
      onClick={(_e) => {
        const gay = (_e.target as HTMLDivElement).children.item(0);
        gay ? (gay as HTMLParagraphElement).style.visibility = "visible" : null;
      }}
    >
      <h6 style="visibility: hidden;">
        you've found a hidden gay frog
        <br />
        🐸 🏳️‍🌈
      </h6>
    </div>
  );
}
