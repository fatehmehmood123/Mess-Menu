import React, { useState } from 'react';
import '../css/rating.css';

export default function RatingModal({ 
  mealName, 
  items, 
  onSubmit, 
  onClose,
  isSubmitting 
}) {
  const [ratings, setRatings] = useState(
    items.reduce((acc, item) => {
      acc[item.name] = item.userRating || 0;
      return acc;
    }, {})
  );

  const handleRatingChange = (dishName, value) => {
    setRatings(prev => ({ ...prev, [dishName]: value }));
  };

  const handleSubmit = () => {
    const ratingsArray = Object.entries(ratings)
      .filter(([_, rating]) => rating > 0)
      .map(([dishName, rating]) => ({ dishName, rating }));
    
    onSubmit(ratingsArray);
  };

  const handleDelete = (dishName) => {
    setRatings(prev => ({ ...prev, [dishName]: 0 }));
  };

  return (
    <div className="rating-modal-overlay" onClick={onClose}>
      <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
        <div className="rating-modal-header">
          <h4>Rate {mealName}</h4>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="rating-modal-body">
          {items.map((item) => (
            <div key={item.name} className="rating-item">
              <div className="dish-info">
                <span className="dish-name">{item.name}</span>
                {item.averageRating && (
                  <span className="avg-rating">
                    Avg: {item.averageRating.toFixed(1)}/10 ({item.ratingCount})
                  </span>
                )}
              </div>
              
              <div className="rating-selector">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    className={`rating-btn ${ratings[item.name] === num ? 'active' : ''}`}
                    onClick={() => handleRatingChange(item.name, num)}
                  >
                    {num}
                  </button>
                ))}
                {ratings[item.name] > 0 && (
                  <button 
                    className="delete-rating-btn"
                    onClick={() => handleDelete(item.name)}
                    title="Remove rating"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="rating-modal-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Ratings'}
          </button>
        </div>
      </div>
    </div>
  );
}
