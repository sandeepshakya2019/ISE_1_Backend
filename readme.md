# FinSphere App Backend

## 1. Project Overview

This is the backend for the [FinSphere Android App](https://github.com/sandeepshakya2019/ISE_1_Frontend) , designed to provide secure user authentication, photo uploads, loan management, and user profile functionalities. The backend is built using **Node.js** with **Express.js**, integrated with **JWT authentication**, and features image upload with **Multer** and **Cloudinary**.

---

## 2. Features

- 2.1. **User Authentication**:

  - Secure user registration, login, and logout using **JSON Web Token (JWT)**.
  - Persistent user sessions managed via **AsyncStorage** (in frontend).

- 2.2. **Photo Upload**:

  - Real-time photo capture and upload functionality using **Multer** and storage in **Cloudinary**.

- 2.3. **Profile Management**:

  - Fetch and update user profile details, including loans and profile photos.

- 2.4. **Loan Management**:

  - Users can:
    - Apply for loans by entering the amount and reason.
    - View loan status and history.
    - Repay loans through simple API interaction.

- 2.5. **Data Handling**:

  - APIs built with **Axios** for seamless data exchange between frontend and backend.

- 2.6. **Error Handling**:

  - Comprehensive error management with meaningful status codes.

- 2.7. **Future Enhancements**:
  - Loan Recommendations
  - Financial Planning Tools
  - Push Notifications
  - Payment Integration
  - Real Time e-KYC Authentication
  - Multilingual support
  - AI based Recommendations System

Detailed explanation is in our frontend [FinSphere Android App](https://github.com/sandeepshakya2019/ISE_1_Frontend)

---

## **Technology Stack**

| Component             | Technology         |
| --------------------- | ------------------ |
| Language              | Node.js            |
| Framework             | Express.js         |
| Database              | MongoDB            |
| Object Data Modelling | Mongoose           |
| Authentication        | JWT                |
| File Upload           | Multer, Cloudinary |
| HTTP Client           | Axios              |
| Deployment            | Vercel             |

---

## 3. API Documentation

### **Base URL**

`http://localhost:3005/api/v1`

### Hosted URL

`https://ise-1-backend.vercel.app/api/v1`

but this created the issue when we upload the file (means we are doing the realtime changes on server file system) which is not possible on free tier hosting.

### **Endpoints**

#### **Authentication APIs**

| Method | Endpoint             | Description                  | Auth Required | Request Body                   | Response          |
| ------ | -------------------- | ---------------------------- | ------------- | ------------------------------ | ----------------- |
| POST   | `/users/register`    | Register a new user          | No            | `{ name, mobileNo, fullName }` | `{ Success }`     |
| POST   | `/users/login-otp`   | Send OTP on Registered Phone | No            | `{ mobileNo }`                 | `{ Success }`     |
| POST   | `/users/login-token` | Login a user                 | No            | `{mobileNo, otp}`              | `{ login token }` |
| POST   | `/users/logout`      | Logout a user                | Yes           | `{}`                           | `{ success }`     |

#### **e-KYC API**

| Method | Endpoint         | Description            | Auth Required | Request Body                                                                       | Response       |
| ------ | ---------------- | ---------------------- | ------------- | ---------------------------------------------------------------------------------- | -------------- |
| POST   | `/api/users/kyc` | Upload user's kyc data | Yes           | `{livePhoto: multipart/form-data, aadharCardId, accountNumber, ifscCode, address}` | `{ userdata }` |

#### **Profile APIs**

| Method | Endpoint   | Description                | Auth Required | Request Body | Response          |
| ------ | ---------- | -------------------------- | ------------- | ------------ | ----------------- |
| GET    | `/profile` | Fetch user profile details | Yes           | `{}`         | `{ profileData }` |

#### **Loan APIs**

| Method | Endpoint       | Description        | Auth Required | Request Body                  | Response           |
| ------ | -------------- | ------------------ | ------------- | ----------------------------- | ------------------ |
| POST   | `/loan/access` | Apply for a loan   | Yes           | `{ amount, reason }`          | `{ loanId }`       |
| POST   | `/loan/repay`  | Repay a loan       | Yes           | `{ loanId, repaymentAmount }` | `{ success }`      |
| GET    | `/loan/getAll` | Get user loan list | Yes           | `{}`                          | `[ { loanData } ]` |

Future Implementation

Api for Payment Integration, AI-Based Recommendations System, MultiLanguagal Support etc.

---

## 4. Database Schema

### User Model

```
  {
    mobileNo: {
      type: String,
      unique: true,
      required: [true, "Mobile No is required"],
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => ${props.value} is not a valid mobile number !!,
      },
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    emailId: {
      type: String,
      unique: true,
      // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      lowercase: true,
      required: false,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: (props) => ${props.value} is not a valid emiail id !!,
      },
    },
    noOfLoan: {
      type: Number,
      default: 0,
    },
    sectionedAmount: {
      type: Number,
      default: 0,
    },
    offeredAmount: {
      type: Number,
      default: 10000,
    },
    isOtp: {
      type: Boolean,
      default: false,
    },
    rtoken: {
      type: String,
      required: false,
    },
    otp: {
      type: Number,
      default: null,
    },
    photo: {
      type: String,
      trim: true,
      required: [false, "Photo is required"],
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
    isKYC: {
      type: Boolean,
      default: false,
    },
  },

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      mobileNo: this.mobileNo,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.refreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
```

### Payback Schema

```
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paybackAmount: {
      type: Number,
      default: 0,
    },
    paymentType: {
      type: String,
      required: true,
    },
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: false,
    },
  },
  { timestamps: true }
```

### e-KYC Schema

```
  {
    aadharCardId: {
      type: String,
      required: [true, "Aadhar ID is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\d{9,18}$/.test(v); // Validates account number length (9-18 digits)
      //   },
      //   message: (props) => ${props.value} is not a valid account number!,
      // },
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
      // match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // Validates IFSC format
    },
    photo: {
      type: String,
      trim: true,
      required: [true, "Photo is required"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isOnline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
    isOffline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
```

### Loan Schema

```
  {
    aadharCardId: {
      type: String,
      required: [true, "Aadhar ID is required"],
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      // validate: {
      //   validator: function (v) {
      //     return /^\d{9,18}$/.test(v); // Validates account number length (9-18 digits)
      //   },
      //   message: (props) => ${props.value} is not a valid account number!,
      // },
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
      // match: /^[A-Z]{4}0[A-Z0-9]{6}$/, // Validates IFSC format
    },
    photo: {
      type: String,
      trim: true,
      required: [true, "Photo is required"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isOnline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
    isOffline: {
      // enum: ["true", "false"],
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
```

## 5. Environment Variables

- original .env file you can get in the google classroom at the time of submission project

```PORT=
APP_NAME=

DATABASE_URL=
DATABASE_USERNAME1=
DATABSE_PASSWORD1=

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

TWILLIO_ACCOUNT_SID=
TWILLIO_ACCOUNT_AUTH_TOKEN=
TWILLIO_PHONE_NUMBER=
```

## 6. Deployment Instructions

- Clone the repository: `git clone https://github.com/sandeepshakya2019/ISE_1_Backend`

- `cd ISE_1_Backend`
- Install dependencies: `npm install`
- Set up environment variables in a .env file.
- Run the server: `npm start`
- Access the API at `http://localhost:3005/api.v1/users`

## 7. Issues After Pushing the Backend to server(on Vercel)

- After hoisitng since at time of KYC we are taking the photo from user using multer we upload on server and then we upload on cloudinary since this is free tier hosting so runtime file changes is not allowed on free tier server hosting so right now we are able to run only on local host.(backend)
  
https://github.com/user-attachments/assets/b43f62d7-7e8e-4f22-bbbf-51fc96d7740e

## 8. Authors

- [Sandeep Kumar CS24M112](https://github.com/sandeepshakya2019)
- [Abhishek Kumar CS24M120](https://github.com/imabhishekmahli)
- [Ashant Kumar CS24M113](https://www.github.com/ashantfet)
