import React from "react";
import AddPostForm from "src/Posts/addPostForm";
import { useParams } from "react-router-dom";

const ReviewsPage = () => {
  const { rId } = useParams();

  console.log("Restaurant Id: ", rId);

  return (
    <div>
      <h1>Add Your Review</h1>
      <AddPostForm restaurantId={rId} />
    </div>
  );
};

export default ReviewsPage;
