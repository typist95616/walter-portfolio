import React, { useEffect, useRef, useState } from "react";
import "./StandaloneImageSlider.scss";

interface StandaloneImageSliderProps {
  images: string[];
  direction?: "left" | "right";
  imageWidth: number;
  imageHeight: number;
  scaleValue?: number;
}

const StandaloneImageSlider: React.FC<StandaloneImageSliderProps> = ({ images, direction, imageHeight, imageWidth, scaleValue }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [zoomPos, setZoomPos] = useState<{ top: number, left: number } | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>, src: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomImg(src);
    setZoomPos({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    });
  };
  const handleMouseLeave = () => {
    setZoomImg(null);
    setZoomPos(null);
  };

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

  const onMouseLeave = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
      if (sliderRef.current && !isDragging && !zoomImg) {
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
  }, [isDragging, direction, zoomImg]);

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
          <div
            key={idx}
            style={{ position: "relative", display: "inline-block" }}
          >
            <img
              src={src}
              alt={`slider-img-${idx}`}
              style={{
                width: imageWidth,
                height: imageHeight,
                objectFit: "fill",
                display: "inline-block",
                marginRight: 10,
                userSelect: "none",
                pointerEvents: "auto",
                borderRadius: "20px"
              }}
              draggable={false}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseEnter={e => handleMouseEnter(e, src)}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        ))}
      </div>

      {/* Zoom modal beside hovered image, outside slider */}
      {zoomImg && zoomPos && (
        <div
          className="zoom-modal"
          style={{
            position: "absolute",
            top: zoomPos.top,
            left: zoomPos.left,
            zIndex: 9999,
            background: "rgba(0,0,0,0.7)",
            padding: 20,
            borderRadius: 20,
            transform: "translateY(-100%)",
          }}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={zoomImg}
            className="zoom-img"
            style={{
              width: 300,
              maxWidth: "80vw",
              height: "auto",
              borderRadius: 20,
              transform: `scale(${scaleValue || 1.4})`,
            }}
            alt="Zoomed"
          />
        </div>
      )}
    </div>
  );
};

export default StandaloneImageSlider;