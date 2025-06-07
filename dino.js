class DinoWalker {
  constructor() {
    this.isPaused = false;
    this.isVisible = true;
    this.lastTime = 0;
    this.stepDuration = 600; // 600ms
    this.currentStep = 0;

    this.dino1 = document.querySelector(".dino1");
    this.dino2 = document.querySelector(".dino2");
    this.walkingDino = document.querySelector(".walking-dino");

    this.init();
  }

  init() {
    // 初期状態
    this.dino1.style.opacity = "1";
    this.dino2.style.opacity = "0";

    // イベントリスナー
    this.walkingDino.addEventListener("mouseenter", () => this.pause());
    this.walkingDino.addEventListener("mouseleave", () => this.resume());

    document.addEventListener("visibilitychange", () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.lastTime = performance.now();
      }
    });

    // アニメーション開始
    this.lastTime = performance.now();
    this.animate();
  }

  pause() {
    this.isPaused = true;
    this.walkingDino.style.animationPlayState = "paused";
    // ホバー時は常にdino1を表示
    this.dino1.style.opacity = "1";
    this.dino2.style.opacity = "0";
  }

  resume() {
    this.isPaused = false;
    this.walkingDino.style.animationPlayState = "running";
    this.lastTime = performance.now(); // 時間をリセット
  }

  animate() {
    const currentTime = performance.now();

    if (!this.isPaused && this.isVisible) {
      const elapsed = currentTime - this.lastTime;

      if (elapsed >= this.stepDuration) {
        this.step();
        this.lastTime = currentTime;
      }
    }

    requestAnimationFrame(() => this.animate());
  }

  step() {
    this.currentStep = (this.currentStep + 1) % 2;

    if (this.currentStep === 0) {
      this.dino1.style.opacity = "1";
      this.dino2.style.opacity = "0";
    } else {
      this.dino1.style.opacity = "0";
      this.dino2.style.opacity = "1";
    }
  }
}

// DOM読み込み完了後に開始
document.addEventListener("DOMContentLoaded", () => {
  new DinoWalker();
});
