import * as Phaser from 'phaser';
import { AssetKeysEnum } from '../enum/AssetKeysEnum';

export class Loading extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createDialog();
  }

  private modalX = this.scene.cameras.main.width / 2;
  private modalY = this.scene.cameras.main.height / 2;
  private modal: Phaser.GameObjects.Container;
  private overlay: Phaser.GameObjects.Rectangle;
  private containerWidth: number;
  private containerHeight: number;

  public show(): void {
    this.overlay.setVisible(true);
    this.modal.setVisible(true);
  }

  public hide(): void {
    this.overlay.setVisible(false);
    this.modal.setVisible(false);
  }

  private createDialog(): void {
    this.containerWidth = this.scene.cameras.main.width;
    this.containerHeight = this.scene.cameras.main.height;
    this.modal = this.scene.add.container(0, 0);
    this.modal.setDepth(9999);
    this.createOverlay();
    const loadingSprite = this.createLoadingSprite();
    this.modal.add([this.overlay, loadingSprite]);
  }

  private createOverlay(): void {
    this.overlay = this.scene.add
      .rectangle(0, 0, this.containerWidth, this.containerHeight, 0x000000, 0.5)
      .setOrigin(0)
      .setInteractive();
    this.overlay.on(Phaser.Input.Events.POINTER_DOWN, () => {});
  }

  private createLoadingSprite(): Phaser.GameObjects.Sprite {
    const loadingSprite = this.scene.add.sprite(this.modalX, this.modalY, AssetKeysEnum.Loading);
    if (!this.scene.anims.exists('loadingAnimation')) {
      this.scene.anims.create({
        key: 'loadingAnimation',
        frames: this.scene.anims.generateFrameNumbers(AssetKeysEnum.Loading, {
          start: 0,
          end: 120,
        }),
        frameRate: 30,
        repeat: -1,
      });
    }
    loadingSprite.play('loadingAnimation');
    return loadingSprite;
  }
}
