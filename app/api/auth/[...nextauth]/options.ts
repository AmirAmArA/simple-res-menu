import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '../../../../firebase/firebaseClient';
import bcrypt from 'bcryptjs';
import { query, collection, where, getDocs } from 'firebase/firestore';

export const options: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          email: user.email,
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        }
        
      };
      },
  },
    pages: {
      signIn: '/auth/login',
      error: '/auth/error'
      },
    
    session: {
        strategy: 'jwt',
      },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
        
                const { email, password } = credentials;
                const q = query(collection(db, "users"), where("email", "==", email));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                  throw new Error('No user found');
                }
        
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const isPasswordValid = await bcrypt.compare(password, userData.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid Credentials');
                }
              const isAdmin = userData.roles === 'admin' ? true : false;
                if(!isAdmin) {
                  throw new Error('Not An Admin')
                }
              const user = {
                id: userDoc.id,
                email: userData.email,
                role: userData.roles,
              }
                return user
              },
        })
    ],
}