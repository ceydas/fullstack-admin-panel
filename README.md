# Codeway Full Stack Developer Case Study
Responsive admin configuration management panel and REST API for serving app logic and UI configurations for Codeway applications.
VueJS 3 for the front end and NodeJS for the back end are used.

## Quick Start
- `TODO`

## Overview
* Given the time constraint, in order to keep things simple, two separate services **frontend** and **backend** were used since separating the backend service into admin and user would introduce additional complexity due to separating databases and additional HTTP communication.

* The frontend was tested for responsiveness on 10+ devices.

* The frontend and backend communicate via **axios** using HTTP.

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


## Timeline
* 13.06.24 - Prepare project design document.
* 14.06.24 - Complete frontend components and views.
* 15.06.24 - Complete frontend functionality and firebase integration and start backend development.
* 16.06.24 - Backend development.
* 17.06.24 - Backend development.
* 18.06.24 - Backend development, bug fixes, finish project design document. Submit the case project.

## Front End Screenshots - Desktop

### Sign In Page
<img width="1120" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/5a248a03-8152-4597-8787-38fd47d49a13">

### Home Page - Add New Parameter
<img width="1058" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/27403785-ecc1-4951-9d5c-e85bea352172">

### Home Page 
<img width="1062" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/86cb799f-7337-468e-8391-b405111e8add">

### Home Page - Edit Parameters 
<img width="1512" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/d00085ce-b011-41cd-adb6-64f549b509e4">

## Front End Screenshots - Mobile
<img width="793" alt="image" src="https://github.com/ceydas/codeway-fullstack-case/assets/26047050/8df2836c-85a3-4ced-be76-d9d724c5700c">
