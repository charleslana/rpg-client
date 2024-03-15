import * as Phaser from 'phaser';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { formatNumber } from '@utils/utils';
import { I18nUtils } from '@utils/I18nUtils';
import { UserMe } from '@interface/IUser';

export class Header extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createHeader();
  }

  private headerContainer: Phaser.GameObjects.Container;
  private headerExperienceBar: Phaser.GameObjects.Graphics;
  private userName: Phaser.GameObjects.Text;
  private userLevel: Phaser.GameObjects.Text;

  public updateUser(user: UserMe | null): void {
    this.userName.setText(user?.name ?? 'NO_NAME');
  }

  public updateExperienceBar(currentExperience: number, totalExperience: number): void {
    const experienceBarWidth =
      this.scene.cameras.main.width * (currentExperience / totalExperience);
    this.headerExperienceBar.clear();
    this.headerExperienceBar.fillStyle(0x1286d7);
    this.headerExperienceBar.fillRect(0, 0, experienceBarWidth, 5);
  }

  private createHeader(): void {
    this.headerContainer = this.scene.add.container(0, 0);
    this.createHeaderBar();
    this.createExperienceBarBackground();
    this.createExperienceBar();
    const image = this.createAvatar();
    this.createAvatarName(image);
    this.createAvatarLevel(image);
  }

  private createHeaderBar(): void {
    const headerBar = this.scene.add.rectangle(0, 0, this.scene.cameras.main.width, 85, 0x202429);
    headerBar.setOrigin(0);
    this.headerContainer.add(headerBar);
    this.createGoldInfo();
    this.createRubyInfo();
  }

  private createGoldInfo(): void {
    const backgroundWidth = 150;
    const backgroundHeight = 42.5;
    this.createGoldBackground(backgroundWidth, backgroundHeight);
    this.createGoldImage(backgroundWidth);
    this.createGoldText(backgroundWidth);
  }

  private createGoldBackground(backgroundWidth: number, backgroundHeight: number): void {
    const goldBackground = this.scene.add.graphics();
    const cornerRadius = 10;
    goldBackground.fillStyle(0x000000);
    goldBackground.fillRoundedRect(
      this.scene.cameras.main.width - 20 - backgroundWidth * 2 - 20,
      42.5 - backgroundHeight / 2,
      backgroundWidth,
      backgroundHeight,
      cornerRadius
    );
    this.headerContainer.add(goldBackground);
  }

  private createGoldImage(backgroundWidth: number): void {
    const goldImage = this.scene.add.image(
      this.scene.cameras.main.width - 20 - backgroundWidth * 2 + 25,
      42.5,
      AssetKeysEnum.GoldIcon
    );
    goldImage.setOrigin(1, 0.5);
    this.headerContainer.add(goldImage);
  }

  private createGoldText(backgroundWidth: number): void {
    const goldText = this.scene.add.text(
      this.scene.cameras.main.width - 20 - backgroundWidth * 2 + 120,
      42.5,
      formatNumber(10000),
      {
        fontFamily: 'Beleren2016SmallCapsBold',
        fontSize: '16px',
        color: '#ffffff',
        align: 'right',
      }
    );
    goldText.setOrigin(1, 0.5);
    this.headerContainer.add(goldText);
  }

  private createRubyInfo(): void {
    const backgroundWidth = 150;
    const backgroundHeight = 42.5;
    this.createRubyBackground(backgroundWidth, backgroundHeight);
    this.createRubyImage(backgroundWidth);
    this.createRubyText();
  }

  private createRubyText(): void {
    const rubyText = this.scene.add.text(
      this.scene.cameras.main.width - 30,
      42.5,
      formatNumber(5000),
      {
        fontFamily: 'Beleren2016SmallCapsBold',
        fontSize: '16px',
        color: '#ffffff',
        align: 'right',
      }
    );
    rubyText.setOrigin(1, 0.5);
    this.headerContainer.add(rubyText);
  }

  private createRubyImage(backgroundWidth: number): void {
    const rubyImage = this.scene.add.image(
      this.scene.cameras.main.width - 20 - backgroundWidth + 40,
      42.5,
      AssetKeysEnum.RubyIcon
    );
    rubyImage.setOrigin(1, 0.5);
    this.headerContainer.add(rubyImage);
  }

  private createRubyBackground(backgroundWidth: number, backgroundHeight: number): void {
    const rubyBackground = this.scene.add.graphics();
    const cornerRadius = 10;
    rubyBackground.fillStyle(0x000000);
    rubyBackground.fillRoundedRect(
      this.scene.cameras.main.width - 20 - backgroundWidth,
      42.5 - backgroundHeight / 2,
      backgroundWidth,
      backgroundHeight,
      cornerRadius
    );
    this.headerContainer.add(rubyBackground);
  }

  private createExperienceBarBackground(): void {
    const experienceBarBackground = this.scene.add.graphics();
    experienceBarBackground.fillStyle(0x202a3b);
    experienceBarBackground.fillRect(0, 0, this.scene.cameras.main.width, 5);
    this.headerContainer.add(experienceBarBackground);
  }

  private createExperienceBar(): void {
    const totalExperience = 100;
    const currentExperience = 50;
    const experienceBarWidth =
      this.scene.cameras.main.width * (currentExperience / totalExperience);
    this.headerExperienceBar = this.scene.add.graphics();
    this.headerExperienceBar.fillStyle(0x1286d7);
    this.headerExperienceBar.fillRect(0, 0, experienceBarWidth, 5);
    this.headerContainer.add(this.headerExperienceBar);
  }

  private createAvatar(): Phaser.GameObjects.Image {
    const imageWidth = 80;
    const imageHeight = 80;
    const maskGraphics = this.scene.make.graphics();
    maskGraphics.fillStyle(0xffffff);
    maskGraphics.fillCircle(imageWidth / 2, imageHeight / 2 + 6, imageWidth / 2);
    const mask = maskGraphics.createGeometryMask();
    const avatarImage = this.scene.add.image(
      imageWidth / 2,
      imageHeight / 2 + 6,
      AssetKeysEnum.AvatarFireKnight
    );
    avatarImage.setDisplaySize(imageWidth - 4, imageHeight - 4);
    avatarImage.setMask(mask);
    this.headerContainer.add(avatarImage);
    const border = this.scene.add.graphics();
    border.lineStyle(2, 0x000000);
    border.strokeCircle(imageWidth / 2, imageHeight / 2 + 6, imageWidth / 2);
    this.headerContainer.add(border);
    return avatarImage;
  }

  private createAvatarName(image: Phaser.GameObjects.Image): void {
    this.userName = this.scene.add.text(
      image.x + image.displayWidth / 2 + 10,
      image.y / 1.5,
      'NO_NAME',
      {
        fontFamily: 'Beleren2016SmallCapsBold',
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
    this.userName.setOrigin(0, 0.5);
    this.headerContainer.add(this.userName);
  }

  private createAvatarLevel(image: Phaser.GameObjects.Image): void {
    this.userLevel = this.scene.add.text(
      image.x + image.displayWidth / 2 + 10,
      image.y + image.displayHeight / 7,
      I18nUtils.getTranslation(this.scene, 'HEADER_USER_LEVEL', { level: '1' }),
      {
        fontFamily: 'Beleren2016SmallCapsBold',
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
    this.userLevel.setOrigin(0, 0.5);
    this.headerContainer.add(this.userLevel);
  }
}
