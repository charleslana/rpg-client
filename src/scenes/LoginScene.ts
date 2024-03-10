import * as Phaser from 'phaser';
import UserService from '@service/UserService';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { Character } from '@components/Character';
import { I18nUtils } from '@utils/I18nUtils';
import { isAuthenticated, saveAccessToken } from '@utils/localStorageUtils';
import { Loading } from '@components/Loading';
import { LoginModal } from '@modules/login/LoginModal';
import { RegisterModal } from '@modules/login/RegisterModal';
import { SceneKeyEnum } from '@enum/SceneKeyEnum';

export class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeyEnum.LoginSceneKey });
  }

  private offcanvas: Phaser.GameObjects.Container;
  private overlay: Phaser.GameObjects.Rectangle;
  private containerWidth: number;
  private containerHeight: number;
  private loginModal: LoginModal;
  private registerModal: RegisterModal;
  private loading: Loading;

  init(): void {
    this.loading = new Loading(this);
  }

  create(): void {
    this.setBackgroundImage();
    this.createLogoText();
    this.createBlinkingText();
    this.createCharacters();
    this.createOffcanvas();
    this.createLoginModal();
    this.createRegisterModal();
    this.createVersionText();
    this.createByText();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, AssetKeysEnum.LoginBackground).setOrigin(0, 0);
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
      if (isAuthenticated()) {
        this.refreshAccessToken();
        return;
      }
      this.showOffcanvas();
    });
  }

  private createLogoText(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 4;
    this.add
      .text(centerX, centerY, I18nUtils.getTranslation(this, 'LOGO_NAME'), {
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
      .text(centerX, centerY, I18nUtils.getTranslation(this, 'TAP_TO_START'), {
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

  private createCharacters(): void {
    const fireKnight = new Character(this, 400, 470);
    fireKnight.createCharacter({
      id: 1,
      characterId: 1,
      slot: 0,
    });
    const ranged = new Character(this, 600, 470);
    ranged.createCharacter({
      id: 2,
      characterId: 2,
      slot: 0,
      isFlip: true,
    });
  }

  private createOffcanvas(): void {
    this.containerWidth = this.cameras.main.width;
    this.containerHeight = this.cameras.main.height;
    this.offcanvas = this.add.container(0, 0);
    this.offcanvas.setDepth(999);
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
      .setInteractive({ useHandCursor: true });
    closeButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.hideOffcanvas();
    });
    return closeButton;
  }

  private createLoginButton(): Phaser.GameObjects.Text {
    const button = this.add
      .text(
        this.containerWidth / 2 - 220,
        this.containerHeight * 0.75,
        I18nUtils.getTranslation(this, 'NEW_LOGIN'),
        {
          fontFamily: 'DINAlternateBold',
          fontSize: '24px',
          color: '#000000',
        }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.loginModal.show();
    });
    return button;
  }

  private createRegisterButton(): Phaser.GameObjects.Text {
    const button = this.add
      .text(
        this.containerWidth / 2 + 220,
        this.containerHeight * 0.75,
        I18nUtils.getTranslation(this, 'NEW_REGISTER'),
        {
          fontFamily: 'DINAlternateBold',
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#007bff',
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.registerModal.show();
    });
    return button;
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

  private createLoginModal(): void {
    this.loginModal = new LoginModal(this);
    this.loginModal.on(this.loginModal.event, this.goToHome, this);
  }

  private createRegisterModal(): void {
    this.registerModal = new RegisterModal(this);
    this.registerModal.on(
      this.registerModal.event,
      (args: [string, string]) => this.goToLogin(args[0], args[1]),
      this
    );
  }

  private goToHome(): void {
    this.scene.start(SceneKeyEnum.HomeSceneKey);
  }

  private goToLogin(email: string, password: string): void {
    this.loginModal.login(email, password);
  }

  private async refreshAccessToken(): Promise<void> {
    this.loading.show();
    try {
      const response = await UserService.refreshAccessToken();
      saveAccessToken(response.accessToken);
      await this.loginModal.callAllUserAPI();
      this.goToHome();
    } catch (error) {
      this.showOffcanvas();
      this.loading.hide();
    }
  }

  private createVersionText(): void {
    this.add.text(
      this.containerWidth - 40,
      this.containerHeight - 20,
      `v.${process.env.npm_package_version}`,
      {
        fontFamily: 'DINAlternateBold',
        fontSize: '12px',
        color: '#ffffff',
        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: '#000000',
          blur: 5,
          fill: true,
        },
      }
    );
  }

  private createByText(): void {
    this.add.text(
      5,
      this.containerHeight - 20,
      I18nUtils.getTranslation(this, 'CREATE_BY', { name: 'Charles' }),
      {
        fontFamily: 'DINAlternateBold',
        fontSize: '12px',
        color: '#ffffff',
        shadow: {
          offsetX: 3,
          offsetY: 3,
          color: '#000000',
          blur: 5,
          fill: true,
        },
      }
    );
  }
}
