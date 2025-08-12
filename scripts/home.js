class Home extends Phaser.Scene {
  constructor() {
    super("home");
  }
  create() {
    var self = this;
    this.add.sprite(0, 0, "background").setOrigin(0);
    this.add.sprite(0, 0, "background-top").setOrigin(0);
    this.add.sprite(0, config.height, "background-footer").setOrigin(0, 1);
    let title = this.add.sprite(360, 320, "game-title");
    this.tweens.add({
      targets: title,
      y: title.y + 30,
      duration: 1300,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
    this.add.sprite(360, 550, "icon-crown");
    this.add
      .text(360, 630, "BEST SCORE:", {
        fontFamily: "arco",
        margin: { top: 10, bottom: 10 },
        fontSize: 35,
        align: "center",
        color: "#39911b",
      })
      .setOrigin(0.5);
    this.add
      .text(360, 700, String(best_score), {
        fontFamily: "arco",
        fontSize: 120,
        align: "center",
        color: "#39911b",
      })
      .setOrigin(0.5);
    let btnPlay = createButton(360, 840, "play", this);
    let btnNew = createButton(360, 960, "new", this);

    // *** ADD THIS LINE: Create How to Play button ***
    let btnHowToPlay = createButton(360, 1080, "how-to-play", this);
    btnHowToPlay.setScale(0.6); // Make it 60% of original size

    if (!last_array) {
      btnNew.alpha = 0.5;
    }

    // *** ADD THIS LINE: Initialize popup container ***
    this.howToPlayPopup = this.add.container();

    this.input.on(
      "gameobjectdown",
      (pointer, obj) => {
        if (obj.isButton && obj.alpha === 1) {
          playSound("click", this);
          this.tweens.add(
            {
              targets: obj,
              scaleX: 0.9,
              scaleY: 0.9,
              yoyo: true,
              ease: "Linear",
              duration: 100,
              onComplete: function () {
                if (obj.name === "play") {
                  //playerData.drop_mode = 0;
                  //playerData.score = 0;
                  self.scene.start("game");
                } else if (obj.name === "new") {
                  clearData();
                  self.scene.start("game");
                }
                // *** ADD THIS BLOCK: Handle How to Play button click ***
                else if (obj.name === "how-to-play") {
                  self.showHowToPlayPopup();
                }
              },
            },
            this
          );
        }
      },
      this
    );
    this.add
      .text(config.width / 2, config.height - 40, devStr, {
        fontFamily: "arco",
        fontSize: 18,
        align: "center",
        color: "#fff",
      })
      .setOrigin(0.5);
  }

  // *** ADD THESE TWO NEW METHODS AFTER THE create() METHOD ***

  showHowToPlayPopup() {
    // Clear any existing popup content
    this.howToPlayPopup.removeAll(true);

    // Create dark overlay
    let dark = this.add
      .rectangle(0, 0, config.width, config.height, 0x000000)
      .setOrigin(0)
      .setInteractive();
    dark.alpha = 0.5;

    // Create popup background (using gameover panel)
    let bgPopup = this.add
      .sprite(
        this.game.config.width / 2,
        this.game.config.height / 2,
        "panel-gameover" // Changed from panel-pause
      )
      .setDepth(2);

    // Title
    let txtTitle = this.add
      .text(bgPopup.x, bgPopup.y - 240, "🕹 HOW TO PLAY", {
        fontFamily: "arco",
        fontSize: 40,
        align: "center",
        color: "#FFB3DB",
        fontStyle: "bold",
        stroke: "#9E1F63",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    // Instructions - organized into sections with left alignment and proper indentation
    let instructionTexts = [];
    let leftMargin = bgPopup.x - 180; // Reduced from -160 to -140 to fit better in panel
    let maxWidth = 280; // Maximum width for text to stay within panel

    // Step 1
    let step1 = this.add
      .text(leftMargin, bgPopup.y - 150, "1. Tap a tile to select it.", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
        wordWrap: { width: maxWidth },
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step1);

    // Step 2 - split into 2 lines to fit within panel
    let step2a = this.add
      .text(leftMargin, bgPopup.y - 115, "2. Tap another tile with", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step2a);

    let step2b = this.add
      .text(leftMargin + 20, bgPopup.y - 90, "the same image.", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step2b);

    // Step 3 header
    let step3 = this.add
      .text(leftMargin, bgPopup.y - 55, "3. A match is valid if:", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step3);

    // Bullet point 1 (indented)
    let bullet1 = this.add
      .text(leftMargin + 25, bgPopup.y - 25, "• They are identical.", {
        fontFamily: "arco",
        fontSize: 20,
        align: "left",
        color: "#FFDD44",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(bullet1);

    // Bullet point 2 - split into 3 lines to fit properly
    let bullet2a = this.add
      .text(leftMargin + 25, bgPopup.y + 5, "• The path between them", {
        fontFamily: "arco",
        fontSize: 20,
        align: "left",
        color: "#FFDD44",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(bullet2a);

    let bullet2b = this.add
      .text(leftMargin + 45, bgPopup.y + 30, "has no more than", {
        fontFamily: "arco",
        fontSize: 20,
        align: "left",
        color: "#FFDD44",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(bullet2b);

    let bullet2c = this.add
      .text(leftMargin + 45, bgPopup.y + 55, "3 straight lines.", {
        fontFamily: "arco",
        fontSize: 20,
        align: "left",
        color: "#FFDD44",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(bullet2c);

    // Step 4 - split into 2 lines
    let step4a = this.add
      .text(leftMargin, bgPopup.y + 85, "4. Clear all tiles before", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step4a);

    let step4b = this.add
      .text(leftMargin + 20, bgPopup.y + 110, "time runs out to win.", {
        fontFamily: "arco",
        fontSize: 22,
        align: "left",
        color: "#FFFFFF",
        stroke: "#000000",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5);
    instructionTexts.push(step4b);

    // Close button
    let btnClose = createButton(bgPopup.x, bgPopup.y + 200, "play-popup", this);

    // Add click handler for close button
    let self = this;
    btnClose.on("pointerdown", function () {
      playSound("click", self);
      self.tweens.add({
        targets: btnClose,
        scaleX: 0.9,
        scaleY: 0.9,
        yoyo: true,
        ease: "Linear",
        duration: 100,
        onComplete: function () {
          self.hideHowToPlayPopup();
        },
      });
    });

    // Add all elements to popup container
    this.howToPlayPopup
      .add([dark, bgPopup, txtTitle, btnClose, ...instructionTexts])
      .setDepth(1000);

    // Show popup with fade-in animation
    this.howToPlayPopup.setAlpha(0);
    this.tweens.add({
      targets: this.howToPlayPopup,
      alpha: 1,
      duration: 300,
      ease: "Power2",
    });

    // Allow clicking outside to close
    dark.on("pointerdown", () => {
      this.hideHowToPlayPopup();
    });
  }

  hideHowToPlayPopup() {
    this.tweens.add({
      targets: this.howToPlayPopup,
      alpha: 0,
      duration: 200,
      ease: "Power2",
      onComplete: () => {
        this.howToPlayPopup.removeAll(true);
      },
    });
  }
}
