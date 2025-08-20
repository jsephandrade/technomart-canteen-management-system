
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn } from "lucide-react";

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
}: LoginCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="card-face card-front bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-dark-grey mb-3">Welcome Back</h3>
        <p className="text-gray-600 text-base">Sign in to your account to continue</p>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-primary-red rounded-xl text-sm flex items-start gap-3 animate-fade-in" role="alert" aria-live="polite">
          <div className="w-2 h-2 rounded-full bg-primary-red mt-2 flex-shrink-0"></div>
          <span className="leading-relaxed">{error}</span>
        </div>
      )}
      
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-dark-grey">
            Email Address
          </label>
          <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'transform scale-[1.01]' : ''}`}>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your email address"
              className="h-12 px-4 text-base bg-white border-2 border-gray-200 focus:border-thalo-blue focus:ring-0 transition-all duration-200 rounded-xl hover:border-gray-300"
              required
              aria-describedby={error ? "email-error" : undefined}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-dark-grey">
            Password
          </label>
          <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-[1.01]' : ''}`}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your password"
              className="h-12 px-4 pr-12 text-base bg-white border-2 border-gray-200 focus:border-thalo-blue focus:ring-0 transition-all duration-200 rounded-xl hover:border-gray-300"
              required
              aria-describedby={error ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark-grey transition-colors duration-200 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-thalo-blue focus:ring-offset-2"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={pending}
          className="w-full h-12 bg-primary-red hover:bg-primary-red/90 text-white font-semibold text-base rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2 mt-8"
        >
          {pending ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing in...
            </>
          ) : (
            <>
              <LogIn size={20} />
              Sign In
            </>
          )}
        </Button>
      </form>
      
      {/* Divider */}
      <div className="my-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-6 bg-white text-gray-500 font-medium">Or continue with</span>
        </div>
      </div>
      
      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocial('google')}
          className="h-12 flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-thalo-blue hover:text-thalo-blue hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] rounded-xl"
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
          className="h-12 flex items-center justify-center gap-3 border-2 border-gray-200 hover:border-thalo-blue hover:text-thalo-blue hover:bg-blue-50 transition-all duration-200 transform hover:scale-[1.02] rounded-xl"
          disabled={pending}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="font-medium">Facebook</span>
        </Button>
      </div>
      
      {/* Footer */}
      <div className="text-center">
        <p className="text-gray-600 text-sm mb-3">Don't have an account?</p>
        <Button 
          variant="ghost"
          onClick={toggleCard} 
          className="text-thalo-blue hover:text-thalo-blue/80 hover:bg-blue-50 font-semibold transition-all duration-200 px-6 py-2 rounded-xl"
          type="button"
        >
          Create New Account
        </Button>
      </div>
    </div>
  );
};

export default LoginCard;
