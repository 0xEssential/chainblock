import React, { useState, useEffect } from "react";

type ImageRefetcherProps = {
  baseUrl: string; // The base URL for the image
};

const DynamicOffchain: React.FC<ImageRefetcherProps> = ({ baseUrl }) => {
  // Function to get the full URL including the cache-busting query param
  const getFullImageUrl = (base: string): string => {
    return `${base}&_=${Date.now()}`;
  };

  // Initialize state with the current image URL
  const [imageUrl, setImageUrl] = useState<string>(getFullImageUrl(baseUrl));

  // Function to preload and update image
  const preloadAndUpdateImage = () => {
    const newImageUrl = getFullImageUrl(baseUrl);

    const imageLoader = new Image();
    imageLoader.src = newImageUrl;
    imageLoader.onload = () => {
      setImageUrl(newImageUrl); // Update state with the new URL once it's loaded
    };
  };

  useEffect(() => {
    // Preload the image when the component mounts
    preloadAndUpdateImage();

    // Set up the interval to refetch the image every minute
    const intervalId = setInterval(() => {
      preloadAndUpdateImage();
    }, 5_000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [baseUrl]); // Depend on baseUrl to rerun effect if it changes

  // JSX for rendering the image within the panel container
  return (
    <div className="panel">
      <img
        width="100%"
        height="100%"
        src={imageUrl}
        alt="Dynamic content" // Consider adding meaningful alt text here
      />
    </div>
  );
};

export default DynamicOffchain;
