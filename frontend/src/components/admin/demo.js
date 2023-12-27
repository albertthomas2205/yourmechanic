import React from 'react';

const Demo = () => {
  return (
    <div className="flex h-screen">
      {/* Blue div (3/12 width on medium and larger screens, 6/12 width on smaller screens) */}
      <div className="w-4/12 sm:w-3/12 bg-blue-500">
        {/* Content for the blue div */}
      </div>

      {/* Other div (9/12 width on medium and larger screens, 6/12 width on smaller screens) */}
      <div className="w-8/12 sm:w-9/12 bg-gray-500">
        {/* Content for the other div */}
      </div>
    </div>
  );
};

export default Demo;