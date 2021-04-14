<h1 align="center"> Jodemy Backend - ExpressJs</h1>

Jodemy backend is a server side for jodemy app in website or for jodemy app in mobile.

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.18.3-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)
5. JWT
6. CORS
7. MULTER
8. BCRYPTJS
9. NODEMAILER
10. <a href="https://documenter.getpostman.com/view/15090308/TzCTaRTD">Documentation</a>

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. clone repository use HTTPS :https://github.com/jganz6/jodemy-backend.git
3. install `nodejs`
4. Type `npm install`
5. set up your database following this [erd](#erd-database)
6. Make new file a called **.env**, set up first [here](#set-up-env-file)
7. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
8. Open Postman desktop application or Chrome web app extension that has installed before
9. Choose HTTP Method and enter request url.(ex. localhost:8080/)
10. You can see all the end point [here](#end-point)

## erd-database

---

![ERD-db_jodemy](https://user-images.githubusercontent.com/67989743/114575482-66e84600-9ca4-11eb-8a39-dad893c3126a.png)

## Set-Up ENV file

```ENV
PORT = port
DB_HOST = "HOST"
DB_USER = "USER"
DB_PASSWORD = "PASSWORD"
DB_DATABASE = "DATABASE_NAME"
TOKEN_SECRET = "SECRET_KEY"
EXPIRE= (time in ms)
ISSUER="ISSUER"
ADMIN_USER="email"
ADMIN_PASSWORD="password"
```

## End Point

**1. POST**

**2. GET**

**3. GET BY ID**

**4. PATCH BY ID**

**5. DELETE BY ID**
