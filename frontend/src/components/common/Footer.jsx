import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t mt-auto">
      <div className="container mx-auto px-6 py-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
