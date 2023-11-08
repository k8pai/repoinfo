import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? '',
		}),
	],
	callbacks: {
		async jwt({ token, account, session, user, profile }) {
			if (profile) {
				return { ...token, username: profile.login };
			}

			return token;
		},
		async session({ token, session, user }) {
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
				},
			};
		},
	},
	secret: process.env.NEXTAUTH_SECRET ?? '',
};
