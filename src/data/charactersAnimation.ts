import { AssetKeysEnum } from '@enum/AssetKeysEnum';
import { ICharacterAnimation } from '@interface/ICharacterAnimation';

export const characterFireKnight: ICharacterAnimation = {
  scaleX: 2,
  shadowX: 7,
  shadowY: 20,
  shadowScale: 0.7,
  idle: {
    key: AssetKeysEnum.FireKnightIdle,
    frames: generateFrameNumbers(AssetKeysEnum.FireKnightIdle, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  run: {
    key: AssetKeysEnum.FireKnightRun,
    frames: generateFrameNumbers(AssetKeysEnum.FireKnightRun, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
    repeat: -1,
  },
  attackMelee: {
    key: AssetKeysEnum.FireKnightAttackMelee,
    frames: generateFrameNumbers(AssetKeysEnum.FireKnightAttackMelee, 1, 11),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackMeleeArea: {
    positionX: 360,
    positionY: 390,
    key: AssetKeysEnum.FireKnightAttackArea,
    frames: generateFrameNumbers(AssetKeysEnum.FireKnightAttackArea, 1, 18),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackMeleeAreaObject: {
    scale: 4.5,
    positionX: 125,
    positionY: 480,
    key: AssetKeysEnum.FireKnightAttackAreaObject,
    frames: generateFrameNumbers(AssetKeysEnum.FireKnightAttackAreaObject, 1, 3),
    frameRate: 10,
    frameRateStart: 10,
  },
};

export const characterRanger: ICharacterAnimation = {
  scaleX: 2,
  shadowX: -11,
  shadowY: 20,
  shadowScale: 0.7,
  idle: {
    key: AssetKeysEnum.RangerIdle,
    frames: generateFrameNumbers(AssetKeysEnum.RangerIdle, 1, 12),
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
  },
  attackRanged: {
    isInitObject: false,
    key: AssetKeysEnum.RangerAttackRanged,
    frames: generateFrameNumbers(AssetKeysEnum.RangerAttackRanged, 1, 11),
    frameRate: 11,
    frameRateStart: 11,
  },
  attackRangedObject: {
    scale: 2,
    positionY: -65,
    positionX: 65,
    key: AssetKeysEnum.RangerAttackRangedObject,
    frames: [{ key: AssetKeysEnum.RangerAttackRangedObject, frame: 'arrow_.png' }],
    frameRate: 1,
    frameRateStart: 1,
  },
};

export const characterMage: ICharacterAnimation = {
  scaleX: 1.2,
  shadowX: -10,
  shadowY: 20,
  shadowScale: 0.6,
  idle: {
    key: AssetKeysEnum.MageIdle,
    frames: generateFrameNumbers(AssetKeysEnum.MageIdle, 1, 6),
    frameRate: 7,
    frameRateStart: 7,
    repeat: -1,
  },
  attackArea: {
    key: AssetKeysEnum.MageAttackArea,
    frames: generateFrameNumbers(AssetKeysEnum.MageAttackArea, 1, 8),
    frameRate: 10,
    frameRateStart: 10,
  },
  attackAreaObject: {
    scale: 3.5,
    positionX: 25,
    positionY: 500,
    key: AssetKeysEnum.MageAttackAreaObject,
    frames: generateFrameNumbers(AssetKeysEnum.MageAttackAreaObject, 0, 81, 4, 'frame'),
    frameRate: 60,
    frameRateStart: 60,
  },
};

function generateFrameNumbers(key: string, start: number, end: number, zeroPad = 0, text = '') {
  const frames = [];
  for (let i = start; i <= end; i++) {
    const frame = `${text}${i.toString().padStart(zeroPad, '0')}.png`;
    frames.push({ key, frame });
  }
  return frames;
}
