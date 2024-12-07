#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';
import os from 'os';
import path from 'path';
import ora from 'ora';

const welcomeNote = () => {
  console.log(chalk.green('\nWelcome to the most modern headstarter tool,'));
  console.log(chalk.green('Developed with ♡ by github.com/git-ishaan\n'));
};

const questions = [
  {
    type: 'list',
    name: 'projectType',
    message: 'Is this a client or server project?',
    choices: ['Client', 'Server'],
  },
];

const clientQuestions = [
  {
    type: 'list',
    name: 'runtime',
    message: 'Which runtime do you want to use?',
    choices: ['npm', 'bun(recommended)'],
  },
  {
    type: 'list',
    name: 'reactType',
    message: 'Which React app do you want?',
    choices: [
      'Create React App (not recommended)',
      'Vite App (TypeScript) (recommended)',
      'Vite App (JavaScript)',
    ],
  },
  {
    type: 'list',
    name: 'uiLibrary',
    message: 'Which UI library do you want?',
    choices: ['MUI', 'DaisyUI', 'ChakraUI', 'Nothing'],
  },
  {
    type: 'confirm',
    name: 'tailwind',
    message: 'Do you want to use Tailwind CSS? (recommended)',
  },
  {
    type: 'list',
    name: 'fetchingLibrary',
    message: 'Which library do you want for fetching data?',
    choices: ['Fetch API', 'Axios'],
  },
  {
    type: 'list',
    name: 'stateManagement',
    message: 'Which state management library do you want?',
    choices: ['MobX', 'Redux', 'Zustand', 'Nothing'],
  },
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'App name may only include letters, numbers, underscores, and hyphens.';
    },
  },
];

const serverQuestions = [
  {
    type: 'list',
    name: 'serverType',
    message: 'Which server framework do you want?',
    choices: [
      'Express (TypeScript) (recommended)',
      'Fastify (TypeScript) (recommended)',
      'Express',
      'Fastify',
      'FastAPI',
    ],
  },
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your app?',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return 'App name may only include letters, numbers, underscores, and hyphens.';
    },
  },
  // ORM selection will be added dynamically based on serverType
];

async function executeCommand(command, spinner, task) {
  spinner.start(`Executing: ${task}`);
  try {
    execSync(command, { stdio: 'inherit' });
    spinner.succeed(`${task} completed`);
  } catch (error) {
    spinner.fail(`Error executing command: ${command}`);
    process.exit(1);
  }
}

