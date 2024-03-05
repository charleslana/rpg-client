import * as Phaser from 'phaser';
import { AssetKeysEnum } from '../enum/AssetKeysEnum';
import { I18nUtils } from '../utils/I18nUtils';
import { SceneKeyEnum } from '../enum/SceneKeyEnum';

export class PreloadScene extends Phaser.Scene {
  private progressBar: Phaser.GameObjects.Graphics;
  private progressBox: Phaser.GameObjects.Graphics;
  private loadingText: Phaser.GameObjects.Text;
  private percentText: Phaser.GameObjects.Text;
  private assetText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SceneKeyEnum.PreloadSceneKey });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor('#000000');
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
      text: 'Loading...',
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
    this.assetText.setText('Loading asset: ' + file.key);
  }

  private handleCompleteEvent(): void {
    this.progressBar.destroy();
    this.progressBox.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();
    this.scene.start(SceneKeyEnum.LoginSceneKey);
  }

  private loadAssets(): void {
    this.loadI18n();
    this.loadBattleBackground();
    this.loadIcons();
    this.loadFireKnight();
    this.loadRanger();
    this.loadMage();
    this.loadLogin();
  }

  private loadI18n(): void {
    const language = I18nUtils.get();
    if (language) {
      I18nUtils.setLanguage(language);
    } else {
      I18nUtils.setLanguage(navigator.language.split('-')[0]);
    }
    this.load.json(AssetKeysEnum.En, './assets/i18n/en.json');
    this.load.json(AssetKeysEnum.Pt, './assets/i18n/pt.json');
  }

  private loadLogin(): void {
    this.load.image(AssetKeysEnum.LoginBackground, './assets/images/login/login-bg.png');
  }

  private loadBattleBackground(): void {
    this.load.image(AssetKeysEnum.BattleForestBackground, './assets/images/battle-bg/1.png');
  }

  private loadIcons(): void {
    this.load.image(AssetKeysEnum.ShadowIcon, './assets/images/icons/shadow.png');
    this.load.spritesheet(AssetKeysEnum.Loading, './assets/images/icons/loading.png', {
      frameWidth: 62,
      frameHeight: 62,
    });
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
