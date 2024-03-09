import * as Phaser from 'phaser';
import { clearUser } from '../store/userSlice';
import { clearUserCharacters } from '../store/userCharactersSlice';
import { IUserCharacter } from '../interface/IUserCharacter';
import { removeAccessToken } from '../utils/localStorageUtils';
import { SceneKeyEnum } from '../enum/SceneKeyEnum';
import { store } from '../store/store';
import { UserMe } from '../interface/IUser';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeyEnum.HomeSceneKey });
  }

  private currentUser: UserMe | null;
  private userCharacters: IUserCharacter[];

  init(): void {
    this.currentUser = store.getState().user.currentUser;
    this.userCharacters = store.getState().userCharacters.userCharacters;
  }

  create(): void {
    this.setBackgroundColor();
    this.createLayout();
    this.createLogoutButton();
  }

  private setBackgroundColor(): void {
    this.cameras.main.setBackgroundColor('#800080');
  }

  private createLayout(): void {
    this.add.text(
      100,
      100,
      `Usuário logado: ${this.currentUser?.name}\nQuantidade de personagens: ${this.userCharacters.length}`,
      {
        backgroundColor: '#ffffff',
        color: '#000000',
      }
    );
    this.add
      .text(100, 200, 'Próxima Cena', {
        backgroundColor: '#00ff00',
        color: '#000000',
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      })
      .setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.POINTER_DOWN, () => this.goToBattleScene());
    this.input.keyboard!.on('keydown-A', () => {
      this.goToBattleScene();
    });
  }

  private createLogoutButton(): void {
    const logoutButton = this.add.text(100, 250, 'Sair', {
      backgroundColor: '#ff0000',
      color: '#000000',
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    });
    logoutButton.setInteractive({ cursor: 'pointer' });
    logoutButton.on(Phaser.Input.Events.POINTER_DOWN, () => this.logout());
  }

  private logout(): void {
    store.dispatch(clearUser());
    store.dispatch(clearUserCharacters());
    removeAccessToken();
    this.scene.start(SceneKeyEnum.LoginSceneKey);
  }

  private goToBattleScene(): void {
    this.scene.start(SceneKeyEnum.BattleSceneKey);
  }
}
