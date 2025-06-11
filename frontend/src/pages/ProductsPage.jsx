import OneProduct from "../components/OneProduct";
import axios from "axios";
import { useState, useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    if (products == null) {
      axios.get("api/products").then((response) => {
        console.log(response);
        setProducts(response.data.products);
      });
    }
  }, [products]);

  return (
    <div>
      <h3>Products Page</h3>
      {products == null ? (
        <></>
      ) : (
        products.map((product) => <OneProduct product={product} key={product.id} />)
      )}
    </div>
  );
};

export default ProductsPage;
