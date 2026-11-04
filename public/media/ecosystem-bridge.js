/* Ecosystem bridge section: shared by directivefitness.com and stratummetrics.com.
   Claude, 2026-11-04, from Gemini Web's dual-site spec. Plain JavaScript, no framework needed.

   What it does:
   1. If the page was opened from the partner site (?from=directive or ?from=stratum), shows the arrival pill
      and smooth-scrolls to #ecosystem-bridge.
   2. Respects reduced motion: pauses the video on its poster.
   Nothing is stored, sent or tracked. The other link parameters are sample numbers for the page only. */
(function () {
  function init() {
    var section = document.getElementById("ecosystem-bridge");
    if (!section) return;

    var video = section.querySelector(".eb-video");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (video && reduce) {
      video.removeAttribute("autoplay");
      video.pause();
    }

    var params = new URLSearchParams(window.location.search);
    var from = params.get("from");
    var here = section.getAttribute("data-site"); // "directive" or "stratum"
    if (from !== "directive" && from !== "stratum") return;
    if (from === here) return; // ignore a link back to the same site

    var pill = section.querySelector(".eb-arrival");
    if (pill) {
      var text = pill.getAttribute("data-text-from-" + from);
      if (text) pill.textContent = text;
      pill.classList.add("is-visible");
    }
    // Wait a frame so the pill's height is in the layout before scrolling.
    requestAnimationFrame(function () {
      section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