async function createClientProject(answers) {
  const {
    runtime,
    reactType,
    uiLibrary,
    tailwind,
    fetchingLibrary,
    stateManagement,
    appName,
  } = answers;
  const spinner = ora();

  let completedTasks = 0;
  let totalTasks = 6;
  if (uiLibrary !== 'Nothing') totalTasks += 1;
  if (tailwind) totalTasks += 3;
  if (fetchingLibrary !== 'Fetch API') totalTasks += 1;
  if (stateManagement !== 'Nothing') totalTasks += 1;

  // Initialize package manager commands
  const packageManagerInstall = runtime === 'npm' ? 'npm install' : 'bun add';
  const packageManagerInstallDev =
    runtime === 'npm' ? 'npm install -D' : 'bun add -d';
  const packageManagerExec = runtime === 'npm' ? 'npx' : 'bunx';

  // Create project without nested directories
  let createAppCommand = '';

  if (reactType === 'Create React App (not recommended)') {
    createAppCommand =
      runtime === 'npm'
        ? `npx create-react-app ${appName}`
        : `bunx create-react-app ${appName}`;
  } else if (reactType === 'Vite App (TypeScript) (recommended)') {
    createAppCommand =
      runtime === 'npm'
        ? `npm create vite@latest ${appName} -- --template react-ts`
        : `bun create vite ${appName} --template react-ts`;
  } else if (reactType === 'Vite App (JavaScript)') {
    createAppCommand =
      runtime === 'npm'
        ? `npm create vite@latest ${appName} -- --template react`
        : `bun create vite ${appName} --template react`;
  }

  await executeCommand(createAppCommand, spinner, 'Creating React app');
  completedTasks++;

  // Change directory to appName
  process.chdir(appName);

  // Install dependencies
  await executeCommand(
    `${runtime === 'npm' ? 'npm install' : 'bun install'}`,
    spinner,
    'Installing dependencies'
  );
  completedTasks++;

  // Install UI library
  if (uiLibrary !== 'Nothing') {
    if (uiLibrary === 'MUI') {
      await executeCommand(
        `${packageManagerInstall} @mui/material @emotion/react @emotion/styled`,
        spinner,
        'Installing MUI'
      );
    } else if (uiLibrary === 'ChakraUI') {
      await executeCommand(
        `${packageManagerInstall} @chakra-ui/react @emotion/react @emotion/styled framer-motion`,
        spinner,
        'Installing Chakra UI'
      );
    } else if (uiLibrary === 'DaisyUI') {
      await executeCommand(
        `${packageManagerInstallDev} daisyui@latest`,
        spinner,
        'Installing DaisyUI'
      );
      // Modify tailwind.config.js to include DaisyUI plugin
      const tailwindConfigPath = 'tailwind.config.js';
      if (fs.existsSync(tailwindConfigPath)) {
        let tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8');
        tailwindConfigContent = tailwindConfigContent.replace(
          'plugins: [],',
          "plugins: [require('daisyui')],"
        );
        fs.writeFileSync(tailwindConfigPath, tailwindConfigContent);
      }
    } else {
      await executeCommand(
        `${packageManagerInstall} ${uiLibrary.toLowerCase()}`,
        spinner,
        `Installing ${uiLibrary}`
      );
    }
    completedTasks++;
  }

  // Install and configure Tailwind CSS
  if (tailwind) {
    await executeCommand(
      `${packageManagerInstallDev} tailwindcss postcss autoprefixer`,
      spinner,
      'Installing Tailwind CSS'
    );
    await executeCommand(
      `${packageManagerExec} tailwindcss init -p`,
      spinner,
      'Initializing Tailwind CSS'
    );

    const indexCssPath = path.join('src', 'index.css');
    const tailwindImports =
      '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n';
    const currentCssContent = fs.existsSync(indexCssPath)
      ? fs.readFileSync(indexCssPath, 'utf8')
      : '';
    fs.writeFileSync(indexCssPath, tailwindImports + currentCssContent);

    fs.writeFileSync(
      'tailwind.config.js',
      `
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`
    );
    fs.writeFileSync(
      'postcss.config.cjs',
      `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`
    );
    completedTasks += 3;
  }

  // Install fetching library
  if (fetchingLibrary === 'Axios') {
    await executeCommand(
      `${packageManagerInstall} axios`,
      spinner,
      'Installing Axios'
    );
    completedTasks++;
  }

  // Install state management library
  if (stateManagement !== 'Nothing') {
    await executeCommand(
      `${packageManagerInstall} ${stateManagement.toLowerCase()}`,
      spinner,
      `Installing ${stateManagement}`
    );
    completedTasks++;
  }

  console.log(chalk.green(`\n${appName} client project setup completed!\n`));
  console.log(chalk.blue(`Tasks completed: ${completedTasks} / ${totalTasks}`));
}

