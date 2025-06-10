import React from "react";

const OneProduct = ( {product}) => {
  return (
    <div className="card">
      <div className="card-header">{product.category.name}</div>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">
          {product.description}
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
      <div className="card-footer text-muted">{product.price}</div>
    </div>
  );
};

export default OneProduct;
