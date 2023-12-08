import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        restaurants: []
    },
    reducers: {
        setSearchName: (state, action) => {
            state.name = action.payload;
            state.results = filterRestaurants(state);
        },
        setCuisineFilter: (state, action) => {
            state.cuisine = action.payload;
            state.results = filterRestaurants(state);
        },
        setZipCodeFilter: (state, action) => {
            state.zipCode = action.payload;
            state.results = filterRestaurants(state);
        },
        setCityFilter: (state, action) => {
            state.city = action.payload;
            state.results = filterRestaurants(state);
        },
        setStreetAddressFilter: (state, action) => {
            state.streetAddress = action.payload;
            state.results = filterRestaurants(state);
        },
        setDistance: (state, action) => {
            state.distance = action.payload;
        },
        setStateRestaurants: (state, action) => {
            state.restaurants = action.payload;
            state.results = filterRestaurants(state);
        }
    },
});

export const filterRestaurants = 
    (state) => {
      const { name, cuisine, zipCode, city, streetAddress, restaurants } = state;
        
      return restaurants?.filter(restaurant => {
        const nameMatch = name ? restaurant.name.toLowerCase().includes(name.toLowerCase()) : true;
        const cuisineMatch = cuisine ? restaurant.cuisine[0].toLowerCase().includes(cuisine.toLowerCase()) : true;
        const zipCodeMatch = zipCode ? restaurant.zipCode.includes(zipCode) : true;
        const cityMatch = city ? restaurant.City.toLowerCase().includes(city.toLowerCase()) : true;
        const streetAddressMatch = streetAddress
          ? restaurant.streetAddress.toLowerCase().includes(streetAddress.toLowerCase())
          : true;
  
        return nameMatch && cuisineMatch && zipCodeMatch && cityMatch && streetAddressMatch;
      });
    }

  export const {
    setSearchName,
    setCuisineFilter,
    setZipCodeFilter,
    setCityFilter,
    setStreetAddressFilter,
    setDistance,
    setStateRestaurants
  } = searchSlice.actions;

  export default searchSlice.reducer;