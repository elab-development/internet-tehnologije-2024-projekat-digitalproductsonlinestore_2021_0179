import axios from "axios";
import OneCategory from "./OneCategory";
import { useState, useEffect } from "react";
import mockCategories from "../mockData/categories.json";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if(categories == null) {
        axios.get("api/categories").then((response) => {
        console.log(response);
        setCategories(response.data);
      });
    }
  }, [categories]);

  return (
    <div>
      <h1>Categories</h1>
      {categories == null ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        categories.map((category) => (
          <OneCategory key={category.id} category={category} />
        ))
      )}
    </div>
  );
};

export default CategoriesPage;
