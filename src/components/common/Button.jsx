import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled = false, className = '' }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-cosmic-purple hover:bg-nebula-violet text-star-white shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]",
    secondary: "bg-space-surface border border-cosmic-purple/30 text-star-white hover:border-cosmic-purple/80 hover:shadow-[0_0_15px_rgba(124,58,237,0.2)]",
    ghost: "text-moon-gray hover:text-star-white hover:bg-white/5"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
