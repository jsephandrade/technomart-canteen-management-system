
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Linkedin } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

// Use Google and LinkedIn, but do NOT import Google icon
const socialProviders = [
  {
    name: "Google",
    // No icon per requirements
  },
  {
    name: "Linkedin",
    icon: Linkedin,
  },
];

const LandingPage: React.FC = () => {
  const {
    login,
    socialLogin
  } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");
    if (mode === "login") {
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-between"
      style={{
        background: "#F1FADA"
      }}>
      <header className="pt-10">
        <h1 className="text-4xl font-bold text-primary drop-shadow">Welcome to TechnoMart</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">Canteen Management System</p>
      </header>
      <main className="flex flex-1 items-center justify-center w-full">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white bg-opacity-90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="h-5 w-5" />
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Input type="email" placeholder="admin@canteen.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={pending} />
              </div>
              <div>
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required disabled={pending} />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button type="submit" className="w-full" disabled={pending}>
                {mode === "login" ? "Login" : "Sign Up"}
              </Button>
            </form>
            <div className="flex items-center my-4">
              <span className="h-px flex-1 bg-gray-300" />
              <span className="px-2 text-xs text-gray-500">OR</span>
              <span className="h-px flex-1 bg-gray-300" />
            </div>
            <div className="flex flex-col space-y-2">
              {socialProviders.map(provider => (
                <Button
                  key={provider.name}
                  className="w-full"
                  variant="outline"
                  type="button"
                  onClick={() => handleSocial(provider.name)}
                  disabled={pending}
                >
                  {/* No Google icon, but display icon if present */}
                  {provider.icon && <provider.icon className="mr-2" />} Login with {provider.name}
                </Button>
              ))}
            </div>
            <div className="text-center mt-4 text-xs text-muted-foreground">
              <div>
                Demo account: <strong>admin@canteen.com</strong> / <strong>1234</strong>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="pb-6 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TechnoMart Canteen System
      </footer>
    </div>
  );
};
export default LandingPage;
