import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const BASE_API = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:4000';
export const SEARCH_API = `${BASE_API}/api/search`;

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    name: '',
    cuisine: '',
    zipCode: '',
    city: '',
    streetAddress: '',
    distance: [],
    results: [],
    loading: false,
    error: null,
    sortByRating: false
  },
  reducers: {
    setSearchName: (state, action) => {
      state.name = action.payload;
      // Resetting loading and error states
      state.loading = false;
      state.error = null;
    },
    setCuisineFilter: (state, action) => {
      state.cuisine = action.payload;
      state.loading = false;
      state.error = null;
    },
    setZipCodeFilter: (state, action) => {
      state.zipCode = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCityFilter: (state, action) => {
      state.city = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStreetAddressFilter: (state, action) => {
      state.streetAddress = action.payload;
      state.loading = false;
      state.error = null;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSearchLoading: (state) => {
      state.loading = true;
      state.results = [];
      state.error = false;
    },
    setSearchSuccess: (state, action) => {
      state.loading = false;
      state.results = action.payload;
      state.error = false;
    },
    setSearchError: (state) => {
      state.loading = false;
      state.results = [];
      state.error = true;
    },
    sortRating: (state, action) => {
        state.sortByRating = action.payload;
        if (state.sortByRating) {
            state.results.sort((a, b) => b.averageRating - a.averageRating);
          }
    }
  },
});

export const searchAsync = () => async (dispatch, getState) => {
  // Retrieve the current state from the Redux store
  const { name, cuisine, zipCode, city, streetAddress } = getState().search;

  dispatch(setSearchLoading());

  try {
    // Construct the query string based on the current state
    const queryString = `?name=${name}&cuisine=${cuisine}&zipCode=${zipCode}&city=${city}&streetAddress=${streetAddress}`;
    console.log("Qury String:", queryString);
    // Make a request to your server-side search API
    const response = await axios.get(`${SEARCH_API}${queryString}`);

    // Dispatch success action with the search results
    dispatch(setSearchSuccess(response.data));
  } catch (error) {
    // Dispatch error action if something goes wrong
    dispatch(setSearchError('Failed to fetch search results'));
  }
};

/*const filterRestaurants = (state) => {

    const {name, cuisine, zipCode, city, streetAddress} = state;

    const filteredResults = db.restaurants.filter((restaurant) => {
      const nameMatch = name ? restaurant.name.includes(name) : true;
      const cuisineMatch = cuisine ? restaurant.cuisine[0].includes(cuisine) : true;
      const zipCodeMatch = zipCode ? restaurant.zipCode.includes(zipCode) : true;
      const cityMatch = city ? restaurant.City.includes(city) : true;
      const streetAddressMatch = streetAddress
        ? restaurant.streetAddress.includes(streetAddress)
        : true;

        console.log(`name: ${name}, restaurant.name: ${restaurant.name}, nameMatch: ${nameMatch}`);
        console.log(`cuisine: ${cuisine}, restaurant.cuisine: ${restaurant.cuisine}, cuisineMatch: ${cuisineMatch}`);
        console.log(`zipCode: ${zipCode}, restaurant.zipCode: ${restaurant.zipCode}, zipCodeMatch: ${zipCodeMatch}`);
        console.log(`city: ${city}, restaurant.city: ${restaurant.city}, cityMatch: ${cityMatch}`);
        console.log(`streetAddress: ${streetAddress}, restaurant.streetAddress: ${restaurant.streetAddress}, streetAddressMatch: ${streetAddressMatch}`);
     
        return nameMatch && cuisineMatch && zipCodeMatch && cityMatch && streetAddressMatch;
    });

    console.log("Filtered Results:", filteredResults);
    return filteredResults;
  };
*/

  export const {
    setSearchName,
    setCuisineFilter,
    setZipCodeFilter,
    setCityFilter,
    setStreetAddressFilter,
    setDistance,
    setSearchLoading,
    setSearchSuccess,
    setSearchError,
    sortRating
  } = searchSlice.actions;

  export default searchSlice.reducer;