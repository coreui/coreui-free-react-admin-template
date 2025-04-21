import React from 'react';

const Unauthorized = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;