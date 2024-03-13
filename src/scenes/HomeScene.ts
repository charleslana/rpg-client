import * as Phaser from 'phaser';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { Character } from '@components/Character';
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
  private headerContainer: Phaser.GameObjects.Container;
  private headerExperienceBar: Phaser.GameObjects.Graphics;

  init(): void {
    this.currentUser = store.getState().user.currentUser;
    // this.userCharacters = store.getState().userCharacters.userCharacters;
  }

  create(): void {
    this.setBackgroundImage();
    // this.createLayout();
    // this.createLogoutButton();
    this.createHeader();
    this.updateExperienceBar(25, 100);
    this.createCharacters();
  }

  private setBackgroundImage(): void {
    this.cameras.main.setBackgroundColor('#ffffff');
    const backgroundImage = this.add.image(0, 0, AssetKeysEnum.HomeBackground).setOrigin(0, 0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createHeader(): void {
    this.headerContainer = this.add.container(0, 0);
    this.createExperienceBarBackground();
    this.createExperienceBar();
    const image = this.createAvatar();
    this.createAvatarName(image);
    this.createAvatarLevel(image);
  }

  private createExperienceBarBackground(): void {
    const experienceBarBackground = this.add.graphics();
    experienceBarBackground.fillStyle(0x333333);
    experienceBarBackground.fillRect(0, 0, this.cameras.main.width, 5);
    this.headerContainer.add(experienceBarBackground);
  }

  private createExperienceBar(): void {
    const totalExperience = 100;
    const currentExperience = 50;
    const experienceBarWidth = this.cameras.main.width * (currentExperience / totalExperience);
    this.headerExperienceBar = this.add.graphics();
    this.headerExperienceBar.fillStyle(0x7fff7f);
    this.headerExperienceBar.fillRect(0, 0, experienceBarWidth, 5);
    this.headerContainer.add(this.headerExperienceBar);
  }

  private updateExperienceBar(currentExperience: number, totalExperience: number): void {
    const experienceBarWidth = this.cameras.main.width * (currentExperience / totalExperience);
    this.headerExperienceBar.clear();
    this.headerExperienceBar.fillStyle(0x7fff7f);
    this.headerExperienceBar.fillRect(0, 0, experienceBarWidth, 5);
  }

  private createAvatar(): Phaser.GameObjects.Image {
    const imageWidth = 80;
    const imageHeight = 80;
    const border = this.add.graphics();
    border.lineStyle(2, 0x000000);
    border.strokeRect(0, 6, imageWidth, imageHeight);
    this.headerContainer.add(border);
    const image = this.add.image(
      imageWidth / 2,
      imageHeight / 2 + 6,
      AssetKeysEnum.AvatarFireKnight
    );
    image.setDisplaySize(imageWidth - 4, imageHeight - 4);
    this.headerContainer.add(image);
    return image;
  }

  private createAvatarName(image: Phaser.GameObjects.Image): void {
    const nameText = this.add.text(
      image.x + image.displayWidth / 2 + 10,
      image.y / 1.5,
      this.currentUser?.name ?? 'Sem nome',
      {
        fontFamily: 'DINAlternateBold',
        fontSize: '16px',
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
    nameText.setOrigin(0, 0.5);
    this.headerContainer.add(nameText);
  }

  private createAvatarLevel(image: Phaser.GameObjects.Image): void {
    const levelText = this.add.text(
      image.x + image.displayWidth / 2 + 10,
      image.y + image.displayHeight / 3,
      `Nível 1`,
      {
        fontFamily: 'DINAlternateBold',
        fontSize: '16px',
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
    levelText.setOrigin(0, 0.5);
    this.headerContainer.add(levelText);
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
