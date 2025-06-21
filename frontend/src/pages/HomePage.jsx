
import "../styles/HomePage.css";
import CategoriesSection from "../components/CategoriesSection";
import WhyChooseSection from "../components/WhyChooseSection";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <CategoriesSection />
      <WhyChooseSection />
      <Footer />
    </div>
  );
};

export default HomePage;
