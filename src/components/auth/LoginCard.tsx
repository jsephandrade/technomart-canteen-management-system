
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
  pending,
}: LoginCardProps) => {
  return (
    <Card className="w-full shadow-xl border-0 bg-white absolute backface-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LogIn className="h-5 w-5" />
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Input
              type="email"
              placeholder="admin@canteen.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={pending}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={pending}
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full" disabled={pending}>
            Login
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={toggleCard}
          >
            Create New Account
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
              {provider.icon && <provider.icon className="mr-2" />} Login with{" "}
              {provider.name}
            </Button>
          ))}
        </div>

        <div className="text-center mt-4 text-xs text-muted-foreground">
          <div>
            Demo account: <strong>admin@canteen.com</strong> /{" "}
            <strong>1234</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
