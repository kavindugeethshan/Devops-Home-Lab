# G-Lab

A modern full-stack e-commerce web application for browsing, managing, and purchasing computer parts online.

## Features

* User Registration & Login
* JWT-based Authentication
* Browse Computer Parts
* Search Products
* Product Filtering
* Shopping Cart
* Product Reviews
* Secure Checkout
* PayHere Payment Integration
* Admin Dashboard
* Product Management
* Firebase Image Storage
* MongoDB Database
* Responsive Web Interface

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* MongoDB Atlas

### Authentication & Security

* JSON Web Token (JWT)
* bcrypt
* Environment Variables
* Authentication Middleware
* Admin Authorization Middleware

### Storage

* Firebase Storage

### Payment

* PayHere Payment Gateway

### Deployment

* Render

### Version Control

* Git
* GitHub

## System Architecture

                    ┌─────────────────┐
                    │     User        │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │    Frontend     │
                    │ HTML/CSS/JS     │
                    └────────┬────────┘
                             │
                        REST API
                             │
                             ▼
                    ┌─────────────────┐
                    │    Backend      │
                    │ Node.js         │
                    │ Express.js      │
                    └──────┬───┬──────┘
                           │   │
              ┌────────────┘   └──────────────┐
              ▼                               ▼
      ┌─────────────────┐             ┌─────────────────┐
      │  MongoDB Atlas  │             │ Firebase        │
      │    Database     │             │ Storage         │
      └─────────────────┘             └─────────────────┘

                            │
                            ▼
                    ┌─────────────────┐
                    │     PayHere     │
                    │ Payment Gateway │
                    └─────────────────┘


## Project Structure

G-Lab/
│
├── Frontend/
│   ├── HTML files
│   ├── CSS files
│   ├── JavaScript files
│   └── assets/
│
├── Backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md


## Authentication

The application uses JWT-based authentication.
The authentication flow is:

User
  │
  ▼
Login
  │
  ▼
Backend verifies credentials
  │
  ▼
JWT Token generated
  │
  ▼
Client sends token with requests
  │
  ▼
Authentication Middleware
  │
  ▼
Protected API Route

Passwords are securely hashed using bcrypt before being stored in the database.
Admin-only operations are protected using authorization middleware.

## Product Management

Administrators can manage products through the admin functionality.

Supported operations include:

* Create products
* View products
* Update products
* Delete products
* Manage product information
* Upload product images

Product images are stored using Firebase Storage, while product information is stored in MongoDB.


## Payment Integration

G-Lab integrates the PayHere payment gateway for online payments.

### PayHere Sandbox

The PayHere Sandbox environment is used for testing the payment flow during development.

For local development, the application can use a tunneling service to expose the payment notification endpoint to PayHere, since PayHere requires a publicly accessible `notify_url`.

### Production Payment

For production payments, the application requires a publicly accessible backend and domain/HTTPS endpoint for receiving payment notifications from PayHere.

The payment flow is:

Customer
   │
   ▼
Checkout
   │
   ▼
G-Lab Backend
   │
   ▼
PayHere
   │
   ▼
Payment Processing
   │
   ▼
notify_url
   │
   ▼
G-Lab Backend
   │
   ▼
Payment Status Updated

> **Note:** PayHere Sandbox is used for testing. Production payment integration requires a publicly accessible HTTPS endpoint and the appropriate PayHere production configuration.


## Database

MongoDB Atlas is used as the application's cloud database.
The database stores information such as:

* Users
* Products
* Reviews
* Orders
* Payments

## Image Storage

Firebase Storage is used to store product images.The application stores the image in Firebase Storage and saves the corresponding image URL with the product information in MongoDB.

## Deployment

The application is deployed using Render.

The production architecture is:

GitHub
   │
   ▼
Render
   │
   ├── Frontend
   │
   └── Backend API
          │
          ├── MongoDB Atlas
          ├── Firebase Storage
          └── PayHere


## Environment Variables

The application uses environment variables for sensitive configuration.

