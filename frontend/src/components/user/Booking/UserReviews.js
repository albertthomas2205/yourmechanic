import React, { useState } from 'react';

const UserReviews = ({ reviews }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div>
      {displayedReviews.map((review) => (
        <div key={review.id} className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
          <p className="font-italic mb-1">{`Service: ${review.service_name}`}</p>
          <p className="font-italic mb-1">{`Rating: ${review.rating}`}</p>
          <p className="font-italic mb-1">{`Review: ${review.review}`}</p>
          <p className="font-italic mb-1">{`User: ${review.user_name}`}</p>
        </div>
      ))}

      {!showAll && reviews.length > 2 && (
        <button onClick={() => setShowAll(true)} className="btn btn-link">
          Show All
        </button>
      )}
    </div>
  );
};

export default UserReviews;
