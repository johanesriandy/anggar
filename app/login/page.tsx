"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getFirebaseErrorMessage } from "@/lib/firebase/errors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { FirebaseError } from "firebase/app";

// Zod schemas for validation
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const { signIn, signUp, user, loading: authLoading } = useAuth();

  const form = useForm({
    defaultValues: isSignUp
      ? { email: "", password: "", confirmPassword: "" }
      : { email: "", password: "" },
    onSubmit: async ({ value }) => {
      setFormError("");
      try {
        if (isSignUp) {
          await signUp(value.email, value.password);
        } else {
          await signIn(value.email, value.password);
        }
        router.push("/");
      } catch (err: unknown) {
        setFormError(getFirebaseErrorMessage(err as FirebaseError));
      }
    },
    validators: {
      onSubmit: isSignUp ? signUpSchema : signInSchema,
    },
  });

  // Redirect authenticated users to home page
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  // Don't render the login form if user is authenticated
  if (user) {
    return null;
  }

  const handleModeSwitch = () => {
    setIsSignUp(!isSignUp);
    setFormError("");
    form.reset();
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Pane - Branding (Hidden on mobile/tablet) */}
      <div className="hidden flex-col justify-center bg-muted/50 p-8 lg:flex lg:p-12">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                className="h-4 w-4 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">Anggar</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue managing your finances and
              tracking your expenses.
            </p>
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form (Full width on mobile/tablet) */}
      <div className="flex min-h-screen items-center justify-center p-8 lg:min-h-0 lg:p-12">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? "Create an account" : "Sign in to your account"}
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password below to{" "}
              {isSignUp ? "create your account" : "sign in"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-4"
            >
              {formError && (
                <div
                  id="form-error"
                  className="rounded-md bg-destructive/15 p-3 text-sm text-destructive"
                  role="alert"
                  aria-live="polite"
                >
                  {formError}
                </div>
              )}
              <form.Field
                name="email"
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="you@example.com"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        // Clear field errors when user starts typing
                        form.setFieldMeta(field.name, (prev) => ({
                          ...prev,
                          errors: [],
                          isTouched: true,
                        }));
                      }}
                      onBlur={field.handleBlur}
                      disabled={form.state.isSubmitting}
                      aria-describedby={formError ? "form-error" : undefined}
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    {form.state.isSubmitted && field.state.meta.errors.length > 0 && (
                      <div className="text-sm text-destructive" id={`${field.name}-error`}>
                        {field.state.meta.errors.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
              <form.Field
                name="password"
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        // Clear field errors when user starts typing
                        form.setFieldMeta(field.name, (prev) => ({
                          ...prev,
                          errors: [],
                          isTouched: true,
                        }));
                      }}
                      onBlur={field.handleBlur}
                      disabled={form.state.isSubmitting}
                      aria-invalid={field.state.meta.errors.length > 0}
                    />
                    {form.state.isSubmitted && field.state.meta.errors.length > 0 && (
                      <div className="text-sm text-destructive" id={`${field.name}-error`}>
                        {field.state.meta.errors.join(", ")}
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
              {isSignUp && (
                <form.Field
                  name="confirmPassword"
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Confirm Password</Label>
                      <Input
                        id={field.name}
                        type="password"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          // Clear field errors when user starts typing
                          form.setFieldMeta(field.name, (prev) => ({
                            ...prev,
                            errors: [],
                            isTouched: true,
                          }));
                        }}
                        onBlur={field.handleBlur}
                        disabled={form.state.isSubmitting}
                        aria-invalid={field.state.meta.errors.length > 0}
                      />
                      {form.state.isSubmitted && field.state.meta.errors.length > 0 && (
                        <div className="text-sm text-destructive" id={`${field.name}-error`}>
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </form.Field>
              )}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" className="w-full" disabled={!canSubmit}>
                    {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
                    {isSignUp ? "Sign up" : "Sign in"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                onClick={handleModeSwitch}
                className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                disabled={form.state.isSubmitting}
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
