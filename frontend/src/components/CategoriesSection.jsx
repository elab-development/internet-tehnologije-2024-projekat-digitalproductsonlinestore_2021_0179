import React, { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import axios from "axios"; // Dodaj ovo
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Dinamički niz
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.email === "admin@gmail.com";

  // ➤ Fetch kategorija sa backend API-ja
  useEffect(() => {
    axios
      .get("api/categories")
      .then((response) => {
        setCategories(response.data.category); // ako je ovo ime ključa u API-u
      })
      .catch((error) => {
        console.error("Greška prilikom dohvatanja kategorija:", error);
      });
  }, []);

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
    if (isAdmin) {
      navigate(`/admin/products?category_id=${id}`);
    }else{
      navigate(`/products?category_id=${id}`);
    }
  };

  return (
    <section className="glass-categories">
      <div className="glass-scroll-wrapper">
        {canScrollLeft && (
          <button
            className="glass-scroll-btn left"
            onClick={() => scrollByOffset(-300)}
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div className="glass-scroll" ref={scrollRef}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="glass-card"
              style={{
                backgroundColor: getCategoryColor(cat.name),
              }}
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
            <button
              className="glass-scroll-btn right"
              onClick={() => scrollByOffset(300)}
            >
              <ChevronRight size={28} />
            </button>
            <div className="glass-fade-right"></div>
          </>
        )}
      </div>
    </section>
  );
};

// ➤ Pomoćna funkcija za boju po imenu kategorije
const getCategoryColor = (name) => {
  const colorMap = {
    "Audio books": "rgb(222, 225, 38)",
    "Audio Files": "rgba(33, 158, 188, 1)",
    "Video Content": "rgba(251, 133, 0, 1)",
    "Digital Art": "rgba(142, 202, 230, 1)",
    Templates: "rgba(255, 183, 3, 1)",
    Fonts: "rgb(29, 130, 180)",
    "Web Assets": "rgba(104, 104, 236, 0.8)",
  };

  return colorMap[name] || "#999";
};

export default CategoriesSection;
