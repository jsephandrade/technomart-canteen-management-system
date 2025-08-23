import React, { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/auth/Header";
import HeroImage from "@/components/auth/HeroImage";
import AuthCard from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";
import SocialProviders from "@/components/auth/SocialProviders";

const LoginPage = () => {
  const { login, socialLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const ok = await login(email, password);
      if (!ok) setError("Invalid credentials.");
      // optionally navigate on success here
      // if (ok) navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleSocial = async provider => {
    setPending(true);
    setError("");
    try {
      await socialLogin(provider);
      // optionally navigate on success
      // navigate("/dashboard");
    } catch (err) {
      setError("Social login failed. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row items-center px-4 md:px-6 gap-8 max-w-7xl mx-auto w-full py-8">
        <div className="w-full md:w-1/2 flex flex-col gap-6 max-w-lg order-2 md:order-1">
          <AuthCard title="Login">
            <LoginForm
              email={email}
              password={password}
              pending={pending}
              error={error}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onSubmit={handleSubmit}
            />

            <SocialProviders onSocial={handleSocial} pending={pending} />

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/signup")}
                className="text-primary hover:text-primary-dark text-sm font-medium"
                type="button"
              >
                Create New Account
              </button>
            </div>
          </AuthCard>
        </div>

        <HeroImage src="/images/b1bc6b54-fe3f-45eb-8a39-005cc575deef.png" />
      </main>

      <footer className="py-6 text-gray-500 text-xs text-center border-t border-gray-100">
        &copy; {new Date().getFullYear()} TechnoMart Canteen System
      </footer>
    </div>
  );
};

export default LoginPage;
