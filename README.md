# 🧠 Artifact Registry System

A secure and user-specific system to create, view, update, and delete digital items (like documents or media) — built using the MERN stack (MongoDB, Express, React, Node.js).

---

## 🧩 What This Project Does

This app helps users safely manage their own data (called artifacts) without worrying about others accessing or editing it.

Each user can:

- Log in and work in their own private space (called a cluster)
- Add, update, or remove their own files or records (artifacts)
- Keep track of who made changes and when
- Be sure that no other user can view or change their stuff

It’s like having a private locker in a secure system — only you can open, change, or delete what’s inside.


## 🚀 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)

---

## 🔐 Core Features

### ✅ Identity-Oriented Access Control
- JWT authentication with session expiration
- Artifacts are strictly scoped to the authenticated user's identity cluster

### ✅ Artifact Lifecycle Management
- Full CRUD support (Create, Read, Update, Soft Delete)
- Artifacts include `title`, `description`, `domain`, and `timestamps`

### ✅ Isolation Layer Enforcement
- Users cannot access artifacts from other clusters
- Each artifact is tied to an `identityCluster` and `ownerId`

### ✅ Temporal Traceability
- Modification history includes:
  - `modifiedBy`, `timestamp`, `action`, `sessionId`, and `changes`

---

## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/artifact-registry.git
cd artifact-registry/server
## ⚙️ Setup Instructions
```
### 2. Install Dependencies


```bash
npm install
```
### 3. Create a .env file in the root of the backend/ directory
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/artifactRegistry
JWT_SECRET=yourSecretKey
```
### 4. Run the Server
```
npm run dev
```
