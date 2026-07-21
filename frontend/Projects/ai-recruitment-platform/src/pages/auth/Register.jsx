import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  User,
  UserRoundCog,
} from "lucide-react";
import { toast } from "react-toastify";

import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Candidate",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName =
        "Full name must contain at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      };

      const response = await api.post(
        "/Auth/register",
        payload
      );

      toast.success(
        response.data?.message ||
          "Registration completed successfully."
      );

      navigate("/login", {
        replace: true,
        state: {
          email: payload.email,
        },
      });
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Registration failed. Please try again.";

      setErrors({
        general: message,
      });

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-900/40">
                <BriefcaseBusiness size={25} />
              </div>

              <div>
                <p className="text-xl font-bold">
                  AI Recruitment
                </p>
                <p className="text-sm text-slate-400">
                  Smart hiring platform
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
              Build your future
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Find better opportunities with intelligent
              recruitment.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Create an account to discover suitable jobs,
              manage applications, and connect with hiring
              teams through one secure platform.
            </p>

            <div className="mt-10 space-y-5">
              <Feature
                title="AI-powered matching"
                description="Discover roles that match your profile and skills."
              />

              <Feature
                title="Simple application tracking"
                description="Follow every application from submission to hiring."
              />

              <Feature
                title="Secure account access"
                description="Your account and recruitment information stay protected."
              />
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-500">
            AI Recruitment Platform
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-xl">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 lg:hidden">
                <BriefcaseBusiness size={27} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Create an account
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                Join the platform
              </h2>

              <p className="mt-3 text-slate-500">
                Enter your details to create a new account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8"
              noValidate
            >
              {errors.general && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.general}
                </div>
              )}

              <div className="space-y-5">
                <FormField
                  label="Full name"
                  error={errors.fullName}
                >
                  <div className="relative">
                    <User
                      size={19}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      disabled={loading}
                      className={getInputClasses(
                        errors.fullName,
                        "pl-11"
                      )}
                    />
                  </div>
                </FormField>

                <FormField
                  label="Email address"
                  error={errors.email}
                >
                  <div className="relative">
                    <Mail
                      size={19}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      autoComplete="email"
                      disabled={loading}
                      className={getInputClasses(
                        errors.email,
                        "pl-11"
                      )}
                    />
                  </div>
                </FormField>

                <FormField
                  label="Account role"
                  error={errors.role}
                >
                  <div className="relative">
                    <UserRoundCog
                      size={19}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={loading}
                      className={getInputClasses(
                        errors.role,
                        "appearance-none pl-11 pr-10"
                      )}
                    >
                      <option value="Candidate">
                        Candidate
                      </option>

                      <option value="Recruiter">
                        Recruiter
                      </option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                      ▼
                    </span>
                  </div>
                </FormField>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Password"
                    error={errors.password}
                  >
                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 6 characters"
                        autoComplete="new-password"
                        disabled={loading}
                        className={getInputClasses(
                          errors.password,
                          "pl-11 pr-11"
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (current) => !current
                          )
                        }
                        disabled={loading}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </FormField>

                  <FormField
                    label="Confirm password"
                    error={errors.confirmPassword}
                  >
                    <div className="relative">
                      <LockKeyhole
                        size={19}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        disabled={loading}
                        className={getInputClasses(
                          errors.confirmPassword,
                          "pl-11 pr-11"
                        )}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            (current) => !current
                          )
                        }
                        disabled={loading}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>
                  </FormField>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>

              <p className="mt-7 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

function FormField({ label, error, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
        <CheckCircle2 size={18} />
      </div>

      <div>
        <p className="font-semibold text-white">
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

function getInputClasses(error, extraClasses = "") {
  return `
    w-full rounded-xl border bg-white px-4 py-3
    text-slate-900 outline-none transition
    placeholder:text-slate-400
    disabled:cursor-not-allowed disabled:bg-slate-100
    ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    }
    ${extraClasses}
  `;
}

export default Register;