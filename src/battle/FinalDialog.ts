import * as Phaser from 'phaser';

export class FinalDialog extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.createDialog();
  }

  public event = 'event';

  private modalX = this.scene.cameras.main.width / 2;
  private modalY = this.scene.cameras.main.height / 2;
  private modal: Phaser.GameObjects.Container;
  private overlay: Phaser.GameObjects.Rectangle;
  private containerWidth: number;
  private containerHeight: number;

  private createDialog(): void {
    this.containerWidth = this.scene.cameras.main.width;
    this.containerHeight = this.scene.cameras.main.height;
    this.modal = this.scene.add.container(0, 0);
    this.modal.setDepth(999);
    this.createOverlay();
    const modalContent = this.createModalContent();
    const text = this.createText();
    const button = this.createButton();
    this.modal.add([this.overlay, modalContent, text, button]);
  }

  private createOverlay(): void {
    this.overlay = this.scene.add
      .rectangle(0, 0, this.containerWidth, this.containerHeight, 0x000000, 0.5)
      .setOrigin(0)
      .setInteractive();
    this.overlay.on(Phaser.Input.Events.POINTER_DOWN, () => {});
  }

  private createModalContent(): Phaser.GameObjects.Rectangle {
    const offcanvasContent = this.scene.add
      .rectangle(this.modalX, this.modalY, 500, 300, 0xffffff)
      .setOrigin(0.5)
      .setInteractive();
    offcanvasContent.on(Phaser.Input.Events.POINTER_DOWN, () => {});
    return offcanvasContent;
  }

  private createText(): Phaser.GameObjects.Text {
    const text = this.scene.add.text(
      this.modalX,
      this.modalY,
      'Batalha finalizada\nExp adquirido: +50\nGold adquirido: +15',
      {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
        align: 'center',
        wordWrap: {
          width: 480,
          useAdvancedWrap: true,
        },
      }
    );
    text.setOrigin(0.5);
    return text;
  }

  private createButton(): Phaser.GameObjects.Text {
    const button = this.scene.add.text(this.modalX, this.modalY + 80, 'Fechar', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#ffffff',
      backgroundColor: '#007bff',
      padding: {
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
      },
    });
    button.setOrigin(0.5);
    button.setInteractive({ cursor: 'pointer' });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.emitButton();
    });
    return button;
  }

  private emitButton(): void {
    this.emit(this.event);
    this.overlay.destroy();
    this.modal.destroy();
  }
}
