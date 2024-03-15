import * as Phaser from 'phaser';
import GlobalError from '@shared/GlobalError';
import PublicService from '@service/PublicService';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { getErrorMessage } from '@utils/utils';
import { I18nUtils } from '@utils/I18nUtils';
import { SceneKeyEnum } from '@enum/SceneKeyEnum';

export class AssetScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeyEnum.AssetSceneKey });
  }

  private progressBar: Phaser.GameObjects.Graphics;
  private progressBox: Phaser.GameObjects.Graphics;
  private loadingText: Phaser.GameObjects.Text;
  private percentText: Phaser.GameObjects.Text;
  private assetText: Phaser.GameObjects.Text;
  private modal: Phaser.GameObjects.Container;
  private containerWidth: number;
  private containerHeight: number;
  private text: Phaser.GameObjects.Text;

  preload(): void {
    this.cameras.main.setBackgroundColor('#000000');
    this.createModal();
    this.createProgressBar();
    this.createLoadingText();
    this.createPercentText();
    this.createAssetText();
    this.setupLoadEvents();
    this.loadAssets();
  }

  private createProgressBar(): void {
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.progressBox.fillRect(barX, barY, barWidth, barHeight);
  }

  private createLoadingText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: I18nUtils.getTranslation(this, 'LOADING'),
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);
  }

  private createPercentText(): void {
    const barWidth = 320;
    const barHeight = 50;
    const barX = (this.cameras.main.width - barWidth) / 2;
    const barY = (this.cameras.main.height - barHeight) / 2;
    this.percentText = this.make.text({
      x: barX + barWidth / 2,
      y: barY + barHeight / 2,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.percentText.setOrigin(0.5, 0.5);
  }

  private createAssetText(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    this.assetText.setOrigin(0.5, 0.5);
  }

  private setupLoadEvents(): void {
    this.load.on(Phaser.Loader.Events.PROGRESS, this.handleProgressEvent, this);
    this.load.on(Phaser.Loader.Events.FILE_LOAD, this.handleLoadEvent, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, this.handleCompleteEvent, this);
  }

  private handleProgressEvent(value: number): void {
    this.percentText.setText(`${Math.round(value * 100)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0xffffff, 1);
    const barWidth = 300;
    const barHeight = 30;
    const barY = (this.cameras.main.height - barHeight) / 2;
    const progressBarX = (this.cameras.main.width - barWidth) / 2;
    this.progressBar.fillRect(progressBarX, barY, barWidth * value, barHeight);
  }

  private handleLoadEvent(file: Phaser.Loader.File): void {
    this.assetText.setText(I18nUtils.getTranslation(this, 'LOADING_ASSET', { asset: file.key }));
  }

  private async handleCompleteEvent(): Promise<void> {
    try {
      await this.checkVersion();
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
      this.scene.start(SceneKeyEnum.HomeSceneKey);
    } catch (error) {
      this.text.setText(getErrorMessage(this, error));
      this.show();
    }
  }

  private loadAssets(): void {
    this.loadBattleBackground();
    this.loadIcons();
    this.loadFireKnight();
    this.loadRanger();
    this.loadMage();
    this.loadLogin();
    this.loadHome();
    this.loadAvatar();
  }

  private async checkVersion(): Promise<void> {
    const version = await PublicService.getVersion();
    if (version != process.env.npm_package_version) {
      throw new GlobalError(I18nUtils.getTranslation(this, 'OUTDATED_VERSION'));
    }
  }

  private createModal(): void {
    this.containerWidth = this.cameras.main.width;
    this.containerHeight = this.cameras.main.height;
    this.modal = this.add.container(0, 0);
    this.modal.setDepth(999);
    const blockingRect = this.createBlocking();
    this.createText();
    this.modal.add([blockingRect, this.text]);
    this.hide();
  }

  private createBlocking(): Phaser.GameObjects.Rectangle {
    const blockingRect = this.add.rectangle(
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

  private createText(): void {
    this.text = this.add
      .text(this.containerWidth / 2, this.containerHeight / 2, '...', {
        fontFamily: 'DINAlternateBold',
        fontSize: '32px',
        color: '#ff0000',
      })
      .setOrigin(0.5);
  }

  public show(): void {
    this.modal.setVisible(true);
  }

  public hide(): void {
    this.modal.setVisible(false);
  }

  private loadLogin(): void {
    this.load.image(AssetKeysEnum.LoginBackground, './assets/images/login/login-bg.png');
  }

  private loadBattleBackground(): void {
    this.load.image(AssetKeysEnum.BattleForestBackground, './assets/images/battle-bg/1.png');
  }

  private loadIcons(): void {
    this.load.image(AssetKeysEnum.ShadowIcon, './assets/images/icons/shadow.png');
    this.load.image(AssetKeysEnum.RubyIcon, './assets/images/icons/ruby.png');
    this.load.image(AssetKeysEnum.GoldIcon, './assets/images/icons/gold.png');
    this.load.spritesheet(AssetKeysEnum.Loading, './assets/images/icons/loading.png', {
      frameWidth: 62,
      frameHeight: 62,
    });
  }

  private loadHome(): void {
    this.load.image(AssetKeysEnum.HomeBackground, './assets/images/home/background.png');
  }

  private loadAvatar(): void {
    this.load.image(AssetKeysEnum.AvatarFireKnight, './assets/images/avatar/fire_knight.png');
  }

  private loadFireKnight(): void {
    this.load.atlas(
      AssetKeysEnum.FireKnightIdle,
      './assets/images/characters/fire_knight/fire_knight_idle.png',
      './assets/images/characters/fire_knight/fire_knight_idle.json'
    );
    this.load.atlas(
      AssetKeysEnum.FireKnightRun,
      './assets/images/characters/fire_knight/fire_knight_run.png',
      './assets/images/characters/fire_knight/fire_knight_run.json'
    );
    this.load.atlas(
      AssetKeysEnum.FireKnightAttackMelee,
      './assets/images/characters/fire_knight/fire_knight_attack_melee.png',
      './assets/images/characters/fire_knight/fire_knight_attack_melee.json'
    );
    this.load.atlas(
      AssetKeysEnum.FireKnightAttackArea,
      './assets/images/characters/fire_knight/fire_knight_attack_area.png',
      './assets/images/characters/fire_knight/fire_knight_attack_area.json'
    );
    this.load.atlas(
      AssetKeysEnum.FireKnightAttackAreaObject,
      './assets/images/characters/fire_knight/fire_knight_attack_area_object.png',
      './assets/images/characters/fire_knight/fire_knight_attack_area_object.json'
    );
  }

  private loadRanger(): void {
    this.load.atlas(
      AssetKeysEnum.RangerIdle,
      './assets/images/characters/ranger/ranger_idle.png',
      './assets/images/characters/ranger/ranger_idle.json'
    );
    this.load.atlas(
      AssetKeysEnum.RangerAttackRanged,
      './assets/images/characters/ranger/ranger_attack_ranged.png',
      './assets/images/characters/ranger/ranger_attack_ranged.json'
    );
    this.load.atlas(
      AssetKeysEnum.RangerAttackRangedObject,
      './assets/images/characters/ranger/ranger_attack_ranged_object.png',
      './assets/images/characters/ranger/ranger_attack_ranged_object.json'
    );
  }

  private loadMage(): void {
    this.load.atlas(
      AssetKeysEnum.MageIdle,
      './assets/images/characters/mage/mage_idle.png',
      './assets/images/characters/mage/mage_idle.json'
    );
    this.load.atlas(
      AssetKeysEnum.MageAttackArea,
      './assets/images/characters/mage/mage_area.png',
      './assets/images/characters/mage/mage_area.json'
    );
    this.load.atlas(
      AssetKeysEnum.MageAttackAreaObject,
      './assets/images/characters/mage/mage_area_object.png',
      './assets/images/characters/mage/mage_area_object.json'
    );
  }
}
