// AddVehicle.jsx

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState('');
  const [company, setCompany] = useState('');
  const [yearOfManufacturing, setYearOfManufacturing] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (date) => {
    setYearOfManufacturing(date);
    setSelectedYear(date.getFullYear().toString());
  };

  const submitForm = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted!', vehicleName, company, yearOfManufacturing, selectedYear);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Vehicle</h2>

      <form onSubmit={submitForm}>
        {/* Vehicle Name Input */}
        {/* ... (unchanged) */}

        {/* Company Input */}
        {/* ... (unchanged) */}

        {/* Year of Manufacturing Input */}
        <div className="mb-4">
          <label htmlFor="year_of_manufacturing" className="block text-gray-700 text-sm font-bold mb-2">Year of Manufacturing</label>
          <DatePicker
            onChange={handleYearChange}
            selected={yearOfManufacturing}
            maxDate={new Date()} // Optionally limit the year selection to the current year or earlier
            calendarType="US"
            calendarContainer={(props) => (
              <div
                {...props}
                style={{
                  maxHeight: '200px', // Adjust the max height as needed
                  overflowY: 'auto', // Add scroll if necessary
                }}
              />
            )}
          />
        </div>

        {/* Year Selection */}
        {/* ... (unchanged) */}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
