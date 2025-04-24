
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Image, Linkedin } from "lucide-react";

interface SignupCardProps {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  contactNumber: string;
  setContactNumber: (number: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSocial: (provider: string) => void;
  toggleCard: () => void;
  pending: boolean;
}

const socialProviders = [
  {
    name: "Google",
  },
  {
    name: "Linkedin",
    icon: Linkedin,
  },
];

const SignupCard = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  contactNumber,
  setContactNumber,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  toggleCard,
  pending
}) => {
  return (
    <div className="card-face card-back bg-white">
      <h3 className="text-xl font-semibold mb-4">Create Account</h3>
      <p className="mb-4 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
        Note: Signup is currently disabled. Only administrators can access the system.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
        <button
          type="submit"
          disabled={pending || true}
          className="w-full bg-gray-400 text-white font-medium py-3 px-4 rounded-lg cursor-not-allowed"
        >
          Sign Up Disabled
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button 
          onClick={toggleCard} 
          className="text-primary hover:text-primary-dark text-sm font-medium"
          type="button"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
