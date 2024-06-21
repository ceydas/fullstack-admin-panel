# Codeway Full Stack Developer Case Study
Responsive admin configuration management panel and REST API for serving app logic and UI configurations for Codeway applications.
VueJS 3 for the front end and NodeJS for the back end are used.

## 🚨 Important notes for the reader:
- Due to the Eid Holidays, I updated the code and the README after the submission deadline (Jun 18).
- In total, I did restrict myself to 7 full working days.
- If that's a deal breaker, you can view my PDF project document for the latest version before the submission deadline (attached to my submission e-mail).
- If not, you can view the small changes to the code from the 'deploy' branch and continue to read on 🍀

## Quick Start
- Go to https://codeway-fullstack-case-b9901.web.app which will redirect you to /signin
- Try to sign in as regular-user@gmail.com 
- Try to sign in as admin@codeway.com
- You can modify the configurations if you have admin access.

## Do It Yourself Deployment
### Prerequisites
- Create a project on Firebase.
- Create database on Firestore called `config-parameters` and `users`.
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

## Overview
* Given the time constraint, in order to keep things simple, two separate services **frontend** and **backend** were used since separating the backend service into admin and user would introduce additional complexity due to separating databases and additional HTTP communication.

* The frontend was tested for responsiveness on 10+ devices.

* The frontend and backend communicate via **axios** using HTTP.

* In order to handle concurrency issues such as 2 admins writing to the database at the same time, firebase transactions might have been used for isolation. However, I was not able to implement it due to my limited understanding of firebase transactions' locking mechanism. That's definitely an area of improvement.

## Endpoints
The backend verifies the user token sent via request headers before performing firebase transactions.

### Endpoints Available for Admins:
- `GET /configs` Get all configuration parameters. The result is an object array.
- `GET /configs/country/{country}` Get all configuration parameters for a specified country, or default parameters if a country is not specified.
- `POST /configs` Add new configuration parameter to the database, providing a request body of type ‘Parameter’.
- `UPDATE /configs` Update existing configuration parameter, providing a request body of type ‘Parameter’.
- `DELETE configs/{key}` Delete configuration parameter with the given key.

### Endpoints Available for Regular Users:
- `GET ‘/configs/country/{country}` Get all configuration parameters for a specified country, or default parameters if a country is not specified.

## Areas of Improvement
* Error handling and warning dialogs.
* Prevent duplicate documents or document field values.
* A "loading" state can be added to make the frontend more user friendly.
* Firebase transactions, locking (since consistency of config parameters is more important than availability, we should use an appropriate strategy)

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
