import React from 'react';

const Panel = ({ children, className = '' }) => {
  return (
    <div className={`bg-space-surface/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Panel;
