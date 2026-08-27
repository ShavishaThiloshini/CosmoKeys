import React from 'react';

const PageHeader = ({ title, description }) => {
  return (
    <div className="mb-8 text-center max-w-2xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-star-white mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-lg text-moon-gray">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
