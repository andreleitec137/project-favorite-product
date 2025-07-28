export interface JwtPayload {
  sub: string;
  email: string;
  name?: string;
  role: 'admin' | 'customer';
}

export interface JwtPayloadTransformed {
  email: string;
  name?: string;
  userId: string;
  role: 'admin' | 'customer';
}
