
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
  handleSocial,
  toggleCard,
  pending,
}: SignupCardProps) => {
  return (
    <Card className="w-full shadow-xl border-0 bg-white absolute backface-hidden rotate-y-180">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Account
          </div>
          <Button variant="ghost" size="sm" onClick={toggleCard}>
            Back to Login
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={pending}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={pending}
            />
          </div>
          <Input
            type="tel"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            disabled={pending}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={pending}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={pending}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Image className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload 1x1 photo</p>
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            Create Account
          </Button>
        </form>
        <div className="flex items-center my-4">
          <span className="h-px flex-1 bg-gray-300" />
          <span className="px-2 text-xs text-gray-500">OR</span>
          <span className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="flex flex-col space-y-2">
          {socialProviders.map((provider) => (
            <Button
              key={provider.name}
              className="w-full"
              variant="outline"
              type="button"
              onClick={() => handleSocial(provider.name)}
              disabled={pending}
            >
              {provider.icon && <provider.icon className="mr-2" />}
              Continue with {provider.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
