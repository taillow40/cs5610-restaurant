import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import PostAuthor from './postAuthor'
import Time from './Time'
import './styling/posts.css'
import PostStars from './postStars'

const PostsList = ({restaurantId}) => {

    const posts = useSelector(selectAllPosts);

    console.log({posts})

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    console.log({orderedPosts});

    const restaurantPosts = orderedPosts.filter(posts => posts.restaurant_id == restaurantId);


    console.log("Restaurant posts:", {restaurantPosts})


    const hasAccommodations = (accommodations) => {
      console.log("Accommodations:", accommodations);
      const sumOfRatings = Object.values(accommodations).reduce((acc, rating) => acc + rating, 0);
      return sumOfRatings !== 0;
    };

    const renderedPosts = restaurantPosts.map(post => (
        <div className="restaurantCard" key={post.id}>
            {console.log("Post", {post})}
            <h3>{post.restaurant}</h3>
            <h3>Overall Rating</h3>
            <PostStars value={post.rating} onClick={() => {}} />
            {post.content_accomodations.length > 0 && post.content_accomodations.substring(0, 100)}
            {console.log(`Post Allergies: ${post.accomodations}`)}
            {hasAccommodations(post.accomodations) && (
            <div>
              <h3>Accommodations</h3>
                {Object.entries(post.accomodations).map(([allergy, rating]) => (
                rating !== 0 && (
                <div key={allergy}>
                  <p>{allergy} Rating:</p>
                  <PostStars value={rating} onClick={() => {}}/>
                </div>
              )
              ))}
            </div>
          )}
            <p>{post.content.substring(0, 100)}</p>
            <p><PostAuthor userId={post.user_id} />
            <Time timestamp={post.date}/>
            </p>

        </div>
    ))

  return (
    <div>
        <h2>Featured Reviews</h2>
        {renderedPosts}
    </div>
  )
}

export default PostsList