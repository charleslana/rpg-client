import { CharacterSkillEnum } from '@enum/CharacterSkillEnum';

export interface ICharacter {
  id: number;
  name: string;
}

export interface IGetCharacter {
  id: number;
  name: string;
  description: string | null;
  characterClass: CharacterSkillEnum;
}
