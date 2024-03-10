import * as Phaser from 'phaser';
import UserCharacterService from '@service/UserCharacterService';
import UserService from '@service/UserService';
import { getErrorMessage } from '@utils/utils';
import { I18nUtils } from '@utils/I18nUtils';
import { Loading } from '@components/Loading';
import { saveAccessToken, saveRefreshToken } from '@utils/localStorageUtils';
import { setUser } from '@store/userSlice';
import { setUserCharacters } from '@store/userCharactersSlice';
import { store } from '@store/store';

export class LoginModal extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createModal();
  }

  public event = 'event';

  private modal: Phaser.GameObjects.Container;
  private containerWidth = this.scene.cameras.main.width;
  private containerHeight = this.scene.cameras.main.height;
  private errorMessage: Phaser.GameObjects.Text;
  private loading: Loading;
  private emailInput: Phaser.GameObjects.DOMElement;
  private passwordInput: Phaser.GameObjects.DOMElement;

  public show(): void {
    this.modal.setVisible(true);
  }

  public hide(): void {
    this.modal.setVisible(false);
  }

  public showErrorMessage(message: string): void {
    this.errorMessage.setText(message);
    this.errorMessage.setVisible(true);
  }

  public hideErrorMessage(): void {
    this.errorMessage.setVisible(false);
  }

  public login(email: string, password: string): void {
    (this.emailInput.node as HTMLInputElement).setAttribute('value', email);
    (this.passwordInput.node as HTMLInputElement).setAttribute('value', password);
    this.callAPI();
  }

  public async callAllUserAPI(): Promise<void> {
    const getMe = await UserService.me();
    store.dispatch(setUser(getMe));
    const userCharacters = await UserCharacterService.getAll();
    store.dispatch(setUserCharacters(userCharacters));
  }

  private createModal(): void {
    this.loading = new Loading(this.scene);
    const text = this.createText();
    const closeButton = this.createCloseButton();
    this.createEmailInput();
    this.createPasswordInput();
    const button = this.createButton();
    const blockingRect = this.createBlocking();
    this.createErrorMessage();
    this.modal = this.scene.add.container(0, 0);
    this.modal.setDepth(1000);
    this.modal.add([
      blockingRect,
      text,
      closeButton,
      this.emailInput,
      this.passwordInput,
      button,
      this.errorMessage,
    ]);
    this.hide();
  }

  private createBlocking(): Phaser.GameObjects.Rectangle {
    const blockingRect = this.scene.add.rectangle(
      0,
      0,
      this.containerWidth,
      this.containerHeight,
      0xffffff,
      1
    );
    blockingRect.setOrigin(0);
    blockingRect.setInteractive();
    blockingRect.setDepth(1000);
    blockingRect.on(Phaser.Input.Events.POINTER_DOWN, () => {});
    return blockingRect;
  }

  private createText(): Phaser.GameObjects.Text {
    const text = this.scene.add
      .text(
        this.containerWidth / 2,
        this.containerHeight / 2 - 200,
        I18nUtils.getTranslation(this.scene, 'LOGIN_TITLE'),
        {
          fontFamily: 'DINAlternateBold',
          fontSize: '32px',
          color: '#000000',
        }
      )
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
      this.hideErrorMessage();
    });
    return closeButton;
  }

  private createEmailInput(): void {
    this.emailInput = this.scene.add.dom(
      this.containerWidth / 2,
      this.containerHeight / 2 - 50,
      'input',
      'width: 200px; height: 30px; padding: 5px; font-size: 16px; border: 1px solid #ccc; outline: none;'
    );
    this.emailInput.node.setAttribute('type', 'email');
    this.emailInput.node.setAttribute(
      'placeholder',
      I18nUtils.getTranslation(this.scene, 'INPUT_EMAIL')
    );
  }

  private createPasswordInput(): void {
    this.passwordInput = this.scene.add.dom(
      this.containerWidth / 2,
      this.containerHeight / 2,
      'input',
      'width: 200px; height: 30px; padding: 5px; font-size: 16px; border: 1px solid #ccc; outline: none;'
    );
    this.passwordInput.node.setAttribute('type', 'password');
    this.passwordInput.node.setAttribute(
      'placeholder',
      I18nUtils.getTranslation(this.scene, 'INPUT_PASSWORD')
    );
  }

  private createButton(): Phaser.GameObjects.Text {
    const button = this.scene.add
      .text(
        this.containerWidth / 2,
        this.containerHeight / 2 + 50,
        I18nUtils.getTranslation(this.scene, 'LOGIN_BUTTON'),
        {
          fontFamily: 'DINAlternateBold',
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#19c37d',
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.callAPI();
    });
    return button;
  }

  private createErrorMessage(): void {
    this.errorMessage = this.scene.add
      .text(this.containerWidth / 2, this.containerHeight / 2 + 100, 'Mensagem de erro', {
        fontFamily: 'DINAlternateBold',
        fontSize: '16px',
        color: '#ff0000',
      })
      .setOrigin(0.5);
    this.hideErrorMessage();
  }

  private async callAPI(): Promise<void> {
    this.hide();
    this.hideErrorMessage();
    this.loading.show();
    try {
      const response = await UserService.login(this.scene, {
        email: (this.emailInput.node as HTMLInputElement).value.trim(),
        password: (this.passwordInput.node as HTMLInputElement).value.trim(),
      });
      saveAccessToken(response.accessToken);
      saveRefreshToken(response.refreshToken);
      await this.callAllUserAPI();
      this.emit(this.event);
    } catch (err: unknown) {
      this.show();
      this.showErrorMessage(getErrorMessage(this.scene, err));
    } finally {
      this.loading.hide();
    }
  }
}
