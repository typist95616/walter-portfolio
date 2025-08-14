import React, { useEffect, useRef, useState } from "react";
import "./StandaloneImageSlider.scss";

interface StandaloneImageSliderProps {
  images: string[];
  direction?: "left" | "right";
  imageWidth: number;
  imageHeight: number;
}

const StandaloneImageSlider: React.FC<StandaloneImageSliderProps> = ({ images, direction, imageHeight, imageWidth }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Clone images for infinite scroll
  const extendedImages = [...images, ...images, ...images, ...images, ...images];
  const originalLength = images.length;
  const startIndex = images.length * 2;

  React.useEffect(() => {
    if (sliderRef.current) {
      // Scroll to the start of the middle set
      sliderRef.current.scrollLeft = imageWidth! * startIndex;
    }
  }, [imageWidth, startIndex]);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Infinite scroll effect
  const onScroll = () => {
    if (!sliderRef.current) return;
    const totalImages = extendedImages.length;
    const totalWidth = imageWidth * totalImages;
    const leftEdge = imageWidth * (originalLength - 1);
    const rightEdge = imageWidth * (originalLength * 3);
    // When scrolling left past the first image of the middle set
    if (sliderRef.current.scrollLeft <= leftEdge) {
      sliderRef.current.scrollLeft =
        imageWidth * (originalLength + (sliderRef.current.scrollLeft / imageWidth));
    } else if (sliderRef.current.scrollLeft >= rightEdge) {
      sliderRef.current.scrollLeft =
        imageWidth * (originalLength + (sliderRef.current.scrollLeft / imageWidth - originalLength * 2));
    }
  };

  // 自動慢慢向左移動圖片
  useEffect(() => {
    let animationFrame: number;
    function autoScroll() {
      if (sliderRef.current && !isDragging) {
        if (direction === "left") {
          sliderRef.current.scrollLeft += 0.5; // 調整數字可以改變速度
        } else {
          sliderRef.current.scrollLeft -= 0.5; // 調整數字可以改變速度
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    }
    animationFrame = requestAnimationFrame(autoScroll);
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isDragging, direction]);

  return (
    <div
      ref={sliderRef}
      style={{
        overflow: "auto",
        whiteSpace: "nowrap",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        width: "100%",
        border: "none",
        padding: "10px 0",
        boxSizing: "border-box",
        borderRadius: "20px",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
      className="hide-scrollbar"
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onScroll={onScroll}
    >
      <div style={{ display: "inline-block", margin: "0 40px" }}>
        {extendedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slider-img-${idx}`}
            style={{
              width: imageWidth,
              height: imageHeight,
              objectFit: "cover",
              display: "inline-block",
              marginRight: 8,
              userSelect: "none",
              pointerEvents: "auto",
              borderRadius: "20px"
            }}
            draggable={false}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default StandaloneImageSlider;