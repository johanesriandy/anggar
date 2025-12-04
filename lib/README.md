# Firebase Authentication Setup Guide

This application uses Firebase Authentication for user management. Follow these steps to set up Firebase for your project.

## Prerequisites

- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Authentication

1. In the Firebase Console, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" as a sign-in provider
5. Click "Save"

## Step 3: Register Your Web App

1. In the Firebase Console, click on the gear icon (Project settings)
2. Scroll down to "Your apps" section
3. Click on the web icon (`</>`) to add a web app
4. Give your app a nickname (e.g., "Anggar Web App")
5. Click "Register app"
6. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (copy from `.env.local.example`)
2. Add your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

3. Replace the placeholder values with your actual Firebase configuration values

## Step 5: Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Using the Authentication

### Sign Up
1. Click "Sign In" on the home page
2. Click "Don't have an account? Sign up"
3. Enter your email and password
4. Click "Sign up"

### Sign In
1. Click "Sign In" on the home page
2. Enter your email and password
3. Click "Sign in"

### Sign Out
- Click "Sign Out" button when logged in

## Features

- Email/Password authentication
- Sign up for new users
- Sign in for existing users
- Sign out functionality
- Protected routes (authentication state management)
- Responsive design with dark mode support

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Firebase API keys secure
- Configure Firebase security rules in the Firebase Console for production
- Enable additional security features like email verification if needed

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure your `.env.local` file exists and contains all required variables
- Restart your development server after creating/modifying `.env.local`

### "Firebase: Error (auth/invalid-api-key)"
- Double-check that your API key is correct in `.env.local`
- Ensure there are no extra spaces or quotes around the values

### Authentication not persisting
- Check browser console for errors
- Ensure cookies are enabled in your browser
- Clear browser cache and try again
