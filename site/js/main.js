/*
  WORLD WIDE WASTE — THE INDEX

  Shared public behavior is intentionally minimal.
*/

(() => {
  const restrictedPath =
    window.location.pathname === "/restricted" ||
    window.location.pathname.startsWith("/restricted/");

  if (!restrictedPath) {
    document.documentElement.classList.add("public-grey90");
  }
})();