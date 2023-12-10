import React from 'react';

const PostStars = ({ value, onClick }) => {
        const renderStars = () => {
          const stars = [];
          for (let i = 1; i <= 5; i++) {
            stars.push(
              <span
                key={i}
                onClick={() => onClick(i)}
                style={{
                  cursor: 'pointer',
                  color: i <= value ? 'gold' : 'gray',
                  display: 'inline-block',
                  fontSize: '30px'
                }}
              >
                ★
              </span>
            );
          }
          return stars;
        };
      
        return <div>{renderStars()}</div>;
      };
export default PostStars;