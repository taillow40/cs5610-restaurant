import React from 'react'
import { useSelector } from 'react-redux'
import PostAuthor from './postAuthor'
import Time from './Time'
import './styling/posts.css'
import PostStars from './postStars'

const PostsList = ({reviews}) => {


    const orderedReviews = reviews.slice().sort((a,b) => b.date.localeCompare(a.date));



    const hasAccommodations = (accommodations) => {

      const sumOfRatings = Object.values(accommodations)?.reduce((acc, rating) => acc + rating, 0);
      return sumOfRatings !== 0;
    };

    const renderedReviews = orderedReviews.map(review => (
        <div className="reviewCard" key={review._id}>

            <h3>{review.restaurant}</h3>
            <h3>Overall Rating</h3>
            <PostStars value={review.rating} onClick={() => {}} />
            <h3>Review</h3>
            <p>{review.content.substring(0, 100)}</p>
            {hasAccommodations(review.accomodations) && (
            <div>
              <h3>Accommodations</h3>
                {review.content_accomodations.length > 0 && review.content_accomodations.substring(0, 100)}
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
            <p><PostAuthor authorId={review.user_id} />
            <Time timestamp={review.date}/>
            </p>

        </div>
    ))

  return (
    <div className='allReviews'>
        {renderedReviews}
    </div>
  )
}

export default PostsList
