import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = [
    { id: 1, name: "E-books", color: "rgba(255, 183, 3, 1)" },
    { id: 2, name: "Audio", color: "rgba(33, 158, 188, 1)" },
    { id: 3, name: "Video", color: "rgba(251, 133, 0, 1)" },
    { id: 4, name: "Digital Art", color: "rgba(142, 202, 230, 1)" },
    { id: 5, name: "Templates", color: "rgba(255, 183, 3, 1)" },
    { id: 6, name: "Fonts", color: "rgba(2, 48, 71, 1)" },
  ];

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollLeft - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollByOffset = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleCardClick = (id) => {
    navigate(`/products?category_id=${id}`);
  };

  return (
    <section className="glass-categories">
      <div className="glass-scroll-wrapper">
        {canScrollLeft && (
          <button className="glass-scroll-btn left" onClick={() => scrollByOffset(-300)}>
            <ChevronLeft size={28} />
          </button>
        )}

        <div className="glass-scroll" ref={scrollRef}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass-card"
              style={{ backgroundColor: cat.color }}
              onClick={() => handleCardClick(cat.id)}
            >
              <div className="glass-inner">
                <h2>{cat.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <>
            <button className="glass-scroll-btn right" onClick={() => scrollByOffset(300)}>
              <ChevronRight size={28} />
            </button>
            <div className="glass-fade-right"></div>
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
