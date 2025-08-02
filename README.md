# Dar Altaweesh Inventory Management System

## 📜 Overview

A full-stack MVC application will be created for Dar Altaweesh to help the firm display the products, track their suppliers and orders.

## ⚙️ Features

- Product catalog with images
- Stock level tracking
- Order management
- Supplier information
- Low stock alerts

## ⚙️ Technologies

| Method    | Endpoint               | 
|-----------|------------------------|
| Frontend  | React.jsx, CSS         | 
| Database  | Mongo DB & Mongoose    | 
| Backend   | Node.js & Express.js   | 

## 🔌Models

#### Supplier

- name: String
- phone: String
- email: String
- products[]: Array of Products (referring to Product model)

#### Product

- img: png, jpg, jpeg
- name: String
- price: float
- stock: int
- products[]: Array of Products (referring to Product model)

#### Order

- items[]: Array of Products (array of references to Product)
- total: float
- status: String ("Pending", "Shipped", "Delivered", "Cancelled".)
- date: Date
- customer: String

## 🗺️ Planning

### Routing table

#### 1. Authentication Endpoints:

| Method | Endpoint               | Description                              | Authentication Required |
|--------|------------------------|------------------------------------------|-------------------------|
| POST   | `/auth/login`          | User login, returns a token              | No                      |
| POST   | `/auth/register`       | Register a new user                      | No                      |
| GET    | `/auth/logout`         | Logout the user, invalidate the token    | Yes                     |
| GET    | `/auth/me`             | Get the currently logged-in user’s info  | Yes                     |


#### 2. Product Endpoints:

| Method | Endpoint               | Description                              | Authentication Required |
|--------|------------------------|------------------------------------------|-------------------------|
| GET    | `/products`            | List all products                        | Yes                     |
| POST   | `/products`            | Create a new product                     | Yes                     |
| GET    | `/products/:id`        | View details of a specific product       | Yes                     |
| PUT    | `/products/:id`        | Update an existing product               | Yes                     |
| DELETE | `/products/:id`        | Delete a specific product                | Yes                     |


#### 3. Order Endpoints:

| Method | Endpoint              | Description                               | Authentication Required |
|--------|-----------------------|-------------------------------------------|-------------------------|
| GET    | `/orders`             | List all orders                           | Yes                     |
| POST   | `/orders`             | Create a new order                        | Yes                     |
| GET    | `/orders/:id`         | View details of a specific order          | Yes                     |
| PUT    | `/orders/:id`         | Update the status of an order             | Yes                     |
| DELETE | `/orders/:id`         | Cancel a specific order                   | Yes                     |


#### 4. Supplier Endpoints:

| Method | Endpoint              | Description                               | Authentication Required |
|--------|-----------------------|-------------------------------------------|-------------------------|
| GET    | `/suppliers`          | List all suppliers                        | Yes                     |
| POST   | `/suppliers`          | Create a new supplier                     | Yes                     |
| GET    | `/suppliers/:id`      | View details of a specific supplier       | Yes                     |
| PUT    | `/suppliers/:id`      | Update an existing supplier               | Yes                     |
| DELETE | `/suppliers/:id`      | Delete a specific supplier                | Yes                     |


#### 5. Web Routes (For frontend, non-API):

| Method | Endpoint              | Description                               | Authentication Required |
|--------|-----------------------|-------------------------------------------|-------------------------|
| GET    | `/`                   | Display homepage                          | No                      |
| GET    | `/products`           | Display product listing page              | No                      |
| GET    | `/products/:id`       | Display a specific product page           | No                      |
| GET    | `/login`              | Display login page                        | No                      |
| GET    | `/register`           | Display registration page                 | No                      |
| GET    | `/orders`             | Display the user’s order history          | Yes                     |
| GET    | `/orders/:id`         | Display details of a specific order       | Yes                     |
| GET    | `/suppliers`          | Display supplier listing                  | Yes                     |
| GET    | `/suppliers/:id`      | Display specific supplier details         | Yes                     |

#### ☑️ Trello Checklist

To find my detailed checklist that help me plan my daily progress in this project, click [here](https://trello.com/b/a2DOcAiJ/project-2-inventory-system-planner)
