import db from "../Database/index"

// get from local database, will make async from mongo eventually
export const getRestaurantById = (rId) => {
    const restaurants = db.restaurants;
    let matchingRestaurants = restaurants.filter(res => res.id === rId); // can also use find for 1 return
    if (matchingRestaurants.length > 1) {
        throw new Error("More than one restaurant found in db with a matching ID")
    }
    else if (matchingRestaurants.length === 0) {
        throw new Error(`No restaurants found with ID ${rId}`)
    }
    return matchingRestaurants[0];
}