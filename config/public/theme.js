document.addEventListener("DOMContentLoaded", function () {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
