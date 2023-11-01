import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

function AdImages({ adId }) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Replace 'your-backend-url' with the actual URL of your Spring Boot backend
    fetch(`http://localhost:8080/auth/getAdsImages/${adId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setImageUrls(data.split(",")); // Assuming the images are comma-separated in the response
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [adId]);

  return (
    <div>
      {imageUrls.map((imageUrl, index) => (
        // <img key={index} src={imageUrl} alt={`Image ${index}`} />
        <Image src={imageUrl} fluid alt="Item" style={{ maxHeight: "10em" }} />
      ))}
    </div>
  );
}

export default AdImages;
