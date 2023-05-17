import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { connectToDatabase } from '@/lib/connectToDatabase';
import verifyPassword from '@/lib/verifyPassword';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@user.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Credentials not provided');
        }

        const client = await connectToDatabase();

        const userCollection = client.db().collection('users');

        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error('There is no user with this email');
        }

        const isPasswordValid = await verifyPassword(credentials.password, user.password);

        if (!isPasswordValid) {
          client.close();
          throw new Error('Password is invalid');
        }

        client.close();

        return {
          email: user.email,
          username: user.username,
          id: user._id.toString(),
        };
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      session.user.username = token.username as string;
      session.user.id = token.uid as string;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.uid = user.id;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);

// callbacks: {
//   session: async ({ session, token }) => {
//     session.accessToken = token.accessToken;
//     session.user.username = token.username as string;
//     session.user.id = token.uid as string;
//     return Promise.resolve(session);
//   },
//   jwt: async ({ token, user }) => {
//     if (user) {
//       token.id = user.id;
//       token.username = user.username;
//       token.uid = user.id;
//     }
//     return Promise.resolve(token);
//   },
// },
// jwt: {
//   encryption: true,
//   secret: process.env.NEXT_AUTH_JWT_SECRET,
// },
