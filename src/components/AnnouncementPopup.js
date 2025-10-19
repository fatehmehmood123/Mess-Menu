import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
  padding: 10px;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PopupContainer = styled.div`
  background-color: #ffffff;
  border: 2px solid #535151;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
  position: relative;

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 25px 15px;
    width: 92%;
    max-height: 85vh;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
    width: 95%;
    max-height: 80vh;
    border-width: 1px;
  }
`;

const PopupHeader = styled.h2`
  color: #535151;
  margin: 0 0 15px 0;
  font-size: 24px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const PopupMessage = styled.p`
  color: #535151;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
    margin-bottom: 12px;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 5px;

  @media (max-width: 480px) {
    margin: 15px 0;
    gap: 3px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 2px solid #535151;

  @media (max-width: 768px) {
    height: 250px;
    max-width: 450px;
  }

  @media (max-width: 480px) {
    height: 180px;
    border-width: 1px;
  }

  @media (max-width: 360px) {
    height: 150px;
  }
`;

const CarouselImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  -webkit-filter: none !important;
  filter: none !important;
`;

const ArrowButton = styled.button`
  position: absolute;
  ${(props) => (props.direction === "left" ? "left: 0;" : "right: 0;")}
  background-color: #535151;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  flex-shrink: 0;

  &:hover {
    background-color: #3a3939;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }

  @media (max-width: 360px) {
    width: 26px;
    height: 26px;
    font-size: 14px;
  }
`;

const ImageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 15px 0;

  @media (max-width: 480px) {
    gap: 6px;
    margin: 12px 0;
  }
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${(props) => (props.active ? "#535151" : "#979ea1")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #535151;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 15px;
  }
`;

const Button = styled.button`
  background-color: #535151;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3a3939;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 11px 26px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px 22px;
    font-size: 14px;
  }

  @media (max-width: 360px) {
    padding: 9px 18px;
    font-size: 13px;
  }
`;

const AnnouncementPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      src: "/images/feedback-icon.png",
      alt: "Feedback Icon",
    },
    {
      src: "/images/feedback-form.png",
      alt: "Feedback Form",
    },
  ];

  useEffect(() => {
    const popupDismissed = localStorage.getItem("announcementDismissed");
    const currentDate = new Date();
    const endDate = new Date("2025-11-08T23:59:59"); // Show until November 8, 2025

    // If current date is past November 8, 2025, don't show popup
    if (currentDate > endDate) {
      setShowPopup(false);
      return;
    }

    // If user hasn't dismissed it yet, show the popup
    if (!popupDismissed) {
      setShowPopup(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("announcementDismissed", "true");
    localStorage.setItem("announcementDismissedDate", Date.now().toString());
    setShowPopup(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!showPopup) return null;

  return (
    <PopupOverlay>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupHeader>You can now report menu mismatches!</PopupHeader>
        <PopupMessage>
          If the meal you received doesn't match what's shown on the menu, use
          the feedback icon at the bottom left to let us know.
        </PopupMessage>
        <CarouselContainer>
          <ArrowButton direction="left" onClick={prevImage}>
            ←
          </ArrowButton>
          <ImageContainer>
            <CarouselImage
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
            />
          </ImageContainer>
          <ArrowButton direction="right" onClick={nextImage}>
            →
          </ArrowButton>
        </CarouselContainer>
        <ImageIndicator>
          {images.map((_, index) => (
            <Dot
              key={index}
              active={index === currentImageIndex}
              onClick={() => goToImage(index)}
            />
          ))}
        </ImageIndicator>
        <ButtonContainer>
          <Button onClick={handleDismiss}>Got it!</Button>
        </ButtonContainer>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default AnnouncementPopup;
