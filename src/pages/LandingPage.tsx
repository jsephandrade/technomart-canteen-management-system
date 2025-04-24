
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
  const [photo, setPhoto] = useState(null);  // Add state for photo
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
      // Simulated signup with photo upload
      setTimeout(() => {
        setShowSignup(false);
        alert("Account created successfully! Please log in.");
        setFirstName("");
        setLastName("");
        setContactNumber("");
        setPhoto(null);
      }, 1000);
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
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full py-8 px-6 bg-white shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">CTU-MC Multipurpose Cooperative</h1>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative perspective-1000">
            <div className={`card-container ${showSignup ? 'rotate-y-180' : ''}`}>
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
                photo={photo}
                setPhoto={setPhoto}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 text-gray-500 text-xs text-center bg-white border-t">
        &copy; {new Date().getFullYear()} CTU-MC Multipurpose Cooperative
      </footer>
    </div>
  );
};

export default LandingPage;
