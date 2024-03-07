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
  token: string;
}
