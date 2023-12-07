import React from "react";
import { Link } from "react-router-dom";
import StarRating from "src/Home/Search/starRating";
import "./index.css";

const avgRating = (rating) => {
  let sum = 0;
  for (var i = 0; i < rating.length; i++) {
    sum += rating[i];
  }
  return sum / rating.length;
};
function SummaryBox({ restaurants, reviews }) {
  return (
    <div className="foryou-wrapper">
      <h2> For You:</h2>
      <aside className="foryou">
        {React.Children.toArray(
          restaurants?.map((result) => {
            return (
              <Link
                className=""
                key={result.id}
                to={`/restaurant/${result.id}`}
              >
                <li
                  key={result.id}
                  className="restaurantList"
                  style={{
                    listStyle: "",
                  }}
                >
                  <h3 style={{ color: "blue" }}>{result.name}</h3>
                  <div className="d-flex">
                    <StarRating rating={avgRating(result.reviews)} />{" "}
                    <p>{result.reviews.length} reviews</p>
                  </div>

                  <h5>
                    {result.streetAddress}, {result.City}, {result.zipCode}
                  </h5>
                  <h5>{result.cuisine}</h5>
                </li>
              </Link>
            );
          })
        )}
      </aside>
      {/* To put here: <br />
            Anything that matches the user's preferences <br />
            Other restaurant detail that we can get, such as opening hours, map embed, etc <br />
            <br />
            <p>Other users say...: Gluten Free (80%)</p> */}
    </div>
  );
}

export default SummaryBox;
