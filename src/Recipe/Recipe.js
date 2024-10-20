import React, { useState } from "react";
import "./Filter.css"; // For custom styling

const Filter = () => {
  const [image, setImage] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filterValues, setFilterValues] = useState({
    brightness: 100,
    contrast: 100,
    hue: 0,
    grayscale: 0,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file); // Check if the file is being captured
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setFilterValues((prevValues) => ({
      ...prevValues,
      [selectedFilter]: value,
    }));
  };

  const filterStyle = {
    filter: `
      brightness(${filterValues.brightness}%)
      contrast(${filterValues.contrast}%)
      hue-rotate(${filterValues.hue}deg)
      grayscale(${filterValues.grayscale}%)
    `,
  };

  return (
    <div className="image-filter-app">
      <div className="left-side">
        <h1>FilterFusion</h1>

        {/* Custom File Upload */}
        <label className="file-label">
          Choose File
          <input type="file" accept="image/*" className="custom-file-input" onChange={handleImageUpload} />
        </label>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button className="filter-button brightness" onClick={() => setSelectedFilter("brightness")}>
            Brightness
          </button>
          <button className="filter-button contrast" onClick={() => setSelectedFilter("contrast")}>
            Contrast
          </button>
          <button className="filter-button hue" onClick={() => setSelectedFilter("hue")}>
            Hue
          </button>
          <button className="filter-button grayscale" onClick={() => setSelectedFilter("grayscale")}>
            Grayscale
          </button>
        </div>

        {/* Display Slider for Selected Filter */}
        {selectedFilter && (
          <div className="slider-container">
            <label>
              Adjust {selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)}:
            </label>
            <input
              type="range"
              min={selectedFilter === "hue" ? "0" : "0"}
              max={selectedFilter === "hue" ? "360" : "100"}
              value={filterValues[selectedFilter]}
              onChange={handleSliderChange}
            />
          </div>
        )}
      </div>

      {/* Display Image on the Right Side */}
      <div className="right-side">
        {image && (
          <div className="image-container">
            <img
              src={image}
              alt="Uploaded"
              style={{
                ...filterStyle,
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
