import * as Phaser from 'phaser';
import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { I18nUtils } from '@utils/I18nUtils';
import { SceneKeyEnum } from '@enum/SceneKeyEnum';

export class InitScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKeyEnum.InitSceneKey });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor('#000000');
    this.createText();
    this.loadI18n();
    this.setupLoadEvents();
  }

  private createText(): void {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const loadingText = this.add.text(centerX, centerY, '...', {
      fontFamily: 'Arial',
      fontSize: 24,
      color: '#ffffff',
    });
    loadingText.setOrigin(0.5);
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
    this.load.json(AssetKeysEnum.Es, './assets/i18n/es.json');
  }

  private setupLoadEvents(): void {
    this.load.on(Phaser.Loader.Events.COMPLETE, this.handleCompleteEvent, this);
  }

  private handleCompleteEvent(): void {
    this.scene.start(SceneKeyEnum.AssetSceneKey);
  }
}
