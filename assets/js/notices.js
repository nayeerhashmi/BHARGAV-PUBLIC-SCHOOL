/* Renders approved notices from /notices/notices.json.
   The existing static cards remain visible if the JSON is empty or unavailable. */
document.addEventListener("DOMContentLoaded", async function () {
  const list = document.getElementById("notice-list");
  if (!list) return;

  try {
    const response = await fetch("/notices/notices.json", { cache: "no-store" });
    if (!response.ok) return;
    const notices = await response.json();
    if (!Array.isArray(notices) || notices.length === 0) return;

    const fragment = document.createDocumentFragment();
    notices.forEach(function (notice) {
      if (!notice || typeof notice.title !== "string" || !notice.title.trim()) return;

      const card = document.createElement("article");
      card.className = "card notice-card";

      const heading = document.createElement("h3");
      heading.textContent = notice.title.trim();
      card.appendChild(heading);

      if (typeof notice.date === "string" && notice.date.trim()) {
        const date = document.createElement("p");
        date.className = "notice-date";
        date.textContent = notice.date.trim();
        card.appendChild(date);
      }

      if (typeof notice.description === "string" && notice.description.trim()) {
        const description = document.createElement("p");
        description.textContent = notice.description.trim();
        card.appendChild(description);
      }

      if (typeof notice.file === "string" && notice.file.trim()) {
        const link = document.createElement("a");
        link.className = "btn";
        link.href = notice.file.trim();
        link.textContent = "View notice";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        card.appendChild(link);
      }

      fragment.appendChild(card);
    });

    if (fragment.childElementCount > 0) {
      list.replaceChildren(fragment);
    }
  } catch (error) {
    // Keep the built-in notice cards visible if loading fails.
  }
});
