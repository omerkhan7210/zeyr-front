import React from 'react';

const LoadingIcon = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-icon-overlay">
      <div className="loading-icon-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingIcon;