Example:

.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_MERCHANT_SECRET=your_merchant_secret


## Installation

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### 1. Clone the Repository

git clone https://github.com/kavindugeethshan/G-Lab.git



### 2. Navigate to the Project

cd G-Lab


### 3. Install Dependencies

Install all required Node.js dependencies from `package.json`:

npm install


The project uses the following major dependencies:

* Express.js
* Mongoose
* bcrypt
* JSON Web Token (JWT)
* Socket.IO
* dotenv
* CORS
* Firebase
* Nodemailer
* Resend
* Nodemon

### 4. Configure Environment Variables

Create a `.env` file in the backend directory and configure the required environment variables.

Example:

.env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
PAYHERE_MERCHANT_ID=your_merchant_id
PAYHERE_MERCHANT_SECRET=your_merchant_secret

### 5. Start the Application

Start the production server:

npm start


For development:

npm run dev

The package.json contains the required npm scripts for starting the application.

## Container Image

A Docker container image for G-Lab is also available through GitHub Container Registry (GHCR).

**GHCR Package:**

https://github.com/kavindugeethshan/G-Lab/pkgs/container/g-lab


## API

The G-Lab backend provides RESTful API endpoints for authentication, users, products, cart, orders, reviews, payments, and admin operations.

**Base URL**
http://localhost:3001

The APIs can be tested using Postman.

**Authentication:** Protected endpoints require a JWT token in the `Authorization` header.
Authorization: Bearer <JWT_TOKEN>

---

### Authentication

#### Create User

**POST**
http://localhost:3001/users/create


Request body:

```json
{
  "email": "user@example.com",
  "firstname": "John",
  "lastname": "Doe",
  "password": "your_password"
}
```

#### Login User

**POST**

http://localhost:3001/users/login


Request body:

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

---

### Products

#### Get All Products

**GET**
http://localhost:3001/products


#### Search Products

**GET**
http://localhost:3001/products?search=gaming


#### Filter Products by Category

**GET**
http://localhost:3001/products?category=phone


#### Filter by Category, Brand and Price

**GET**
http://localhost:3001/products?category=GPU&brand=ASUS&minPrice=50000&maxPrice=110000

#### Pagination and Price Sorting

**GET**
http://localhost:3001/products?page=1&limit=10&sort=price_asc


#### Get Product by ID

**GET**
http://localhost:3001/products/<PRODUCT_ID>


#### Create Product

**POST**
http://localhost:3001/admin/products/create


Admin token required.

Example request body:

```json
{
  "name": "AMD Ryzen 5 5600",
  "description": "High-performance 6-core desktop processor.",
  "category": "CPU",
  "brand": "AMD",
  "price": 35000,
  "stock": 10,
  "Image": "ryzen5-5600.jpg"
}
```

#### Create Multiple Products

**POST**
http://localhost:3001/products/create-many


#### Update Product

**PUT**
http://localhost:3001/products/update/<PRODUCT_ID>


Admin token required.

Example:

```json
{
  "price": 24000,
  "stock": 20
}
```

#### Delete Product

**DELETE**
http://localhost:3001/products/delete/<PRODUCT_ID>


Admin token required.

#### Get Product Rating

**GET**
http://localhost:3001/products/<PRODUCT_ID>/rating


Authentication not required.

---

### User

#### Add Address

**PUT**
http://localhost:3001/users/address


Authentication required.

```json
{
  "addressLine": "123 Main Street",
  "city": "Kurunegala",
  "district": "Kurunegala",
  "postalCode": "60000"
}
```

#### Get Profile

**GET**
http://localhost:3001/users/profile


Authentication required.

#### Update Profile

**PUT**
http://localhost:3001/users/profile


