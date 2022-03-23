const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector("#titleEl").value;
  const body = document.querySelector("#contentEl").value;

  await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      title,
      post_text,
    }),
    headers: { "Content-Type": "application/json" },
  });

  document.location.replace("/");
};

document.querySelector("#submit").addEventListener("submit", newFormHandler);
