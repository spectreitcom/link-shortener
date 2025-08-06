export type JwtPayload = {
  sub: string;
  email: string;
};

export type ValidatedUser = {
  id: string;
  email: string;
};
