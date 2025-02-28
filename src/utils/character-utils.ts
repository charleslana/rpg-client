import { CharacterClassEnum } from '@/enums/character-class-enum';
import { GenderEnum } from '@/enums/gender-enum';

export function getGenderText(gender: GenderEnum): string {
  switch (gender) {
    case GenderEnum.M:
      return 'Masculino';
    case GenderEnum.F:
      return 'Feminino';
    case GenderEnum.NA:
      return 'Prefiro não dizer';
    default:
      return '';
  }
}

export function getCharacterClassText(characterClass: CharacterClassEnum): string {
  switch (characterClass) {
    case CharacterClassEnum.Attack:
      return 'Ataque';
    case CharacterClassEnum.Defense:
      return 'Defesa';
    case CharacterClassEnum.Magic:
      return 'Magia';
    case CharacterClassEnum.Support:
      return 'Suporte';
    default:
      return '';
  }
}
