document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-btn");
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const addToCart = (name, price) => {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`تمت إضافة ${name} إلى السلة`);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const name = card?.querySelector("h3")?.textContent || "منتج";
      const priceText = card?.querySelector("span")?.textContent || "0";
      const price = Number(priceText.replace(/[^0-9]/g, ""));
      addToCart(name, price);
    });
  });
});
