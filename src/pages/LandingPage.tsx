
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
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full py-8 px-6">
        <h1 className="text-4xl font-bold text-primary drop-shadow text-center">Welcome to TechnoMart</h1>
        <p className="mt-2 text-lg text-gray-700 text-center">Canteen Management System</p>
      </header>

      <main className="flex-1 flex items-center px-6 gap-12 max-w-7xl mx-auto w-full">
        <div className="w-1/2 flex flex-col gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Your Campus Food Hub</h2>
            <p className="text-lg text-gray-600">Streamlined ordering, efficient service, and delicious meals - all in one place.</p>
          </div>
          
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
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/b1bc6b54-fe3f-45eb-8a39-005cc575deef.png" 
              alt="TechnoMart Canteen"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-gray-500 text-xs text-center">
        &copy; {new Date().getFullYear()} TechnoMart Canteen System
      </footer>
    </div>
  );
};

export default LandingPage;
