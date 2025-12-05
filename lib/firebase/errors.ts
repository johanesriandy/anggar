import { FirebaseError } from "firebase/app";

/**
 * Maps Firebase authentication error codes to user-friendly messages
 */
export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  const errorCode = error.code || error.message || "";

  const errorMessages: Record<string, string> = {
    "auth/invalid-email": "Please enter a valid email address",
    "auth/user-disabled":
      "This account has been disabled. Please contact support",
    "auth/user-not-found": "No account found with this email address",
    "auth/wrong-password": "Incorrect password. Please try again",
    "auth/email-already-in-use": "An account with this email already exists",
    "auth/weak-password": "Password should be at least 6 characters long",
    "auth/operation-not-allowed": "This sign-in method is currently disabled",
    "auth/too-many-requests":
      "Too many failed attempts. Please try again later",
    "auth/network-request-failed":
      "Network error. Please check your internet connection",
    "auth/invalid-credential": "Invalid email or password. Please try again",
    "auth/requires-recent-login": "Please sign in again to continue",
    "auth/invalid-verification-code": "Invalid verification code",
    "auth/invalid-verification-id": "Invalid verification ID",
  };

  return (
    errorMessages[errorCode] || "An unexpected error occurred. Please try again"
  );
};
