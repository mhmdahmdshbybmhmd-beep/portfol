document.addEventListener("DOMContentLoaded", () => {
  const cartItems = [
    { name: "لابتوب", price: 25000, quantity: 1 },
    { name: "هاتف ذكي", price: 9999, quantity: 1 }
  ];

  const cartList = document.querySelector(".cart-items");
  const summary = document.querySelector(".cart-summary p");

  function renderCart() {
    if (!cartList) return;

    cartList.innerHTML = "";

    let total = 0;

    cartItems.forEach((item) => {
      total += item.price * item.quantity;

      const itemCard = document.createElement("div");
      itemCard.className = "product-card cart-item";
      itemCard.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p>${item.quantity} x ${item.price.toLocaleString()} ريال</p>
        </div>
        <button type="button" class="add-btn" data-name="${item.name}">حذف</button>
      `;
      cartList.appendChild(itemCard);
    });

    if (summary) {
      summary.textContent = `الإجمالي: ${total.toLocaleString()} ريال`;
    }
  }

  cartList?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-name]");
    if (!button) return;

    const name = button.getAttribute("data-name");
    const index = cartItems.findIndex((item) => item.name === name);

    if (index >= 0) {
      cartItems.splice(index, 1);
      renderCart();
    }
  });

  renderCart();
});
