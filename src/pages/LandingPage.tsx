
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast"; // assume shadcn-ui toast
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

export const LandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-8 bg-gradient-to-r from-blue-50 to-white text-center">
        <h1 className="text-4xl font-bold text-primary">Welcome to CTU-MC Cooperative</h1>
        <p className="mt-2 text-lg text-gray-700">Canteen Management System</p>
      </header>

      <main className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto py-12 px-4 gap-12">
        {/* FORM SIDE */}
        <div className="w-full lg:w-1/2 max-w-md">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm onSuccess={() => {/* redirect or close modal */}} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupForm
                onSuccess={() => {
                  toast({
                    title: "Account created!",
                    description: "Please check your email to verify your account.",
                  });
                  setActiveTab("login");
                }}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* IMAGE SIDE */}
        <div className="w-full lg:w-1/2">
          <img
            src="/lovable-uploads/b1bc6b54-fe3f-45eb-8a39-005cc575deef.png"
            alt="CTU-MC Canteen Front"
            className="rounded-2xl shadow-lg object-cover w-full h-72 lg:h-full"
          />
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500 border-t">
        &copy; {new Date().getFullYear()} CTU-MC Canteen System
      </footer>
    </div>
  );
};

export default LandingPage;
