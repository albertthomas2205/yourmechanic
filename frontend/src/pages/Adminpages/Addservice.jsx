import React, { useState } from 'react';

const AddService = () => {
  const [serviceData, setServiceData] = useState({
    heading: '',
    name: '',
    description: '',
    cost: '',
    time: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setServiceData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Service Data:', serviceData);
    // Reset form data if needed
    setServiceData({
      heading: '',
      name: '',
      description: '',
      cost: '',
      time: '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto mt-8 bg-white p-4 max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Add Service</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={serviceData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={serviceData.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="cost" className="block text-sm font-medium text-gray-600">
            Cost
          </label>
          <input
            type="text"
            id="cost"
            name="cost"
            value={serviceData.cost}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block text-sm font-medium text-gray-600">
            Time
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={serviceData.time}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
