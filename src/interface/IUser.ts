export interface ICreateUser {
  email: string;
  password: string;
  name: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export interface UserMe {
  name: string;
  level: number;
  gold: number;
  ruby: number;
  experience: number;
  maxExperience: number;
}
