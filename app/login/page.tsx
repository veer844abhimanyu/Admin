"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";

type FormErrors = {
  username?: string;
  password?: string;
  form?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (!username.trim()) {
      nextErrors.username = "Username is required.";
    } else if (username.trim().length < 3) {
      nextErrors.username = "Username must be at least 3 characters.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        user?: {
          role?: "admin" | "instructor";
        };
      };

      if (!response.ok) {
        setErrors({
          form: data.error || "Unable to sign in. Check your credentials.",
        });
        return;
      }

      router.replace(data.user?.role === "instructor" ? "/courses" : "/");
      router.refresh();
    } catch {
      setErrors({
        form: "Something went wrong while signing in.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-4 py-8">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div>
            <div className="mb-8 flex items-center justify-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white">
                AY
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">AyushYogi</h1>
                <p className="text-sm text-slate-500">Admin Panel</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                Secure Access
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Sign in to continue
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 ${
                      errors.username ? "border-red-300" : "border-slate-300"
                    }`}
                    placeholder="Enter username"
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    type={showPassword ? "text" : "password"}
                    className={`h-12 w-full rounded-xl border bg-white pl-10 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 ${
                      errors.password ? "border-red-300" : "border-slate-300"
                    }`}
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs font-medium text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.form && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errors.form}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
