# NextAuth.js Authentication Implementation

This guide documents the implementation of NextAuth.js authentication in the application, including GitHub OAuth provider setup.

## Installation & Setup

Followed the official NextAuth.js installation guide:
- Documentation: [NextAuth.js Installation](https://authjs.dev/getting-started/installation?framework=Next.js)

## Key Implementation Steps

### 1. Session Provider Configuration

The main layout is wrapped with `SessionProvider` to make session data available throughout the application:

```tsx
// app/layout.tsx or app/providers.tsx
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

### 2. Authentication Handler

Implemented sign-in functionality for different providers (GitHub, Google):

```tsx
// components/auth/SignInButton.tsx
"use client";

import { signIn } from "next-auth/react";
import { ROUTES } from "@/config/routes";

const SignInButton = () => {
  const handleSignIn = async (provider: "GitHub" | "google") => {
    try {
      await signIn(provider, {
        redirectTo: ROUTES.HOME,
        redirect: false,
      });
    } catch (error) {
      console.error(`Failed to sign in with ${provider}:`, error);
    }
  };

  return (
    <div>
      <button onClick={() => handleSignIn("GitHub")}>
        Sign in with GitHub
      </button>
      <button onClick={() => handleSignIn("google")}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInButton;
```

### 3. Accessing User Session

To retrieve the current user's session information:

```tsx
// app/dashboard/page.tsx (Server Component)
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  
  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
}
```

### 4. Sign Out Implementation

Implemented a server-side sign-out form:

```tsx
// components/auth/SignOutButton.tsx
import { signOut } from "@/auth";
import { ROUTES } from "@/config/routes";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  return (
    <form
      className="px-10 pt-25"
      action={async () => {
        "use server";
        await signOut({ redirectTo: ROUTES.SIGN_IN });
      }}
    >
      <Button type="submit" className="bg-light-900 text-dark-100 border">
        Log out
      </Button>
    </form>
  );
};

export default SignOutButton;
```

## Important Import Notes

### Client-side Components
For client components that need authentication functionality:

```tsx
import { signIn, signOut, useSession } from "next-auth/react";
```

### Server-side Components
For server components and server actions:

```tsx
import { auth, signOut } from "@/auth";
```

## Environment Variables

Ensure the following environment variables are set in your `.env.local` file:

```env
# GitHub OAuth
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret

# Google OAuth (if implemented)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# NextAuth
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Security Considerations

1. **Session Security**: The session is securely managed by NextAuth.js with JWT or database sessions
2. **CSRF Protection**: NextAuth.js includes built-in CSRF protection
3. **Redirect Security**: Always use absolute URLs for redirects
4. **Environment Variables**: Never commit sensitive credentials to version control

## Troubleshooting

### Common Issues:

1. **Missing Environment Variables**: Ensure all required OAuth credentials are set
2. **Redirect Issues**: Verify `NEXTAUTH_URL` matches your deployment URL
3. **Session Not Persisting**: Check cookie settings and domain configuration
4. **Provider Configuration**: Verify callback URLs are correctly configured in OAuth provider settings

### Debugging:
- Check browser console for client-side errors
- Review server logs for authentication errors
- Verify OAuth provider callback URLs

## Next Steps

1. Implement additional OAuth providers as needed
2. Add role-based access control
3. Implement email/password authentication
4. Add two-factor authentication
5. Set up database adapter for persistent sessions

For more details, refer to the [NextAuth.js Documentation](https://authjs.dev).