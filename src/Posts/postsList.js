import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './postAuthor'
import Time from './Time'
import './styling/posts.css'
import PostStars from './postStars'

const PostsList = ({reviews}) => {


    const orderedReviews = reviews.slice().sort((a,b) => b.date.localeCompare(a.date));



    const hasAccommodations = (accommodations) => {

      const sumOfRatings = Object.values(accommodations).reduce((acc, rating) => acc + rating, 0);
      return sumOfRatings !== 0;
    };

    const renderedReviews = orderedReviews.map(review => (
        <div className="restaurantCard" key={review._id}>

            <h3>{review.restaurant}</h3>
            <h3>Overall Rating</h3>
            <PostStars value={review.rating} onClick={() => {}} />
            {review.content_accomodations.length > 0 && review.content_accomodations.substring(0, 100)}
            {hasAccommodations(review.accomodations) && (
            <div>
              <h3>Accommodations</h3>
                {Object.entries(review.accomodations).map(([allergy, rating]) => (
                rating !== 0 && (
                <div key={allergy}>
                  <p>{allergy} Rating:</p>
                  <PostStars value={rating} onClick={() => {}}/>
                </div>
              )
              ))}
            </div>
          )}
            <p>{review.content.substring(0, 100)}</p>
            <p><PostAuthor authorId={review.user_id} />
            <Time timestamp={review.date}/>
            </p>

        </div>
    ))

  return (
    <div>
        <h2>Featured Reviews</h2>
        {renderedReviews}
    </div>
  )
}

export default PostsList