import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      session.user.picture = token.picture;
      session.accessToken=token.serverToken;
      return session;
    },
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
        token.picture = profile?.picture;
         // ✅ Assigner le bon ID Token récupéré depuis `account`
         token.idToken = account.id_token;
     
        
        try{
            const response=await fetch("http://localhost:8080/google",{
                 method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken: token.idToken }),
                
            })
              if (response.ok) {
                const data = await response.text();
                token.serverToken = data; // Stocker le token généré par le backend
            }
        }catch(error){
            console.log(error);
        }
        
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// Gérer les requêtes GET et POST
export { handler as GET, handler as POST };
