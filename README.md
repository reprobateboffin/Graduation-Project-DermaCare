

# 🩺 AI-Powered Skin Disease Detection & Healthcare Platform

## Overview

This project is a full-stack, production-ready healthcare application that combines **deep learning–based skin disease classification** with **appointment management, user authentication, notifications, and e-commerce functionality**.
It follows a **RESTful client–server architecture**, with a **React Native mobile frontend** and a **Django REST Framework backend**, integrating a trained CNN model for real-time medical image inference.

The system is designed as an end-to-end solution, covering authentication, data persistence, real-time interactions, and AI-powered predictions.

---

## System Architecture

```
React Native (Mobile App)
        |
        |  REST API (JWT Auth)
        v
Django REST Framework (Backend)
        |
        |-- MySQL (Users, Appointments, Products, Orders, Blogs)
        |-- CNN Model (.h5) for Skin Disease Classification
```

### Key Architectural Principles

* REST-based client–server separation
* Stateless authentication using JWT
* Modular backend design for scalability
* Real-time AI inference via API endpoints

---

## Frontend (React Native)

The mobile application provides a cross-platform user experience with real-time interaction with backend services.

### Core Features

* User registration and login
* Persistent authentication using JWT tokens
* Appointment booking and management
* Push notifications for upcoming appointments
* Skin disease image upload and prediction
* Blog reading and bookmarking
* Product browsing and ordering
* Order history and PDF receipt download
* Profile editing and account management

JWT tokens are securely stored on the device to maintain user sessions across app restarts.

---

## Backend (Django + Django REST Framework)

The backend exposes RESTful APIs consumed by the React Native application.

### Authentication & Authorization

* User registration and login endpoints
* JWT-based authentication
* Token validation for protected routes
* Role-aware access control
* Secure session persistence without server-side state

---

## Database (MySQL)

The system uses MySQL for persistent storage of structured data, including:

* User accounts and profile information
* Appointments and scheduling data
* Products and inventory
* Orders and transaction history
* Blog posts and bookmarks

Inventory quantities are automatically updated after each successful order to ensure consistency.

---

## Appointment Management & Notifications

* Users can book and manage appointments via the mobile app
* Appointments are stored and tracked in the backend
* Scheduled notifications are sent to users at the time of their appointments
* Notification logic is handled server-side to ensure reliability

---

## E-Commerce Functionality

The platform includes a complete e-commerce workflow:

* Product listing and detail views
* Order placement and checkout
* Automatic stock reduction after purchase
* Order persistence and transaction tracking
* PDF receipt generation for each completed order
* Receipt delivery to users for record-keeping

---

## AI Skin Disease Classification

### Model Details

* CNN trained on the **HAM10000** dataset
* Optimized using:

  * Dropout layers
  * Extensive data augmentation
  * Ensemble learning techniques
* Exported as an `.h5` model file

### Backend Integration

* The trained `.h5` model is loaded by the Django backend
* Users upload skin lesion images from the mobile app
* Images are preprocessed server-side
* Predictions are generated in real time
* Classification results are returned instantly to the frontend on button click

This design keeps the model centralized, ensuring consistent predictions and easier updates.

---

## Real-Time Interaction Flow (AI Prediction)

1. User uploads an image via the React Native app
2. Image is sent to the backend through a REST endpoint
3. Django loads the CNN `.h5` model
4. Model performs inference
5. Prediction results are returned to the frontend in real time
6. UI displays the classification outcome to the user

---

## Security Considerations

* JWT-based stateless authentication
* Protected API endpoints
* Secure handling of user identity data
* Backend-controlled AI inference (no model exposure on client)
* Controlled access to orders and medical predictions

---

## Technology Stack

**Frontend**

* React Native

**Backend**

* Django
* Django REST Framework

**Database**

* MySQL

**AI / ML**

* TensorFlow / Keras
* CNN model (`.h5`)

**Authentication**

* JSON Web Tokens (JWT)

**Other**

* PDF generation for receipts
* Notification scheduling system

---

## Conclusion

This project demonstrates the full lifecycle of an applied AI system:

* Training and optimizing a deep learning model
* Integrating ML inference into a production backend
* Building a secure, scalable REST API
* Delivering a feature-rich mobile application
* Combining healthcare, AI, and e-commerce into a single cohesive platform

It is designed to be extensible, production-ready, and suitable for real-world deployment scenarios.
