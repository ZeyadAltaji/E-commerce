export interface UserForRegister {
  userName: string;
  Email?: string;
  password: string;
  moblie?: number;
}
export
  interface UserForLogin{
    userName: string;
    password: string;
    token: string;
}
