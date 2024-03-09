import { IGetCharacter } from './ICharacter';

export interface IUserCharacter {
  id: number;
  name: string;
  level: string;
  strength: number;
  intelligence: number;
  dexterity: number;
  experience: number;
  experienceMax: number;
  attributePoint: number;
  attributePointUsed: number;
  pointsAvailable: number;
  slot: number | null;
  createdAt: string;
  character: IGetCharacter;
}
