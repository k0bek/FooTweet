import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      address: string;
      username: string;
      id: string;
    };
  }
  interface User {
    id: string;
    username: string;
  }
}
