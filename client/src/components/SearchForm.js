import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const SearchForm = ({ setLocation }) => {
  const [address, setAddress] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setLocation(latLng);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter a location"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
