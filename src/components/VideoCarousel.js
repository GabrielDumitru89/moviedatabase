import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { videosData } from "../slices/appSlices";

const VideoCarousel = ({ videoId }) => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch video details (you can customize this logic based on your needs)
    dispatch(videosData(`/video/${videoId}`));
  }, [dispatch, videoId]);

  useEffect(() => {
    if (videoRef.current) {
      // Play video after the video details are fetched
      videoRef.current.play().then(() => {
        // Pause video after 5 seconds
        setTimeout(() => {
          videoRef.current.pause();
        }, 5000);
      });
    }
  }, [videoRef, videoId]);

  return (
    <div className="carousel-video-wrapper">
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        controls
        autoPlay
        loop
        muted
      >
        <source src={`https://www.youtube.com/embed/${videoId}`} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoCarousel;