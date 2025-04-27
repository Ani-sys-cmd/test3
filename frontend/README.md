# Frontend Setup for Mentor-Mentee Platform

This document provides a detailed guide to set up the frontend of the Mentor-Mentee platform using **React**, **Vite**, and **Tailwind CSS**.

---

## Installation Steps

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start the Development Server
```bash
npm run dev
```

---
## Features
- **React** for building UI components
- **Vite** for fast development and build
- **Tailwind CSS** for utility-first styling
- **State Management** using Redux Toolkit
- **Animations** using Framer Motion
- **Routing** with React Router DOM
- **REST API Integration** using Axios

---

## Environment Variables

Create a `.env` file in the root directory and add the following:

```plaintext
# Local Development API
VITE_API_BASE_URL=http://localhost:3001/api

# Production API
VITE_API_BASE_URL=https://mentorlink-backend.onrender.com
```

---

## Prerequisites

- Node.js
- npm or Yarn package manager

---

## Build and Deployment

### Step 1: Build for Production
```bash
npm run build
```

### Step 2: Preview the Production Build
```bash
npm run preview
```

---

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the app for production
- `npm run preview`: Preview the production build

---

## Key Dependencies

### Core Dependencies
- React
- React DOM
- Redux Toolkit
- React Redux
- React Router DOM
- Axios
- Framer Motion
- React Toastify
- JWT Decode

### Dev Dependencies
- Vite
- @vitejs/plugin-react
- ESLint
- eslint-plugin-react
- eslint-plugin-react-hooks
- Tailwind CSS
- PostCSS
- Autoprefixer

---

## Technologies Used

- **React**: For building user interfaces
- **Vite**: For faster builds and hot module replacement
- **Tailwind CSS**: For designing beautiful and responsive layouts
- **Redux Toolkit**: Simplified state management
- **Framer Motion**: Advanced animations
- **React Toastify**: Elegant toast notifications

---
