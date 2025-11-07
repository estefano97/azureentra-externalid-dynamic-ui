// src/components/Header.jsx
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

const Header = () => {
  const { accounts, instance } = useMsal();
  const user = accounts[0];

  const handleLogout = async () => {
    // Logout without redirect, instead print token to console
    console.log("Logout clicked");
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      user
    });
    console.log(response.accessToken)
  };

  return (
    <header
      style={{
        backgroundColor: "#0d6efd",
        color: "white",
        display: "flex",
        padding: "10px 0px",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}
    >
      <div style={{ padding: "0px 10px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <div >
        <h3 style={{ margin: 0 }}>⚡ Mi App CIAM</h3>
        {user && (
          <small>
            <strong>{user.name || "Usuario sin nombre"}</strong> (
            {user.username})
          </small>
        )}
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "white",
          color: "#0d6efd",
          border: "none",
          borderRadius: "5px",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      </div>
    </header>
  );
};

export default Header;
