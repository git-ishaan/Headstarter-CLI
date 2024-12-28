# 🚀 Headstarter CLI


![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Bun](https://img.shields.io/badge/bun-compatible-orange.svg)

Welcome to **Headstarter CLI**, the ultimate command-line tool designed to **accelerate** your project setup! Whether you're a frontend enthusiast or a backend guy, Headstarter CLI simplifies the initial setup process, allowing you to focus on building amazing applications from day one. 🌟

## 📑 Table of Contents

- [🚀 Headstarter CLI](#-headstarter-cli)
  - [📑 Table of Contents](#-table-of-contents)
  - [🔥 Features](#-features)
  - [🤔 Why Choose Headstarter CLI?](#-why-choose-headstarter-cli)
  - [🛠 Installation](#-installation)
    - [🔧 Prerequisites](#-prerequisites)
    - [📥 Installing via npm](#-installing-via-npm)
      - [Option 1: Global Installation](#option-1-global-installation)
      - [Option 2: One-time Execute](#option-2-one-time-execute)
    - [📥 Installing via bun](#-installing-via-bun)
      - [Option 1: Global Installation](#option-1-global-installation-1)
      - [Option 2: One-time Execute](#option-2-one-time-execute-1)
  - [🎯 Usage](#-usage)
    - [📦 Creating a Client Project](#-creating-a-client-project)
    - [🖥️ Creating a Server Project](#️-creating-a-server-project)
  - [💻 Supported Technologies](#-supported-technologies)
    - [🔹 Client-Side](#-client-side)
    - [🔹 Server-Side](#-server-side)
  - [🤝 Contributing](#-contributing)
  - [📜 License](#-license)
  - [📬 Contact](#-contact)


## 🔥 Features

- **Project Type Selection**: Easily choose between creating a **Client** or **Server** project.
- **Comprehensive Client Setup**:
  - **Runtimes**: Select between `npm` or `bun` for package management.
  - **React Configurations**: Choose between Create React App, Vite (TypeScript or JavaScript).
  - **UI Libraries**: Integrate popular UI libraries like **MUI**, **DaisyUI**, or **ChakraUI**.
  - **Styling**: Optionally add **Tailwind CSS** for utility-first styling.
  - **Data Fetching**: Choose between **Fetch API** or **Axios**.
  - **State Management**: Select state management libraries like **MobX**, **Redux**, **Zustand**, or opt-out.
- **Robust Server Setup**:
  - **Frameworks**: Choose from **Express**, **Fastify**, or **FastAPI**.
  - **ORMs**: Integrate ORMs like **Prisma**, **Sequelize**, **SQLAlchemy**, or **Tortoise-ORM** based on your server framework.
  - **TypeScript Support**: Optional TypeScript setup for enhanced development experience.
- **Automated Dependency Installation**: Automatically installs necessary dependencies based on your selections.
- **Standardized Project Structure**: Creates a well-organized project structure to kickstart your development.
- **Interactive CLI**: User-friendly prompts guide you through each setup step.
- **Customizable**: Tailor the generated project to fit your specific needs with a wide range of options.

## 🤔 Why Choose Headstarter CLI?

Starting a new project often involves repetitive tasks like setting up configurations, installing dependencies, and organizing folders. **Headstarter CLI** eliminates this boilerplate by automating the setup process, allowing you to:

- **⏱️ Save Time**: Quickly scaffold projects without manual setup.
- **🔄 Maintain Consistency**: Ensure a standardized project structure across different projects.
- **🚀 Enhance Productivity**: Focus on writing code and building features instead of setting up environments.
- **🎨 Flexibility**: Customize your project setup based on your unique requirements.

## 🛠 Installation

### 🔧 Prerequisites

Before installing **Headstarter CLI**, ensure you have the following installed on your system:

- **Node.js** (version >=14.0.0)
- **npm** or **bun** (if you prefer using `bun` as your runtime)
- **Git** (optional, for cloning the repository)



### 📥 Installing via npm

#### Option 1: Global Installation
```bash
npm install -g headstarter-cli
```

#### Option 2: One-time Execute
```bash
npx headstarter-cli
```



### 📥 Installing via bun

#### Option 1: Global Installation
```bash
bun install -g headstarter-cli
```

#### Option 2: One-time Execute
```bash
bunx headstarter-cli
```


✅ Installation Complete! You can now use the `headstarter` command globally.

## 🎯 Usage

### 📦 Creating a Client Project

1. **Run the CLI Tool**
   ```bash
   headstarter-cli
   ```

2. **Follow the Interactive Prompts**
   - Select Project Type: Choose Client
   - Choose Runtime: Select between npm or bun
   - Select React Setup: Choose your preferred React configuration
   - Integrate UI Library: Pick a UI library like MUI, DaisyUI, or ChakraUI
   - Add Tailwind CSS: Optionally add Tailwind CSS for styling
   - Choose Data Fetching Library: Select between Fetch API or Axios
   - Select State Management: Choose a state management library or opt-out
   - Name Your App: Provide a name for your application

3. **Wait for the Setup to Complete**
   The CLI will handle project creation, dependency installation, and configuration automatically.

4. **Navigate to Your Project**
   ```bash
   cd your-app-name
   ```

5. **Start Development**
   ```bash
   npm start
   # or if using bun
   bun run start
   ```

### 🖥️ Creating a Server Project

1. **Run the CLI Tool**
   ```bash
   headstarter-cli
   ```

2. **Follow the Interactive Prompts**
   - Select Project Type: Choose Server
   - Choose Server Framework: Select from Express, Fastify, or FastAPI
   - Select ORM: Choose an ORM compatible with your server framework or opt-out
   - Select Runtime: If applicable, choose between npm or bun
   - Name Your App: Provide a name for your application

3. **Wait for the Setup to Complete**
   The CLI will set up the server project with the selected options.

4. **Navigate to Your Project**
   ```bash
   cd your-app-name
   ```

5. **Start the Server**
   ```bash
   npm start
   # or if using bun
   bun run start
   ```

## 💻 Supported Technologies

### 🔹 Client-Side
- **Runtimes**: npm, bun
- **React Setups**:
  - Create React App
  - Vite (TypeScript & JavaScript)
- **UI Libraries**:
  - MUI (Material-UI)
  - DaisyUI
  - ChakraUI
- **Styling**: Tailwind CSS (optional)
- **Data Fetching**: Fetch API, Axios
- **State Management**: MobX, Redux, Zustand

### 🔹 Server-Side
- **Frameworks**:
  - Express (JavaScript & TypeScript)
  - Fastify (JavaScript & TypeScript)
  - FastAPI (Python)
- **ORMs**:
  - Prisma
  - Sequelize
  - SQLAlchemy
  - Tortoise-ORM

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Headstarter CLI, please follow these steps:

1. **Fork the Repository**

2. **Create a New Branch**
   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make Your Changes**

4. **Commit Your Changes**
   ```bash
   git commit -m "Add Your Feature"
   ```

5. **Push to the Branch**
   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a Pull Request**
   - Describe your changes
   - Submit the pull request for review

## 📜 License

Personal Use and Contribution License

Copyright (c) [2024] [Ishaan Pandey]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to use
the Software for personal, non-commercial purposes only, subject to the 
following conditions:

1. Commercial use, including but not limited to using the Software to earn 
   revenue or integrate into commercial products, is strictly prohibited.

2. Contributions to the Software are allowed and encouraged via pull requests,
   provided they comply with the non-commercial nature of this license.

3. Distribution of modified versions of the Software must retain this license
   and all copyright notices.

4. The Software is provided "as is," without warranty of any kind, express 
   or implied, including but not limited to the warranties of merchantability,
   fitness for a particular purpose, and noninfringement. In no event shall
   the authors or copyright holders be liable for any claim, damages, or other 
   liability, whether in an action of contract, tort, or otherwise, arising 
   from, out of, or in connection with the Software or the use or other 
   dealings in the Software.
   
## 📬 Contact

For any inquiries or feedback, please contact:

- **Your Name**
- **Email**: mailtoishaan@proton.me
- **GitHub**: [github.com/git-ishaan](https://github.com/git-ishaan) 























