// src/authConfig.ts
import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "4be3b43d-3fe8-453f-99a1-2b0c3ef84b1d",
    authority: "https://polimortfismpractice.ciamlogin.com/polimortfismpractice.onmicrosoft.com/v2.0",
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};

export const loginRequest = {
  scopes: ["openid", "profile", "offline_access", "api://565e5354-b0a6-48f3-abf2-65d5bed374af/access_as_user"]
};
