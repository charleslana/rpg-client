import * as Phaser from 'phaser';

export class LoginModal extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createModal();
  }

  public event = 'event';

  private modal: Phaser.GameObjects.Container;
  private containerWidth = this.scene.cameras.main.width;
  private containerHeight = this.scene.cameras.main.height;

  public show(): void {
    this.modal.setVisible(true);
  }

  public hide(): void {
    this.modal.setVisible(false);
  }

  private createModal(): void {
    const content = this.createContent();
    const text = this.createText();
    const closeButton = this.createCloseButton();
    const emailInput = this.createEmailInput();
    const passwordInput = this.createPasswordInput();
    const loginButton = this.createLoginButton();
    this.modal = this.scene.add.container(0, 0);
    this.modal.setDepth(1000);
    this.modal.add([content, text, closeButton, emailInput, passwordInput, loginButton]);
    this.hide();
  }

  private createContent(): Phaser.GameObjects.Rectangle {
    const content = this.scene.add
      .rectangle(0, 0, this.containerWidth, this.containerHeight, 0xffffff)
      .setOrigin(0);
    return content;
  }

  private createText(): Phaser.GameObjects.Text {
    const text = this.scene.add
      .text(this.containerWidth / 2, this.containerHeight / 2, 'Login', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#000000',
      })
      .setOrigin(0.5);
    return text;
  }

  private createCloseButton(): Phaser.GameObjects.Text {
    const closeButton = this.scene.add
      .text(this.containerWidth - 20, 20, 'X', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true });
    closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.hide();
    });
    return closeButton;
  }

  private createEmailInput(): Phaser.GameObjects.DOMElement {
    const emailInput = this.scene.add.dom(
      this.containerWidth / 2,
      this.containerHeight / 2 - 50,
      'input',
      'width: 200px; height: 30px; padding: 5px; font-size: 16px; border: 1px solid #ccc; outline: none;'
    );
    emailInput.node.setAttribute('placeholder', 'E-mail');
    return emailInput;
  }

  private createPasswordInput(): Phaser.GameObjects.DOMElement {
    const passwordInput = this.scene.add.dom(
      this.containerWidth / 2,
      this.containerHeight / 2,
      'input',
      'width: 200px; height: 30px; padding: 5px; font-size: 16px; border: 1px solid #ccc; outline: none;'
    );
    passwordInput.node.setAttribute('type', 'password');
    passwordInput.node.setAttribute('placeholder', 'Senha');
    return passwordInput;
  }

  private createLoginButton(): Phaser.GameObjects.Text {
    const loginButton = this.scene.add
      .text(this.containerWidth / 2, this.containerHeight / 2 + 50, 'Entrar', {
        fontFamily: 'DINAlternateBold',
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#19c37d',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    loginButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.emitButton();
    });
    return loginButton;
  }

  private emitButton(): void {
    this.emit(this.event);
    this.modal.destroy();
  }
}
