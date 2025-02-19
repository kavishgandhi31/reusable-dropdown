# reusable-dropdown

This project is a Node.js application that runs on `localhost:3000`. Follow the instructions below to get started and run the project locally using Node version 22.

## Prerequisites

- [Node.js 22.x](https://nodejs.org/) (Make sure you're using Node.js version ^18.18.0, ^19.8.0, or >= 20.0.0
- [npm](https://www.npmjs.com/) (Comes with Node.js)

## Steps to Set Up and Run Locally

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/kavishgandhi31/reusable-dropdown.git
cd reusable-dropdown
```

### 2. Install Node.js 22

If you don’t already have Node.js version 22 installed, use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to install and use Node.js 22 or Node.js version ^18.18.0, ^19.8.0 or >= 20.0.0":

```bash
nvm install 22
nvm use 22
```

### 3. Install Dependencies

Once you have Node.js version 22 installed, you need to install the project dependencies.

1. Make sure you're in the project directory. If not, navigate to it using:

```bash
cd path/to/reusable-dropdown
```

2. Run the following command to install all required dependencies listed in the package.json file:

```bash
npm install
```

### 4. Run the Project

Now that you've installed all the dependencies, you're ready to run the project locally. In the project directory, run the following command to start the server:

```bash
npm run dev
```
By default, the application will be running on http://localhost:3000.

### 5. Access the Application

After the server is running, you can access the application in your web browser. Open your browser and navigate to the following URL:

http://localhost:3000

### 6. Play around with the dropdown

Once you have the application runnning, you can play around with the props that are being sent to the reusable dropdown in the page.js file. Feel free to use your own input to test the dropdown.