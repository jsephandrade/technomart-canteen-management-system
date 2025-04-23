
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const filipinoDishes = [
  {
    name: "Adobo",
    img: "https://images.unsplash.com/photo-1604908176834-0ef3fe3ce948?auto=format&fit=crop&w=480&q=80",
    desc: "Savory chicken & pork simmered in vinegar and soy sauce.",
  },
  {
    name: "Sinigang",
    img: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=480&q=80",
    desc: "Tamarind-based sour soup with assorted vegetables and meat.",
  },
  {
    name: "Pancit",
    img: "https://images.unsplash.com/photo-1519864342261-fbf3576841c2?auto=format&fit=crop&w=480&q=80",
    desc: "Stir-fried noodles garnished with meat and veggies.",
  },
  {
    name: "Lechon Kawali",
    img: "https://images.unsplash.com/photo-1590080877037-0273c03e8a47?auto=format&fit=crop&w=480&q=80",
    desc: "Crispy deep-fried pork belly, a party favorite.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDE1D3] via-[#D3E4FD] to-[#F2FCE2] flex flex-col">
      {/* Header */}
      <nav className="px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-[#8B5CF6] font-playfair">TechnoMart</span>
          <span className="hidden md:block text-sm text-[#6E59A5] ml-2 font-semibold">Canteen Management System</span>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
          <a href="#auth-section">
            <Button variant="default">Log In / Sign Up</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between px-8 pt-10 pb-0 md:pb-12 grow">
        <div className="max-w-xl text-center md:text-left space-y-6">
          <h1 className="text-4xl font-bold md:text-6xl text-[#403E43] mb-2 font-playfair animate-fade-in">
            Filipino Flavor, Modern Management
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Welcome to TechnoMart Canteen. Fast and seamless food ordering and inventory system, now serving your favorite Filipino dishes!
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <a href="#menu"><Button variant="secondary">See Filipino Menu</Button></a>
            <a href="#auth-section"><Button variant="outline">Get Started</Button></a>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80"
          alt="Filipino food"
          className="w-full max-w-md h-60 object-cover rounded-2xl shadow-lg mb-5 md:mb-0 md:ml-8 animate-fade-in"
        />
      </section>

      {/* Signature Filipino Dishes */}
      <section id="menu" className="py-14 bg-white/60 backdrop-blur-lg px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-5 text-[#8B5CF6] font-playfair">Best-Selling Filipino Dishes</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {filipinoDishes.map((dish) => (
            <div key={dish.name} className="bg-white rounded-lg shadow p-4 w-64 hover-scale transition">
              <img src={dish.img} alt={dish.name} className="w-full h-36 object-cover rounded mb-3" />
              <h3 className="text-lg font-semibold text-[#6E59A5]">{dish.name}</h3>
              <p className="text-gray-600 text-sm">{dish.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login/Signup Card */}
      <section
        id="auth-section"
        className="flex justify-center items-center grow py-20 px-4 bg-transparent"
      >
        <div className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl max-w-md w-full p-8 border border-[#e5deff]">
          <h3 className="text-2xl font-bold text-center text-[#8B5CF6] mb-6 font-playfair">Welcome to TechnoMart</h3>
          <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              alert('Demo only. To enable login/signup, connect an auth provider.');
            }}
          >
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-base focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition"
              type="email"
              placeholder="Email address"
              disabled={false}
              required
            />
            <input
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-base focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition"
              type="password"
              placeholder="Password"
              disabled={false}
              required
            />
            <Button type="submit" className="w-full">Log In</Button>
            <div className="text-center text-sm text-gray-500">or</div>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => alert("Demo only. To enable signup, connect an auth provider.")}
            >
              Sign up
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-auto py-5">Made with ❤️ for Filipino food lovers &middot; © {new Date().getFullYear()}</footer>
    </div>
  );
}
