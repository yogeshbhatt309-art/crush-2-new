let highestZ = 1;

class Paper {
  holding = false;
  x = 0;
  y = 0;
  rotation = Math.random() * 30 - 15;
  startX = 0;
  startY = 0;

  init(paper) {

    const move = (clientX, clientY) => {
      if (!this.holding) return;

      this.x = clientX - this.startX;
      this.y = clientY - this.startY;

      paper.style.transform =
        `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
    };

    // DESKTOP
    paper.addEventListener("mousedown", e => {
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.startX = e.clientX - this.x;
      this.startY = e.clientY - this.y;
    });

    document.addEventListener("mousemove", e => {
      move(e.clientX, e.clientY);
    });

    document.addEventListener("mouseup", () => {
      this.holding = false;
    });

    // MOBILE
    paper.addEventListener("touchstart", e => {
      const t = e.touches[0];
      this.holding = true;
      paper.style.zIndex = highestZ++;
      this.startX = t.clientX - this.x;
      this.startY = t.clientY - this.y;
    });

    document.addEventListener("touchmove", e => {
      if (!this.holding) return;
      const t = e.touches[0];
      move(t.clientX, t.clientY);
    }, { passive: false });

    document.addEventListener("touchend", () => {
      this.holding = false;
    });
  }
}

document.querySelectorAll(".paper").forEach(p => {
  new Paper().init(p);
});
