import React from 'react';

const MessageBox = ({ variant = 'info', children }) => {
  const baseClasses = 'p-4 mb-4 text-sm rounded-lg';

  const variants = {
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800',
    error: 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-800',
    success: 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-800',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-800',
  };

  const variantClasses = variants[variant] || variants.info;

  return (
    <div className={`${baseClasses} ${variantClasses}`} role="alert">
      <span className="font-medium">{variant.charAt(0).toUpperCase() + variant.slice(1)}!</span> {children}
    </div>
  );
};

export default MessageBox;
