import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/products';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(data => setProducts(data))
      .catch(err => console.error("Greška pri dohvatanju proizvoda:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Učitavanje...</p>;

  return (
    <div>
      <h2>Proizvodi</h2>
      {products.length === 0 ? (
        <p>Nema dostupnih proizvoda.</p>
      ) : (
        products.map(product => (
          <div key={product.id}>
            <h4>{product.title}</h4>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
