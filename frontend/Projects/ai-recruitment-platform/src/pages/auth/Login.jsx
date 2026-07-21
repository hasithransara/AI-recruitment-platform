import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const decodeJwtPayload = (token) => {
    try {
      const payloadPart = token.split(".")[1];

      if (!payloadPart) {
        return null;
      }

      const normalizedPayload = payloadPart
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const decodedPayload = decodeURIComponent(
        window
          .atob(normalizedPayload)
          .split("")
          .map(
            (character) =>
              `%${character
                .charCodeAt(0)
                .toString(16)
                .padStart(2, "0")}`
          )
          .join("")
      );

      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  };

  const getRoleFromToken = (token) => {
    const payload = decodeJwtPayload(token);

    if (!payload) {
      return null;
    }

    return (
      payload.role ||
      payload.roles ||
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] ||
      null
    );
  };

  const getUserIdFromToken = (token) => {
    const payload = decodeJwtPayload(token);

    if (!payload) {
      return null;
    }

    return (
      payload.userId ||
      payload.sub ||
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] ||
      null
    );
  };

  const getNameFromToken = (token) => {
    const payload = decodeJwtPayload(token);

    if (!payload) {
      return null;
    }

    return (
      payload.name ||
      payload.unique_name ||
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ] ||
      null
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Please enter your email and password.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await login(email, password);

      if (!result.token) {
        toast.error("Login response did not include a token.");
        return;
      }

      const tokenRole = getRoleFromToken(result.token);
      const tokenUserId = getUserIdFromToken(result.token);
      const tokenName = getNameFromToken(result.token);

      const role = result.role || tokenRole;
      const userId = result.userId || tokenUserId;
      const name = result.name || tokenName;

      console.log("LOGIN RESPONSE:", result);
      console.log("DECODED ROLE:", role);

      localStorage.setItem("token", result.token);

      if (role) {
        const storedRole = Array.isArray(role)
          ? role[0]
          : role;

        localStorage.setItem("role", storedRole);
      }

      if (userId) {
        localStorage.setItem(
          "userId",
          userId.toString()
        );
      }

      if (name) {
        localStorage.setItem("name", name);
      }

      localStorage.setItem("email", email.trim());

      const roleValue = Array.isArray(role)
        ? role[0]
        : role;

      const normalizedRole = roleValue
        ?.toString()
        .trim()
        .toLowerCase()
        .replaceAll("_", "")
        .replaceAll(" ", "")
        .replace("role", "");

      if (
        normalizedRole === "admin" ||
        normalizedRole === "administrator"
      ) {
        toast.success("Login successful!");
        navigate("/admin", { replace: true });
      } else if (normalizedRole === "recruiter") {
        toast.success("Login successful!");
        navigate("/recruiter", { replace: true });
      } else if (
        normalizedRole === "hiringmanager"
      ) {
        toast.success("Login successful!");
        navigate("/hiring-manager", {
          replace: true,
        });
      } else if (normalizedRole === "candidate") {
        toast.success("Login successful!");
        navigate("/candidate", {
          replace: true,
        });
      } else {
        console.error(
          "Unknown role from JWT:",
          role
        );

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        toast.error(
          "The login token does not contain a valid user role."
        );
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Invalid email or password.";

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">
        <h2 className="mb-2 text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="mb-8 text-slate-500">
          Sign in to continue.
        </p>

        <form onSubmit={handleLogin}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            autoComplete="current-password"
            disabled={isLoading}
          />

          <div className="mb-6 flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                disabled={isLoading}
              />

              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-indigo-600 transition hover:text-indigo-800"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="mt-8 text-center text-slate-600">
          Don't have an account?

          <Link
            to="/register"
            className="ml-2 text-indigo-600 transition hover:text-indigo-800"
          >
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;