Authentication required.

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "Image": "https://example.com/profile.jpg"
}
```

#### Change Password

**PUT**
http://localhost:3001/users/change-password

Authentication required.

```json
{
  "currentPassword": "current_password",
  "newPassword": "new_password"
}
```

---

### Cart

#### Add Product to Cart

**POST**
http://localhost:3001/cart/add


Authentication required.

```json
{
  "productId": "<PRODUCT_ID>",
  "quantity": 1
}
```

#### Get Cart

**GET**
http://localhost:3001/cart


Authentication required.

---

### Orders

#### Create Order

**POST**
http://localhost:3001/order


Authentication required.

#### Get My Orders

**GET**
http://localhost:3001/order/my-orders


Authentication required.

#### Get Order by ID

**GET**
http://localhost:3001/order/<ORDER_ID>


Authentication required.

#### Cancel Order

**PATCH**
http://localhost:3001/order/orders/<ORDER_ID>/cancel


Authentication required.

---

### Reviews

#### Add Product Review

**POST**
http://localhost:3001/products/<PRODUCT_ID>/reviews


Authentication required.

```json
{
  "rating": 5,
  "comment": "Great product!"
}
```

#### Update Own Review

**PUT**
http://localhost:3001/reviews/<REVIEW_ID>


Authentication required.

#### Delete Own Review

**DELETE**
http://localhost:3001/reviews/<REVIEW_ID>


Authentication required.

---

### Admin

#### Admin Dashboard

**GET**
http://localhost:3001/admin/dashboard


Admin token required.

#### Get All Users

**GET**
http://localhost:3001/admin/users


Admin token required.

#### Get User Details

**GET**
http://localhost:3001/admin/users/<USER_ID>


Admin token required.

#### Block User

**PATCH**
http://localhost:3001/admin/users/<USER_ID>/block


Admin token required.

#### Unblock User

**PATCH**
http://localhost:3001/admin/users/<USER_ID>/unblock


Admin token required.

#### Get All Reviews

**GET**
http://localhost:3001/admin/reviews


Admin token required.

#### Delete Review

**DELETE**
http://localhost:3001/admin/reviews/<REVIEW_ID>


Admin token required.

#### Get Admin Statistics

**GET**
http://localhost:3001/admin/statistics


Admin token required.

---

### Admin Order Management

#### Get All Orders

**GET**
http://localhost:3001/admin/orders


Admin token required.

#### Get Order by ID

**GET**
http://localhost:3001/admin/orders/<ORDER_ID>


Admin token required.

#### Search Orders by Order ID

**GET**
http://localhost:3001/admin/orders/search?orderId=<ORDER_ID>


Admin token required.

#### Search Orders by User ID

**GET**
http://localhost:3001/admin/orders/search?userId=<USER_ID>

Admin token required.

#### Search Orders by Email

**GET**
http://localhost:3001/admin/orders/search?email=user@example.com


Admin token required.

#### Filter Orders by Status

**GET**
http://localhost:3001/admin/orders/filter?status=Pending


Admin token required.

#### Update Order Status

**PATCH**
http://localhost:3001/admin/orders/<ORDER_ID>/status


Admin token required.

Example:

```json
{
  "status": "Confirmed"
}
```

---

### Postman Testing

The API can be tested locally using Postman.

For protected endpoints:

1. Login and obtain the JWT token.
2. Open the required request in Postman.
3. Go to **Authorization**.
4. Select **Bearer Token**.
5. Enter the JWT token.
6. Send the request.

Bearer <JWT_TOKEN>



## Security

The application implements several security mechanisms:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Admin authorization
* Environment-based secrets
* Server-side validation
* CORS configuration

## Future Improvements

Possible future improvements include:

* Kubernetes deployment
* Automated CI/CD pipeline
* Prometheus monitoring
* Grafana dashboards
* Redis caching
* Automated testing
* AWS cloud deployment
* Improved application logging

## Current Version

**v1.0.2**

Latest release includes security improvements, authentication fixes, admin user-management improvements, and mobile-responsive UI updates.

## Author

**Kavindu Geethshan**

Bachelor of Information Technology (BIT)
University of Colombo School of Computing

GitHub:
https://github.com/kavindugeethshan

---

## License

This project is developed for educational and portfolio purposes.
