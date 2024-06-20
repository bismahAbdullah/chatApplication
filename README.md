# Real Time Messaging App

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Security](#security)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction
The **Messaging App** is a full-featured messaging platform designed for secure and efficient communication. It includes user authentication, real-time text and voice messaging, media sharing, and group chat functionality, all with robust security measures such as encryption.

## Features
### User Authentication and Profile Management
- Secure login/logout functionality.
- Profile creation with customizable usernames, display pictures, and statuses.

### Text Messaging
- Real-time sending and receiving of text messages.

### Voice Messages
- Ability to record and send voice messages.
- Playback controls for voice messages.

### Media Sharing
- Support for sending images, videos, and files.
- Preview functionality for media files before sending.

### Message Encryption
- Encryption for all messages.

## Tech Stack
- **Frontend:** React (with TypeScript), React Query (for server state management), RTK (if necessary)
- **Backend:** Express (with TypeScript), Zod Validator (for schema validation)
- **Design:** SCSS
- **Realtime Connection:** Socket.IO
- **Database:** Local Postgres (Client: Sequelize or pg)
- **Storage:** Configurable storage solutions for media files (local file system for development and a scalable cloud-based solution for production)
- **Security:** HTTPS, JWT for authentication, and encryption for data at rest and in transit


### Running the Project

## Frontend
- run the frontend on port:3000
## Backend
- run the backend on port:3002
- Register a new account or login with existing credentials.

### Security 
- **Authentication:** JSON Web Tokens (JWT) are used for secure authentication.
- **Encryption:** All messages are encrypted for secure communication.
- **HTTPS:** Ensure your production deployment uses HTTPS to secure data in transit.