async function createServerProject(answers) {
  const { serverType, appName, orm } = answers;
  const runtime = answers.runtime || 'npm';
  const spinner = ora();

  let completedTasks = 0;
  let totalTasks = 1; // Initial project setup
  if (orm !== 'Nothing') totalTasks += 2; // Installing ORM and setup

  // Initialize package manager commands
  const packageManagerInit = runtime === 'npm' ? 'npm init -y' : 'bun init -y';
  const packageManagerInstall = runtime === 'npm' ? 'npm install' : 'bun add';
  const packageManagerInstallDev =
    runtime === 'npm' ? 'npm install -D' : 'bun add -d';
  const packageManagerExec = runtime === 'npm' ? 'npx' : 'bunx';

  // Create project directory
  fs.mkdirSync(appName);
  process.chdir(appName);

  if (serverType === 'FastAPI') {
    await executeCommand(
      'python -m venv env',
      spinner,
      'Creating virtual environment'
    );

    // Activate virtual environment
    const activateCommand =
      os.platform() === 'win32'
        ? '.\\env\\Scripts\\activate && '
        : 'source env/bin/activate && ';

    await executeCommand(
      `${activateCommand}pip install fastapi uvicorn python-dotenv`,
      spinner,
      'Installing FastAPI and dependencies'
    );

    // Create standard folder structure
    fs.mkdirSync('models');
    fs.mkdirSync('controllers');
    fs.mkdirSync('config');
    fs.mkdirSync('routes');
    fs.mkdirSync('utils');

    fs.writeFileSync(
      'main.py',
      `
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
`
    );

    // ORM Setup for FastAPI
    if (answers.orm && answers.orm !== 'Nothing') {
      if (answers.orm === 'SQLAlchemy') {
        await executeCommand(
          `${activateCommand}pip install SQLAlchemy`,
          spinner,
          'Installing SQLAlchemy'
        );
        completedTasks++;

        // Create basic SQLAlchemy setup
        fs.writeFileSync(
          'config/database.py',
          `
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
`
        );
      } else if (answers.orm === 'Tortoise-ORM') {
        await executeCommand(
          `${activateCommand}pip install tortoise-orm`,
          spinner,
          'Installing Tortoise-ORM'
        );
        completedTasks++;

        // Create basic Tortoise-ORM setup
        fs.writeFileSync(
          'config/database.py',
          `
from tortoise import Tortoise

TORTOISE_ORM = {
    "connections": {
        "default": "sqlite://db.sqlite3"
    },
    "apps": {
        "models": {
            "models": ["models"],
            "default_connection": "default",
        }
    }
}

async def init():
    await Tortoise.init(config=TORTOISE_ORM)
    await Tortoise.generate_schemas()
`
        );
      }
    }
  } else {
    // Initialize project
    await executeCommand(packageManagerInit, spinner, 'Initializing project');
    completedTasks++;

    if (
      serverType === 'Express (TypeScript) (recommended)' ||
      serverType === 'Express'
    ) {
      await executeCommand(
        `${packageManagerInstall} express dotenv jsonwebtoken cors`,
        spinner,
        'Installing Express and dependencies'
      );
      completedTasks++;

      if (serverType === 'Express (TypeScript) (recommended)') {
        await executeCommand(
          `${packageManagerInstallDev} typescript @types/node @types/express ts-node nodemon`,
          spinner,
          'Installing TypeScript and dev dependencies'
        );
        completedTasks++;

        // Initialize TypeScript
        await executeCommand(
          `${packageManagerExec} tsc --init`,
          spinner,
          'Initializing TypeScript'
        );
        completedTasks++;

        // Create standard folder structure
        fs.mkdirSync('src');
        fs.mkdirSync('src/models');
        fs.mkdirSync('src/controllers');
        fs.mkdirSync('src/config');
        fs.mkdirSync('src/routes');
        fs.mkdirSync('src/utils');

        fs.writeFileSync(
          'src/index.ts',
          `
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`
        );

        // Update package.json scripts
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        packageJson.scripts = {
          start: 'ts-node src/index.ts',
          dev: 'nodemon src/index.ts',
        };
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        completedTasks++;
      } else {
        // JavaScript Express
        fs.mkdirSync('models');
        fs.mkdirSync('controllers');
        fs.mkdirSync('config');
        fs.mkdirSync('routes');
        fs.mkdirSync('utils');

        fs.writeFileSync(
          'index.js',
          `
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
`
        );
      }
    } else if (
      serverType === 'Fastify (TypeScript) (recommended)' ||
      serverType === 'Fastify'
    ) {
      await executeCommand(
        `${packageManagerInstall} fastify fastify-cors fastify-jwt dotenv`,
        spinner,
        'Installing Fastify and dependencies'
      );
      completedTasks++;

      if (serverType === 'Fastify (TypeScript) (recommended)') {
        await executeCommand(
          `${packageManagerInstallDev} typescript ts-node nodemon @types/node`,
          spinner,
          'Installing TypeScript and dev dependencies'
        );
        completedTasks++;

        // Initialize TypeScript
        await executeCommand(
          `${packageManagerExec} tsc --init`,
          spinner,
          'Initializing TypeScript'
        );
        completedTasks++;

        // Create standard folder structure
        fs.mkdirSync('src');
        fs.mkdirSync('src/models');
        fs.mkdirSync('src/controllers');
        fs.mkdirSync('src/config');
        fs.mkdirSync('src/routes');
        fs.mkdirSync('src/utils');

        fs.writeFileSync(
          'src/index.ts',
          `
import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
    fastify.log.info(\`Server is running on port \${process.env.PORT || 3000}\`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`
        );

        // Update package.json scripts
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        packageJson.scripts = {
          start: 'ts-node src/index.ts',
          dev: 'nodemon src/index.ts',
        };
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
        completedTasks++;
      } else {
        // JavaScript Fastify
        fs.mkdirSync('models');
        fs.mkdirSync('controllers');
        fs.mkdirSync('config');
        fs.mkdirSync('routes');
        fs.mkdirSync('utils');

        fs.writeFileSync(
          'index.js',
          `
const fastify = require('fastify')({ logger: true });
const dotenv = require('dotenv');

dotenv.config();

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, '0.0.0.0');
    fastify.log.info(\`Server is running on port \${process.env.PORT || 3000}\`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
`
        );
      }
    }

    // ORM Setup for JavaScript-Based Servers
    if (answers.orm && answers.orm !== 'Nothing') {
      if (
        serverType.startsWith('Express') ||
        serverType.startsWith('Fastify')
      ) {
        if (answers.orm === 'Prisma') {
          // Install Prisma
          await executeCommand(
            `${packageManagerInstallDev} prisma`,
            spinner,
            'Installing Prisma'
          );
          completedTasks++;

          // Initialize Prisma
          await executeCommand(
            `${packageManagerExec} prisma init`,
            spinner,
            'Initializing Prisma'
          );
          completedTasks++;

          // Create a basic schema.prisma file
          const prismaSchemaPath = path.join('prisma', 'schema.prisma');
          fs.writeFileSync(
            prismaSchemaPath,
            `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
`
          );

          console.log(
            chalk.yellow(
              `\nPrisma has been initialized. You can now define your data models in prisma/schema.prisma and run 'prisma migrate dev' to create the database.\n`
            )
          );
        } else if (answers.orm === 'Sequelize') {
          // Install Sequelize and CLI
          await executeCommand(
            `${packageManagerInstall} sequelize sequelize-cli`,
            spinner,
            'Installing Sequelize and Sequelize CLI'
          );
          completedTasks++;

          // Initialize Sequelize
          await executeCommand(
            `${packageManagerExec} npx sequelize-cli init`,
            spinner,
            'Initializing Sequelize'
          );
          completedTasks++;

          // Create a basic config.json for Sequelize
          const sequelizeConfigPath = path.join('config', 'config.json');
          fs.writeFileSync(
            sequelizeConfigPath,
            `
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database.sqlite"
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./database.sqlite"
  }
}
`
          );

          console.log(
            chalk.yellow(
              `\nSequelize has been initialized. You can now define your models and run migrations using Sequelize CLI.\n`
            )
          );
        }
      }
    }
  }

  completedTasks++;

  console.log(chalk.green(`\n${appName} server project setup completed!\n`));
  console.log(chalk.blue(`Tasks completed: ${completedTasks} / ${totalTasks}`));
}

