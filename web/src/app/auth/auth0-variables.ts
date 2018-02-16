interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'TSWTGq6o5dDKUYt1qxvSGWOjikQZ38VX',
    CLIENT_DOMAIN: 'feeldaburn.auth0.com', // e.g., you.auth0.com
    AUDIENCE: 'http://localhost/api',
    REDIRECT: 'http://localhost/auth0callback',
    SCOPE: 'openid profile email'
  };