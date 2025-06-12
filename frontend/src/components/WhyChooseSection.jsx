import React from "react";
import {
  PackageCheck,
  Users,
  Handshake,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import "../styles/HomePage.css";

const stats = [
  {
    icon: <PackageCheck size={40} />,
    number: "1000+",
    label: "Digital Products",
  },
  {
    icon: <Users size={40} />,
    number: "5000+",
    label: "Happy Customers",
  },
  {
    icon: <Handshake size={40} />,
    number: "50+",
    label: "Partners",
  },
  {
    icon: <CreditCard size={40} />,
    number: "Trusted",
    label: "Payments",
  },
  {
    icon: <ShieldCheck size={40} />,
    number: "Secure",
    label: "Access",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="why-choose-section">
      <div className="container text-center text-white py-5">
        <h2 className="section-title mb-4">Why Choose Lootify?</h2>
        <p className="section-subtitle mb-5">
          Trusted by thousands of users and creators around the world
        </p>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4 justify-content-center">
          {stats.map((item, idx) => (
            <div className="col-md-3 col-8 mb-4" key={idx}>
              <div className="stat-card">
                <div className="icon mb-3">{item.icon}</div>
                <h3 className="stat-number">{item.number}</h3>
                <p className="stat-label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
