import React from "react";

const LoginForm = ({
  email,
  password,
  pending,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <>
      {error && (
        <div
          className="p-3 mb-4 bg-red-50 text-red-600 rounded-lg text-sm"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label className="sr-only" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
            autoComplete="email"
            disabled={pending}
          />
        </div>
        <div>
          <label className="sr-only" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => onPasswordChange(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
            autoComplete="current-password"
            disabled={pending}
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
        >
          {pending ? "Processing..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
