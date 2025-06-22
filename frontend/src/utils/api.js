import axios from "axios";
export const handleBuyNow = async (product, token, navigate) => {
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    await axios.post(
      "/api/orders",
      {
        status: "completed",
        products: [{ id: product.id }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ukloni kupljeni proizvod iz korpe (ako postoji)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // obavesti druge komponente da se korpa promenila
    window.dispatchEvent(new CustomEvent("cartUpdated"));

    alert("Purchase successful! Product is now in your purchases.");
    navigate("/profile?purchases");
  } catch (error) {
    console.error("Error during purchase:", error);
    alert("There was an error processing your purchase.");
  }
};

export const handleCheckoutMultiple = async (products, token, navigate) => {
  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const formattedProducts = products.map((p) => ({ id: p.id }));

    await axios.post(
      "/api/orders",
      {
        status: "completed",
        products: formattedProducts,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("All products purchased successfully!");
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    navigate("/profile?purchases");
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("There was an error completing your order.");
  }
};
