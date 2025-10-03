# minDoktor

A project repository structured into two main parts:
- `todo-app`: Frontend application
- `todo-back`: Backend API

## Table of Contents
- [Project Structure](#project-structure)
- [About the Tech Stack](#about-the-tech-stack)
- [Pre-requisites](#pre-requisites)
- [Step-by-Step Build Instructions](#step-by-step-build-instructions)
- [Deployment](#deployment)
- [Accessing the App](#accessing-the-app)
- [API Documentation](#api-documentation)
- [Common Pitfalls & Solutions](#common-pitfalls--solutions)
- [Getting Help](#getting-help)
- [Contributing](#contributing)
- [License](#license)

---

## Project Structure

```
minDoktor/
├── todo-app/    # Frontend (TypeScript, Next.js)
├── todo-back/   # Backend (Deno)
└── .gitignore
```

---

## About the Tech Stack

- **React:** A JavaScript library for building user interfaces, often used for SPA (single-page applications).
- **Next.js:** A React framework adding features like routing, API routes, and server-side rendering (SSR).
- **Deno:** A secure runtime for JavaScript and TypeScript, an alternative to Node.js.

**Note:** You do _not_ need deep expertise in any framework to get started — this guide walks you through the basics.

---

## Pre-requisites

Before you begin, make sure you have the following installed:

You’ll need Node.js,  npm and Deno.

### Check on macOS or Windows

#### Node.js & npm

1. **Open your Terminal** (macOS) or **Command Prompt/PowerShell** (Windows).
2. **Type the following commands and press Enter:**

   ```sh
   node -v
   npm -v
   ```

   - If installed, you’ll see version numbers (e.g., `v18.17.1`).
   - If not installed, you’ll see an error like “command not found” or “not recognized”.

#### Deno

1. **Type the following command and press Enter:**

   ```sh
   deno --version
   ```

   - If installed, you’ll see version numbers for Deno, V8, TypeScript, etc.
   - If not installed, you’ll see an error.

### What to Do If Not Installed

- **Node.js** (required for most frontend and backend setups):  
  Download from [nodejs.org](https://nodejs.org/) (LTS version recommended).
- **npm** (comes with Node.js) or **yarn** (optional alternative):  
  Used to install packages and run scripts.
- **Deno** (backend uses Deno):  
  Install from [deno.land](https://deno.land/)  

---

## Step-by-Step Build Instructions

### Frontend (`todo-app`) – Next.js/React

1. **Open your terminal and navigate to the frontend directory:**
   ```sh
   cd todo-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   This command downloads all necessary packages listed in `package.json`.

3. **Run the development server:**
   ```sh
   npm run dev
   ```
   - For Next.js apps, this starts a local server at [http://localhost:3000](http://localhost:3000).

4. **Build for production (optional):**
   ```sh
   npm run build
   ```
   This prepares the project for deployment.

### Backend (`todo-back`) – Deno

1. **Install Deno (if not already):**
   [Deno installation guide](https://deno.land/manual@v1.34.3/getting_started/installation)
2. **Run the backend:**
   ```sh
   deno run --allow-net --allow-read --allow-write --watch main.ts
   ```

---

## Deployment

- **Frontend:** Deploy to platforms like Vercel, Netlify, or any static hosting provider.  
  Follow instructions on their docs for Next.js projects.
- **Backend:** Deploy to services like Heroku, Render, or Deno Deploy.
- **Environment Variables:**  
  If want to use DB servuces instead of local file fill values in the `.env` (database URLs, passwords, etc.).

---

## Accessing the App

- **Frontend:**  
  Open [http://localhost:3000](http://localhost:3000) in your browser after starting the frontend server.
- **Backend:**  
  The API is accessible at [http://localhost:8000/api](http://localhost:8000/api).
- The frontend communicates with the backend via REST API calls.

---

## API Documentation

### Base URL
`http://<your-backend-domain>/api/`

### Common Endpoints

#### `GET /api/tasks`
- **Description:** Fetch all tasks items.
- **Response:**
    ```json
    [
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      },
      ...tasks
    ]
    ```

#### `POST /api/create`
- **Description:** Create a new todo item.
- **Body:**
    ```json
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      }
    ```
- **Response:**
    ```json
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      }
    ```
#### `PUT /api/edit`
- **Description:** Edit existed todo item.
- **Body:**
    ```json
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      }
    ```
- **Response:**
    ```json
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      }
    ```

#### `DELETE /api/delete`
- **Description:** Delete a todo item by ID.
- **Body:**
  ```json
    { "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717" }
  ```  
- **Response:**
   ```json
   { 'task deleted' }
   ```

#### `GET /api/tasks`
- **Description:** Search task by title.
- **Query:**
  ```sh
    "plan"
  ```  
- **Response:**
   ```json
   [
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      },
      ...matcehd tasks
    ]
   ```

#### `PUT /api/check`
- **Description:** Mark a task as done.
- **Body:**
  ```json
    { "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717" }
  ```  
- **Response:**
   ```json
       {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": true,
        "priority": 2
       }
   ```

#### `POST /api/populate`
- **Description:** Populate system with more tasks.
- **Response:**
    ```json
      [
      {
        "id": "ef24b760-f7d4-4b80-a63c-121ad2a30717",
        "title": "Plan quarterly roadma",
        "description": "Draft the Q4 roadmap including milestones and dependencies.",
        "dueDate": "2025-10-03T00:00:00.000Z",
        "createDate": "2025-09-28T10:10:00.000Z",
        "status": false,
        "priority": 2
      },
      ...tasks
    ]
    ```
   
---

## Common Pitfalls & Solutions

- **Missing Node.js/Deno:**  
  _Solution:_ Download and install Node.js for React/Next.js/Express, or Deno.
- **Port conflicts:**  
  _Solution:_ If `localhost:3000` or `localhost:8000` is already in use, edit the port in your project’s config files.
- **CORS errors:**  
  _Solution:_ If frontend cannot reach backend, ensure backend allows requests from frontend domain.
- **Dependency errors:**  
  _Solution:_ Run `npm install` in `todo-app` folder. In Deno, dependencies are handled differently (see Deno docs).

---

## Getting Help

- **React:** [React Docs](https://react.dev/)
- **Next.js:** [Next.js Docs](https://nextjs.org/docs)
- **Deno:** [Deno Docs](https://deno.land/manual)

---

## Contributing

Feel free to open issues or submit pull requests.

---

> For more details, refer to the [todo-app](https://github.com/Senpai-paj/minDoktor/tree/main/todo-app) and [todo-back](https://github.com/Senpai-paj/minDoktor/tree/main/todo-back) directories.
