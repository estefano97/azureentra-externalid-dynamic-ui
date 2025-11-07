// src/App.jsx
import React from "react";
import { useMsal } from "@azure/msal-react";
import Header from "./Header";
import { loginRequest } from "./authConfig";
import { classifyEmailType } from "./utils";

function App() {
  const { accounts, instance } = useMsal();
  const isAuthenticated = accounts.length > 0;

  const login = () => {
    instance.loginPopup(loginRequest);
  };

  const callApi = async () => {
    const account = accounts[0];
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account
    });
    console.log(response.accessToken)

    // Call your secure API here with the token from Entra External ID
    const result = await fetch("https://localhost:7223/WeatherForecast", {
      headers: {
        Authorization: `Bearer ${response.accessToken}`
      }
    });

    console.log(await result.text());
  };

  const email = isAuthenticated ? accounts[0].username : null;

  // 🏷️ Identifying account type by email domain (Educational, Public or Private)
  const accountType = classifyEmailType(email);

  return (
    <>
      {isAuthenticated ? (
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div style={{width: "100%"}}><Header /></div>
          <h2 style={{marginTop: "5rem"}}>Welcome 👋</h2>
          <h2>Your account type is: {accountType}</h2>
          <button onClick={callApi}>Call Secure API</button>
        </div>
      ) : (
        <div style={{width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h2>You are not login yet!</h2>
          <button onClick={login} style={{marginBottom:"1rem", background: "blue"}}>Login or Register Here!</button>
          <button onClick={callApi}>Call Secure API</button>
          </div>
      )}
    </>
  );
}

export default App;