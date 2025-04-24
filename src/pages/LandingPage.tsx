
import React, { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import LoginCard from "@/components/auth/LoginCard";
import SignupCard from "@/components/auth/SignupCard";
import "../styles/card-animations.css";

const LandingPage: React.FC = () => {
  const { login, socialLogin } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");
    if (!showSignup) {
      const ok = await login(email, password);
      if (!ok) setError("Invalid credentials.");
    } else {
      setError("Signup disabled. Only admin can login.");
    }
    setPending(false);
  };

  const handleSocial = async (provider: string) => {
    setPending(true);
    setError("");
    await socialLogin(provider);
    setPending(false);
  };

  const toggleCard = () => {
    setShowSignup(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white">
      <header className="pt-10">
        <h1 className="text-4xl font-bold text-primary drop-shadow">Welcome to TechnoMart</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">Canteen Management System</p>
      </header>

      <main className="flex flex-1 items-center justify-center w-full px-4">
        <div className="relative w-full max-w-md perspective-1000">
          <div className={`relative duration-700 transform-style-3d ${showSignup ? 'rotate-y-180' : ''}`}>
            <LoginCard
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleSocial={handleSocial}
              toggleCard={toggleCard}
              error={error}
              pending={pending}
            />
            <SignupCard
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
              handleSocial={handleSocial}
              toggleCard={toggleCard}
              pending={pending}
            />
          </div>
        </div>
      </main>

      <footer className="pb-6 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TechnoMart Canteen System
      </footer>
    </div>
  );
};

export default LandingPage;
