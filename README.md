# 🔐 Azure Entra External ID - Multi-App Integration Project

This repository demonstrates a complete implementation of **Azure Entra External ID** using three integrated applications: a **backend API**, a **frontend web app**, and a **custom authentication extension** to personalize OTP emails.  
The main goal of this project is to build a secure and modern authentication experience for different types of users — public, educational, and enterprise — with a dynamic user interface and full token validation flow.

---

## 🧩 Project Structure

| Folder | Description |
|---------|-------------|
| `/backend-polimorfism-external-id` | .NET API that validates tokens issued by Azure Entra External ID. |
| `/frontend-polimorfism-external-id` | React application that manages the login process and consumes the API using an access token. |
| `/custom-otp-sender.api` | Custom Authentication Extension that modifies the OTP email sent to users. |
| `/screenshots` | Contains images showing the Azure configuration, authentication flow, and dynamic UI results. |

---

## ☁️ Azure Entra External ID Configuration

### 1. Tenant Creation
A dedicated **Azure Entra External ID tenant** was created to manage external identities and authentication flows for guest users.

### 2. Application Registrations
Three applications were registered within the tenant:
- **Backend API** → Validates and processes tokens received from authenticated users.  
- **Frontend SPA** → Handles the sign-in and sign-up flow using Email + OTP authentication.  
- **Custom Authentication Extension** → Modifies the content of OTP emails sent by Azure.

Each app includes its own **Client ID**, **Redirect URI**, and **API permissions** configured under Azure Entra.

### 3. User Flows
User flows were configured for:
- **Sign-up** (registration using email + OTP).  
- **Sign-in** (authentication using the same OTP method).

These flows enable a **passwordless experience**, improving security and user experience by using short-lived verification codes.

### 4. Custom Authentication Extension
A **Custom Authentication Extension** was created to intercept the `emailOtpSend` event and override the default Microsoft OTP email.  
This allows:
- Adding a **custom design and logo** to the email.  
- Enhancing branding consistency.  
- Improving the overall user experience when receiving OTPs.

---

## ⚙️ Application Logic

### 🔸 Backend
- Built with **.NET 7 / ASP.NET Core**.  
- Exposes a secure API endpoint (e.g., `/WeatherForecast`).  
- Validates tokens using **Microsoft Identity Platform**.  
- Requires an `Authorization: Bearer <access_token>` header for access.

### 🔸 Frontend
- Built with **React** and **MSAL.js** (Microsoft Authentication Library).  
- Handles login with a popup (`loginPopup`) and retrieves tokens silently (`acquireTokenSilent`).  
- Sends API requests with the retrieved access token.  
- Stores authenticated session information temporarily.  

### 🔸 Dynamic UI
After signing in, the frontend detects the **domain of the user’s email** (`@gmail.com`, `@edu.au`, `@company.com`) and updates the interface accordingly:
- **Public emails** (e.g., Gmail, Outlook) → show a simplified personal dashboard.  
- **Educational domains** (e.g., `.edu`) → show an academic interface.  
- **Corporate domains** → show a professional-style UI.

This dynamic behavior demonstrates how a multi-tenant application can adapt its appearance and content based on user type.

---

## 🖼️ Included Screenshots
The `/screenshots` folder includes:
- Azure portal setup for tenant and app registrations.  
- The sign-in and sign-up flow using Email + OTP.  
- The customized OTP email design.  
- UI examples for public, educational, and enterprise users.

---

## 🚀 Project Purpose
This project was designed as a **learning and portfolio demonstration**, covering:
- Integration of multiple apps with **Azure Entra External ID**.  
- Token validation and secure backend communication.  
- Customization of authentication flows using **Custom Authentication Extensions**.  
- UI logic based on user domain classification.

---

## 🧠 Technologies Used
- **Azure Entra External ID**  
- **MSAL.js (React)**  
- **.NET 7 / ASP.NET Core**  
- **React + Vite**  
- **Custom Authentication Extensions**  
- **Docker**  

---

## 👨‍💻 Author
**Estefano Chuquicusma**  
Full-Stack / Cloud Developer (Azure, .NET, React)  
📍 Perth, Western Australia  
[GitHub: estefano97](https://github.com/estefano97)