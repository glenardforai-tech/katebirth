const $ = (id) => document.getElementById(id);
$("enter").disabled = false;

function makeSparkles() {
  const field = $("sparkleField");
  for (let i = 0; i < 48; i++) {
    const dot = document.createElement("span");
    dot.className = "sparkle";
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.setProperty("--duration", `${2.2 + Math.random() * 4}s`);
    dot.style.animationDelay = `${Math.random() * 5}s`;
    field.appendChild(dot);
  }
}
function makeHeart() {
  const field = $("heartField");
  const heart = document.createElement("span");
  heart.className = "float-heart";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 18}px`;
  heart.style.setProperty("--duration", `${8 + Math.random() * 7}s`);
  field.appendChild(heart);
  setTimeout(() => heart.remove(), 16000);
}
makeSparkles();
setInterval(makeHeart, 950);

let observer;
function revealSections() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

$("enter").addEventListener("click", () => {
  $("gate").classList.add("hidden");
  $("surprise").classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
  revealSections();
});

const music = $("music");
$("musicBtn").addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      $("musicBtn").innerHTML = "Ⅱ <span>Pause music</span>";
    } catch (error) {
      $("musicBtn").innerHTML = "♫ <span>Tap to play</span>";
    }
  } else {
    music.pause();
    $("musicBtn").innerHTML = "♫ <span>Play music</span>";
  }
});
music.addEventListener("ended", () => {
  $("musicBtn").innerHTML = "♫ <span>Play music</span>";
});

$("cakeBtn").addEventListener("click", () => {
  const isOut = $("flames").classList.toggle("out");
  $("cakeText").textContent = isOut
    ? "Wish made! May your year be full of beautiful things. 💗"
    : "Tap the cake to blow out the candles ✨";
  if (isOut) {
    for (let i = 0; i < 24; i++) {
      const heart = document.createElement("span");
      heart.className = "float-heart";
      heart.textContent = "♡";
      heart.style.left = `${20 + Math.random() * 60}%`;
      heart.style.bottom = `${10 + Math.random() * 15}%`;
      heart.style.fontSize = `${16 + Math.random() * 20}px`;
      heart.style.setProperty("--duration", `${2 + Math.random() * 2}s`);
      $("heartField").appendChild(heart);
      setTimeout(() => heart.remove(), 4500);
    }
  }
});