async function main() {
  welcomeNote();

  const { projectType } = await inquirer.prompt(questions);

  if (projectType === 'Client') {
    const answers = await inquirer.prompt(clientQuestions);
    await createClientProject(answers);
  } else if (projectType === 'Server') {
    let serverAnswers = await inquirer.prompt(serverQuestions);

    // Determine if ORM selection is needed
    let ormChoices = ['Nothing'];
    if (
      serverAnswers.serverType.startsWith('Express') ||
      serverAnswers.serverType.startsWith('Fastify')
    ) {
      ormChoices = ['Prisma', 'Sequelize', 'Nothing'];
    } else if (serverAnswers.serverType === 'FastAPI') {
      ormChoices = ['SQLAlchemy', 'Tortoise-ORM', 'Nothing'];
    }

    const ormAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'orm',
        message: 'Which ORM do you want to use?',
        choices: ormChoices,
      },
    ]);

    serverAnswers.orm = ormAnswer.orm;

    if (
      serverAnswers.serverType !== 'FastAPI' &&
      serverAnswers.orm !== 'Nothing'
    ) {
      const { runtime } = await inquirer.prompt([
        {
          type: 'list',
          name: 'runtime',
          message: 'Which runtime do you want to use?',
          choices: ['npm', 'bun(recommended)'],
        },
      ]);
      serverAnswers.runtime = runtime;
    }

    await createServerProject(serverAnswers);
  }
}

main();
