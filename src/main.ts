import * as Phaser from 'phaser';
import { AssetScene } from '@scenes/AssetScene';
import { BattleScene } from '@scenes/BattleScene';
import { Game, Types } from 'phaser';
import { HomeScene } from '@scenes/HomeScene';
import { InitScene } from '@scenes/InitScene';
import { LoginScene } from '@scenes/LoginScene';

const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  parent: 'game-container',
  backgroundColor: '#028af8',
  dom: {
    createContainer: true,
  },
  scale: {
    width: 1024,
    height: 576,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: Boolean(process.env.DEBUG),
    },
  },
  banner: false,
  audio: {
    disableWebAudio: true,
  },
  scene: [InitScene, AssetScene, LoginScene, HomeScene, BattleScene],
};

export default new Game(config);
