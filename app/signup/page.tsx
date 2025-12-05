"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
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
import { signUpSchema } from "@/lib/validation/auth";
import { FirebaseError } from "firebase/app";

export default function SignupPage() {
  const router = useRouter();
  const { signUp, user, loading: authLoading } = useAuth();
  const [formError, setFormError] = useState("");

  const form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: async ({ value }) => {
      setFormError("");
      try {
        await signUp(value.email, value.password);
        router.push("/");
      } catch (err: unknown) {
        setFormError(getFirebaseErrorMessage(err as FirebaseError));
      }
    },
    validators: { onSubmit: signUpSchema },
  });

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
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
            <h1 className="text-3xl font-bold tracking-tight">Sign up</h1>
            <p className="text-muted-foreground">
              Create an account to start tracking your expenses and managing
              your finances.
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center p-8 lg:min-h-0 lg:p-12">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and a strong password to create your account.
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
              <form.Field name="email">
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
                    {form.state.isSubmitted &&
                      field.state.meta.errors.length > 0 && (
                        <div
                          className="text-sm text-destructive"
                          id={`${field.name}-error`}
                        >
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                  </div>
                )}
              </form.Field>
              <form.Field name="password">
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
                    {form.state.isSubmitted &&
                      field.state.meta.errors.length > 0 && (
                        <div
                          className="text-sm text-destructive"
                          id={`${field.name}-error`}
                        >
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                  </div>
                )}
              </form.Field>
              <form.Field name="confirmPassword">
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
                    {form.state.isSubmitted &&
                      field.state.meta.errors.length > 0 && (
                        <div
                          className="text-sm text-destructive"
                          id={`${field.name}-error`}
                        >
                          {field.state.meta.errors.join(", ")}
                        </div>
                      )}
                  </div>
                )}
              </form.Field>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit}
                  >
                    {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
                    Sign up
                  </Button>
                )}
              </form.Subscribe>
            </form>
            <div className="mt-4 text-center text-sm">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                disabled={form.state.isSubmitting}
              >
                Already have an account? Sign in
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
