"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RelatedProductsSlider({ products }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 3, spacing: 15 },
    breakpoints: {
      "(max-width: 768px)": { slides: { perView: 1 } },
      "(max-width: 1024px)": { slides: { perView: 2 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created(slider) {
      slider.container.classList.add("keen-slider-fade");
    },
  });

  const autoplayRef = useRef();
  const isPaused = useRef(false);

  useEffect(() => {
    if (!instanceRef.current) return;

    autoplayRef.current = setInterval(() => {
      if (!isPaused.current) {
        instanceRef.current?.next();
      }
    }, 3000);

    return () => clearInterval(autoplayRef.current);
  }, [instanceRef]);

  return (
    <div
      className="relative"
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      {/* أزرار التنقل */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow z-10"
      >
        ←
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow z-10"
      >
        →
      </button>

      {/* السلايدر */}
      <div
        ref={sliderRef}
        className="keen-slider transition-all duration-500 ease-in-out"
      >
        {products.map((item, idx) => (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className={`keen-slider__slide bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden transform ${
              currentSlide === idx ? "scale-105" : "scale-100 opacity-70"
            }`}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-contain bg-gray-50 transition-transform duration-500"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-green-600 font-medium">
                {item.price.toLocaleString()} ل.س
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
