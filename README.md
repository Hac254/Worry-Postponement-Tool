# PauseWorry App - Setup Instructions

## Prerequisites Installation

1. First, you need to install Node.js:
   - Go to [https://nodejs.org](https://nodejs.org)
   - Download and install the "LTS" (Long Term Support) version
   - Follow the installation wizard's default settings
   - To verify installation, open Terminal (Mac) or Command Prompt (Windows):
     - Click Windows+R, type "cmd" and press Enter (Windows)
     - Search for "Terminal" in Spotlight (Mac)
   - Type `node --version` and press Enter
   - If you see a version number, Node.js is installed correctly

## Project Setup

2. Create and set up your project folder:
   - Create a new folder for your project anywhere on your computer
   - Open VS Code
   - In VS Code, go to File > Open Folder and select your new folder
   - Copy all the project files into this folder

3. Install project dependencies:
   - In VS Code, open the Terminal by:
     - Press Ctrl + ` (backtick key, usually under Esc)
     - Or go to View > Terminal
   - In the terminal, type this command and press Enter:
     ```
     npm install
     ```
   - Wait for the installation to complete (this might take a few minutes)

## Running the Application

4. Start the development server:
   - In the same terminal, type:
     ```
     npm run dev
     ```
   - Wait for the server to start
   - You'll see a local URL (usually http://localhost:5173)
   - Hold Ctrl (Windows) or Cmd (Mac) and click the URL, or copy and paste it into your browser

## Troubleshooting Common Issues

If you encounter errors:

1. "npm not found" error:
   - This means Node.js isn't installed correctly
   - Try reinstalling Node.js from https://nodejs.org

2. "cannot find module" error:
   - In the terminal, run `npm install` again
   - Make sure you're in the correct folder when running commands

3. Port already in use error:
   - Close other running applications
   - Or try changing the port by running:
     ```
     npm run dev -- --port 3000
     ```

## Need Help?

If you're stuck:
1. Read any error messages carefully
2. Make sure all installation steps were followed
3. Try closing VS Code and your browser, then restart your computer
4. If problems persist, seek help from a developer friend or online communities

## Using the App

Once running, you can:
1. See the welcome screen
2. Click "Get Started" to begin
3. Use the navigation to move between different sections:
   - Home: Overview and quick access
   - Log: Write down your worries
   - Worry Time: Process your worries
   - Learn: Understanding the method

The app will automatically save your data in your browser's local storage.
