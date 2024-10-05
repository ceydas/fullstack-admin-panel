#### 🚨 Links in this repository are no longer being served, due to preventing incurring costs from Google Cloud.

# Full Stack Admin Configuration Panel
Responsive admin configuration management panel and REST API for serving app logic and UI configurations.
VueJS 3 for the front end and NodeJS for the back end are used.

## 🆕 What's New? Revision (July 1, 2024)
- Improved backend folder structure by separating admin from user (serving api) and controller from service. 
- Added 'routes' to differentiate user (serving) API from admin API. 
- Added x-api-key header check for serving API. 
- Eliminated hard coded error messages in the backend. 
- Fixed HTTP response codes. (200,201,204,403 etc.)
- Added Firestore transactions: in the case of a concurrent edit, the admin user is prompted to refresh the page.
- Prevent duplicate value tags from the frontend (i.e. the admin cannot add 2 default values)
- Added a loading icon

## Quick Start - Admin Console
- Go to https://codeway-fullstack-case-b9901.web.app which will redirect you to /signin
- Try to sign in as regular-user@gmail.com with password as "password"
- Try to sign in as invalid-user@gmail.com
- Try to sign in as admin@codeway.com with password as "password"
- You can modify the configurations if you have admin access.

## Quick Start - Postman
- Use the following endpoints:
  - Header `x-api-key` : `DeYKkmxoj5cqIDMFbOwB`

  - GET https://codeway-fullstack-case-b9901.ey.r.appspot.com/api/serving/configs/country
    - Example response  ```{
    "latest_version": "1.4.7",
    "min_version": "1.4.3",
    "premium_price": "13",
    "pricing_tier": "5",
    "scroll_limit": "13"
}```

  - GET https://codeway-fullstack-case-b9901.ey.r.appspot.com/api/serving/configs/country/TR (Use any country)
    - Example response ```{
    "country": "TR",
    "latest_version": "1.4.7",
    "min_version": "1.4.3",
    "premium_price": "15",
    "pricing_tier": "5",
    "scroll_limit": "13"
}```
 
  - If the given country has special values set for a parameter key, they will be shown. Otherwise, the default values will be shown.
  

## Do It Yourself Deployment
### Prerequisites
- Create a project on Firebase.
- Create database on Firestore called `config-parameters`,`api-keys` and `users`.
- Create new API key.
- Create an admin user and a regular user on Firebase Auth console, and save their UID along with an 'isAdmin' property to the `users` database.
- Obtain project credentials from the console. 
  
#### Backend Deployment Using Google App Engine
- Modify app.yaml based on the following credentials:  
```
  FIREBASE_CONFIG= '{"type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "your_private_key",
  "client_email": "client_email",
  "client_id": "cliend_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "cert_url",
  "universe_domain": "googleapis.com"}'
  ```

- Run locally to ensure the configuration is correct.
  - Run npm install
  - Run npm start

- In order to deploy the app to App Engine, include an app.yml file in the following format:
```
runtime: nodejs20
env: standard

handlers:
  - url: /.*
    script: auto

env_variables:
  FIREBASE_CONFIG: Use the credentials above
  NODE_ENV: "production"
  CLIENT_URL: "client_url"

# Optional settings
automatic_scaling:
  target_cpu_utilization: 0.65
  min_instances: 1
  max_instances: 1

entrypoint: node config-controller.js
```
- Run `gcloud auth login` and select the project you created.
- Run `gcloud app create` and specify a region (must be the same region as your Firestore)
- Run `gcloud app deploy`
- Once you deploy your application, use this endpoint in your frontend application as `VITE_BACKEND_URL`.

#### Frontend Deployment Using Firebase Hosting
- Modify .env based on the following credentials:  
```
VITE_FIREBASE_API_KEY ="api_key"
VITE_FIREBASE_AUTH_DOMAIN ="auth_domain"
VITE_FIREBASE_PROJECT_ID = "project_id"
VITE_FIREBASE_STORAGE_BUCKET = "storage_bucket"
VITE_FIREBASE_SENDER_ID = "sender_id"
VITE_FIREBASE_APP_ID = "app_id"

VITE_BACKEND_URL = "backend_url_app_engine"
```
- Run `npm run build` and copy the dist folder to public
- Run `firebase init hosting`
- Run `firebase deploy --only hosting`
- Access the hosting URL from the given address in the console.

## Overview
* Two separate services **frontend** and **backend** were used.
* `/api/admin` : Admin API
* `/api/serving` : User (Serving) API

* The frontend was tested for responsiveness on 10+ devices.

* The frontend and backend communicate via **axios** using HTTP.

## Endpoints
The backend verifies the user token sent via request headers before performing firebase transactions.

### Endpoints Available for Admins:
- `GET /api/admin/configs` Get all configuration parameters. The result is an object array.
- `POST /api/admin/configs` Add new configuration parameter to the database, providing a request body of type ‘Parameter’.
- `PUT /api/admin/configs` Update existing configuration parameter, providing a request body of type ‘Parameter’.
- `DELETE /api/admin/configs/{key}` Delete configuration parameter with the given key.

### Endpoints Available for Regular Users:
- `GET /api/serving/configs/country/{country}` Get all configuration parameters for a specified country, or default parameters if a country is not specified.

## Areas of Improvement
* Error handling and warning dialogs.
* Hard coded error messages in the frontend.
* Handling API key rotation and encryption.

## Front End Screenshots - Desktop

### Sign In Page
<img width="1120" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/5a248a03-8152-4597-8787-38fd47d49a13">

#### Unauthorized Access
<img width="1511" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/911fbeae-cf57-4a82-a17c-7ddda5098560">

### Home Page - Add New Parameter
<img width="1058" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/27403785-ecc1-4951-9d5c-e85bea352172">

### Home Page 
<img width="1062" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/86cb799f-7337-468e-8391-b405111e8add">

### Home Page - Edit Parameters 
<img width="1512" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/d00085ce-b011-41cd-adb6-64f549b509e4">

## Front End Screenshots - Mobile
<img width="793" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/8df2836c-85a3-4ced-be76-d9d724c5700c">
