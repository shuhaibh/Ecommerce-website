import React from 'react';

const StarRating = ({ rating = 0 }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  const starIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <div key={`full-${i}`} className="text-yellow-400">
          {starIcon}
        </div>
      ))}
      {halfStar && (
        <div className="text-yellow-400">{starIcon}</div> // For simplicity, showing a full star for half
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <div key={`empty-${i}`} className="text-gray-300 dark:text-gray-600">
          {starIcon}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
