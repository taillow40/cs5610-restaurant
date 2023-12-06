import "./restaurant.css";
import ImageBox from "./ImageBox";
import SummaryBox from "./SummaryBox";
import ReviewsBox from "./ReviewsBox";
import { useParams } from "react-router-dom";

function Restaurant() {
    const { rId } = useParams();
    let restaurantId = parseInt(rId);

    return (
        <div className="flex-down">
            <h1>Navbar in this space</h1>
            <div className="restaurant-card">
            <ImageBox rId={restaurantId}/>
            </div>
            <div className="restaurant-card">
            <SummaryBox rId={restaurantId}/>
            </div>
            <div className="restaurant-card">
            <ReviewsBox rId={restaurantId}/>
            </div>
        </div>
    )
}

export default Restaurant;