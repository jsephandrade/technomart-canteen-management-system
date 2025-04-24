
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Linkedin } from "lucide-react";

interface LoginCardProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleSocial: (provider: string) => void;
  toggleCard: () => void;
  error: string;
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

const LoginCard = ({ 
  email, 
  setEmail, 
  password, 
  setPassword, 
  handleSubmit, 
  handleSocial, 
  toggleCard, 
  error, 
  pending 
}) => {
  return (
    <div className="card-face card-front bg-white">
      <h3 className="text-xl font-semibold mb-4">Login</h3>
      {error && <div className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
        >
          {pending ? "Processing..." : "Login"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <button 
          onClick={toggleCard} 
          className="text-primary hover:text-primary-dark text-sm font-medium"
          type="button"
        >
          Create New Account
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
