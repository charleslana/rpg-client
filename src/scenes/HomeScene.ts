import * as Phaser from 'phaser';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { Character } from '@components/Character';
import { Header } from '@modules/home/Header';
import { SceneKeyEnum } from '@enum/SceneKeyEnum';
import { store } from '@store/store';
import { UserMe } from '@interface/IUser';
// import { clearUser } from '@store/userSlice';
// import { clearUserCharacters } from '@store/userCharactersSlice';
// import { IUserCharacter } from '@interface/IUserCharacter';
// import { removeAccessToken, removeRefreshToken } from '@utils/localStorageUtils';

export class HomeScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeyEnum.HomeSceneKey });
  }

  private currentUser: UserMe | null;
  // private userCharacters: IUserCharacter[];

  init(): void {
    this.currentUser = store.getState().user.currentUser;
    // this.userCharacters = store.getState().userCharacters.userCharacters;
  }

  create(): void {
    this.setBackgroundImage();
    // this.createLayout();
    // this.createLogoutButton();
    // this.createHeader();
    const header = new Header(this);
    header.updateUser(this.currentUser);
    this.createCharacters();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, AssetKeysEnum.HomeBackground).setOrigin(0, 0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createCharacters(): void {
    const fireKnight = new Character(this, this.getSlotY(1), 505);
    fireKnight.createCharacter({
      id: 1,
      characterId: 1,
      slot: 0,
    });
    const ranged = new Character(this, this.getSlotY(2), 505);
    ranged.createCharacter({
      id: 2,
      characterId: 2,
      slot: 0,
    });
    const mage = new Character(this, this.getSlotY(3), 505);
    mage.createCharacter({
      id: 3,
      characterId: 3,
      slot: 0,
    });
  }

  private getSlotY(slot: number): number {
    switch (slot) {
      case 1:
        return 400;
      case 2:
        return 500;
      case 3:
        return 600;
      default:
        return 0;
    }
  }

  // private createLayout(): void {
  //   this.add.text(
  //     100,
  //     100,
  //     `Usuário logado: ${this.currentUser?.name}\nQuantidade de personagens: ${this.userCharacters.length}`,
  //     {
  //       backgroundColor: '#ffffff',
  //       color: '#000000',
  //     }
  //   );
  //   this.add
  //     .text(100, 200, 'Próxima Cena', {
  //       backgroundColor: '#00ff00',
  //       color: '#000000',
  //       padding: {
  //         left: 10,
  //         right: 10,
  //         top: 10,
  //         bottom: 10,
  //       },
  //     })
  //     .setInteractive({ cursor: 'pointer' })
  //     .on(Phaser.Input.Events.POINTER_DOWN, () => this.goToBattleScene());
  //   this.input.keyboard!.on('keydown-A', () => {
  //     this.goToBattleScene();
  //   });
  // }

  // private createLogoutButton(): void {
  //   const logoutButton = this.add.text(100, 250, 'Sair', {
  //     backgroundColor: '#ff0000',
  //     color: '#000000',
  //     padding: {
  //       left: 10,
  //       right: 10,
  //       top: 10,
  //       bottom: 10,
  //     },
  //   });
  //   logoutButton.setInteractive({ cursor: 'pointer' });
  //   logoutButton.on(Phaser.Input.Events.POINTER_DOWN, () => this.logout());
  // }

  // private logout(): void {
  //   store.dispatch(clearUser());
  //   store.dispatch(clearUserCharacters());
  //   removeAccessToken();
  //   this.scene.start(SceneKeyEnum.LoginSceneKey);
  //   removeRefreshToken();
  // }

  // private goToBattleScene(): void {
  //   this.scene.start(SceneKeyEnum.BattleSceneKey);
  // }
}
