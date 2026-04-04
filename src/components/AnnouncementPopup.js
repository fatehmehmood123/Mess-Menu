import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// ─── Animations ─────────────────────────────────────────────────────────────

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;



const glow = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(76, 145, 65, 0.2); }
  50%      { box-shadow: 0 0 30px rgba(76, 145, 65, 0.45); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
`;

// ─── Styled Components ─────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease;
  padding: 16px;
`;

const Card = styled.div`
  position: relative;
  background: linear-gradient(145deg, #f0f7ec, #ffffff, #f0f7ec);
  border: 2px solid #4c9141;
  border-radius: 16px;
  padding: 36px 28px 28px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: ${slideUp} 0.45s ease-out, ${glow} 3s ease-in-out infinite;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 28px 18px 22px;
    width: 94%;
  }
`;



const ImageWrapper = styled.div`
  margin-bottom: 16px;
`;

const MoonImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(200, 160, 60, 0.35));

  @media (max-width: 480px) {
    width: 110px;
    height: 110px;
  }
`;

const Title = styled.h2`
  color: #3a7d32;
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 6px;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.p`
  color: #5a5a5a;
  font-size: 15px;
  line-height: 1.5;
  margin: 0 0 24px;

  @media (max-width: 480px) {
    font-size: 13px;
    margin-bottom: 18px;
  }
`;

const CloseBtn = styled.button`
  background: linear-gradient(135deg, #4c9141, #3a7d32);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 36px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

// ─── Component ──────────────────────────────────────────────────────────────

const STORAGE_KEY = "ramzanPopupDismissed2026";

const AnnouncementPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show once per session; reset each day
    const dismissed = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();
    if (dismissed !== today) {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
    setShow(false);
  };

  if (!show) return null;

  return (
    <Overlay onClick={dismiss}>
      <Card onClick={(e) => e.stopPropagation()}>



        <ImageWrapper>
          <MoonImage src="/10965779.png" alt="Ramzan Mubarak" />
        </ImageWrapper>

        <Title>Ramzan Mubarak!</Title>
        <Subtitle>
          Wishing you a blessed Ramzan.
          <br />
          May this holy month bring you closer to Allah SWT.
        </Subtitle>

        <CloseBtn onClick={dismiss}>JazakAllah</CloseBtn>
      </Card>
    </Overlay>
  );
};

export default AnnouncementPopup;
