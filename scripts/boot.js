var devStr = "";
class Boot extends Phaser.Scene {
  constructor() {
    super("boot");
  }
  preload() {
    //load some initial sprites
    this.load.image("background", "images/background-3.png");
    this.load.image("background-footer", "images/background-footer-1.png");
    // this.load.image("background-top", "images/background-top.png");
    this.load.image("background-top", "images/background-top-2.png");
    this.load.image("game-title", "images/game-title-1.png");
    this.load.image("time-bar", "images/time-bar.png");
  }
  create() {
    this.scale.stopListeners();
    this.scene.start("load");
  }
}
