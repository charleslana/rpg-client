import * as Phaser from 'phaser';
import { loginBackground } from '../data/assetKeys';
import { loginSceneKey } from '../data/sceneKeys';

export class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: loginSceneKey });
  }

  private offcanvas: Phaser.GameObjects.Container;
  private overlay: Phaser.GameObjects.Rectangle;
  private containerWidth: number;
  private containerHeight: number;

  create(): void {
    this.setBackgroundImage();
    this.createLogoText();
    this.createBlinkingText();
    this.createOffcanvas();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, loginBackground).setOrigin(0, 0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    const hitArea = this.add.rectangle(
      0,
      0,
      this.cameras.main.width,
      this.cameras.main.height,
      0x000000,
      0
    );
    hitArea.setOrigin(0);
    hitArea.setInteractive({ useHandCursor: true });
    hitArea.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.showOffcanvas();
    });
  }

  private createLogoText(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 4;
    this.add
      .text(centerX, centerY, 'Heróis da Jornada', {
        fontFamily: 'TrajanProRegular',
        fontSize: '48px',
        color: '#ffffff',
        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: '#000000',
          blur: 5,
          fill: true,
        },
      })
      .setOrigin(0.5);
  }

  private createBlinkingText(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const text = this.add
      .text(centerX, centerY, 'Clique para começar', {
        fontFamily: 'DINAlternateBold',
        fontSize: '32px',
        color: '#ffffff',
        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: '#000000',
          blur: 5,
          fill: true,
        },
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: text,
      alpha: 0,
      duration: 1000,
      ease: Phaser.Math.Easing.Sine.InOut,
      yoyo: true,
      repeat: -1,
    });
  }

  private createOffcanvas(): void {
    this.containerWidth = this.cameras.main.width;
    this.containerHeight = this.cameras.main.height;
    this.offcanvas = this.add.container(0, 0);
    this.createOverlay();
    const offcanvasContent = this.createOffcanvasContent();
    const closeButton = this.createCloseButton();
    const loginButton = this.createLoginButton();
    const registerButton = this.createRegisterButton();
    this.offcanvas.add([this.overlay, offcanvasContent, closeButton, loginButton, registerButton]);
    this.offcanvas.setVisible(false);
    this.hideOffcanvas(0);
  }

  private createOverlay(): void {
    this.overlay = this.add
      .rectangle(0, 0, this.containerWidth, this.containerHeight, 0x000000, 0.5)
      .setOrigin(0)
      .setInteractive();
    this.overlay.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.hideOffcanvas();
    });
  }

  private createOffcanvasContent(): Phaser.GameObjects.Rectangle {
    const offcanvasContent = this.add
      .rectangle(
        0,
        this.containerHeight / 2,
        this.containerWidth,
        this.containerHeight / 2,
        0xffffff
      )
      .setOrigin(0)
      .setInteractive();
    offcanvasContent.on(Phaser.Input.Events.POINTER_DOWN, () => {});
    return offcanvasContent;
  }

  private createCloseButton(): Phaser.GameObjects.Text {
    const closeButton = this.add
      .text(this.containerWidth - 20, 20, 'X', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(1, 0)
      .setInteractive();
    closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.hideOffcanvas();
    });
    return closeButton;
  }

  private createLoginButton(): Phaser.GameObjects.Text {
    const button1 = this.add
      .text(this.containerWidth / 2 - 220, this.containerHeight * 0.75, 'Já tenho conta', {
        fontFamily: 'DINAlternateBold',
        fontSize: '24px',
        color: '#000000',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    button1.on(Phaser.Input.Events.POINTER_DOWN, () => {
      console.log('Button 1 clicked');
    });
    return button1;
  }

  private createRegisterButton(): Phaser.GameObjects.Text {
    const button2 = this.add
      .text(this.containerWidth / 2 + 220, this.containerHeight * 0.75, 'É a primeira vez aqui', {
        fontFamily: 'DINAlternateBold',
        fontSize: '24px',
        color: '#ffffff', // Branco
        backgroundColor: '#007bff', // Azul
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    button2.on(Phaser.Input.Events.POINTER_DOWN, () => {
      console.log('Button 2 clicked');
    });
    return button2;
  }

  private showOffcanvas(): void {
    this.offcanvas.setVisible(true);
    this.tweens.add({
      targets: this.offcanvas.list[1],
      y: this.containerHeight / 2,
      duration: 500,
      ease: Phaser.Math.Easing.Back.Out,
    });
  }

  private hideOffcanvas(ms = 500): void {
    this.tweens.add({
      targets: this.offcanvas.list[1],
      y: this.containerHeight,
      duration: ms,
      ease: Phaser.Math.Easing.Back.In,
      onComplete: () => {
        this.offcanvas.setVisible(false);
      },
    });
  }
}
