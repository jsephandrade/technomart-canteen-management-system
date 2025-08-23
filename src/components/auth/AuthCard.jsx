import React from "react";

const AuthCard = ({ title, children }) => (
  <div className="w-full max-w-md mx-auto md:mx-0">
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  </div>
);

export default AuthCard;
