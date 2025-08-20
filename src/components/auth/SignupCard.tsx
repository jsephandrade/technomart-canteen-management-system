
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, UserPlus } from "lucide-react";

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
  pending
}: SignupCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="card-face card-back bg-card p-8 rounded-2xl shadow-lg border border-border backdrop-blur-sm">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Create Account</h3>
        <p className="text-muted-foreground text-sm">Join us and get started today</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              First Name
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'firstName' ? 'transform scale-[1.02]' : ''}`}>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                placeholder="John"
                className="h-12 px-4 text-base bg-background border-2 border-input focus:border-primary focus:ring-0 transition-all duration-200 rounded-lg"
                required
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Last Name
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'lastName' ? 'transform scale-[1.02]' : ''}`}>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                placeholder="Doe"
                className="h-12 px-4 text-base bg-background border-2 border-input focus:border-primary focus:ring-0 transition-all duration-200 rounded-lg"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-foreground mb-2">
            Contact Number
          </label>
          <div className={`relative transition-all duration-200 ${focusedField === 'contactNumber' ? 'transform scale-[1.02]' : ''}`}>
            <Input
              id="contactNumber"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              onFocus={() => setFocusedField('contactNumber')}
              onBlur={() => setFocusedField(null)}
              placeholder="+1 (555) 000-0000"
              className="h-12 px-4 text-base bg-background border-2 border-input focus:border-primary focus:ring-0 transition-all duration-200 rounded-lg"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
            <Input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="john.doe@example.com"
              className="h-12 px-4 text-base bg-background border-2 border-input focus:border-primary focus:ring-0 transition-all duration-200 rounded-lg"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-[1.02]' : ''}`}>
            <Input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="Create a strong password"
              className="h-12 px-4 pr-12 text-base bg-background border-2 border-input focus:border-primary focus:ring-0 transition-all duration-200 rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={pending}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2 mt-6"
        >
          {pending ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus size={20} />
              Create Account
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground font-medium">Or continue with</span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocial('google')}
          className="h-12 flex items-center justify-center gap-3 border-2 hover:border-thalo-blue hover:text-thalo-blue transition-all duration-200 transform hover:scale-[1.02]"
          disabled={pending}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-medium">Google</span>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocial('facebook')}
          className="h-12 flex items-center justify-center gap-3 border-2 hover:border-thalo-blue hover:text-thalo-blue transition-all duration-200 transform hover:scale-[1.02]"
          disabled={pending}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="font-medium">Facebook</span>
        </Button>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm mb-2">Already have an account?</p>
        <Button 
          variant="ghost"
          onClick={toggleCard} 
          className="text-thalo-blue hover:text-thalo-blue/80 hover:bg-thalo-blue/10 font-semibold transition-all duration-200 px-6 py-2 rounded-lg"
          type="button"
        >
          Sign In Instead
        </Button>
      </div>
    </div>
  );
};

export default SignupCard;
