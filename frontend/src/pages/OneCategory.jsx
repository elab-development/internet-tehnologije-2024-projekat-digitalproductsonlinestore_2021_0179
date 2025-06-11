import React from "react";
import { Link } from "react-router-dom";

const OneCategory = ({category}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{category.title}</h5>
        
        <Link to={`/categories/${category.id}/products`} className="card-link">
          Products
        </Link>
      </div>
    </div>
  );
};

export default OneCategory;
