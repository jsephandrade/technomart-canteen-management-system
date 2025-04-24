import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, Linkedin, User, Image } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const socialProviders = [
  {
    name: "Google",
  },
  {
    name: "Linkedin",
    icon: Linkedin,
  },
];

const LandingPage: React.FC = () => {
  const { login, socialLogin } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
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
            {/* Login Card - Front */}
            <Card className={`w-full shadow-xl border-0 bg-white absolute backface-hidden ${showSignup ? 'invisible' : ''}`}>
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
                    Login
                  </Button>
                  <Button type="button" variant="outline" className="w-full" onClick={toggleCard}>
                    Create New Account
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

            {/* Sign Up Card - Back */}
            <Card className={`w-full shadow-xl border-0 bg-white absolute backface-hidden rotate-y-180 ${!showSignup ? 'invisible' : ''}`}>
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
                      onChange={e => setFirstName(e.target.value)} 
                      required 
                      disabled={pending} 
                    />
                    <Input 
                      type="text" 
                      placeholder="Last Name" 
                      value={lastName}
                      onChange={e => setLastName(e.target.value)} 
                      required 
                      disabled={pending} 
                    />
                  </div>
                  <Input 
                    type="tel" 
                    placeholder="Contact Number" 
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)} 
                    required 
                    disabled={pending} 
                  />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    disabled={pending} 
                  />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
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
                  {socialProviders.map(provider => (
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
          </div>
        </div>
      </main>

      <footer className="pb-6 text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} TechnoMart Canteen System
      </footer>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
