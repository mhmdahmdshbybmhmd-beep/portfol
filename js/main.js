"use strict";

console.log("Welcome to the store");

const cart = [];

function addToCart(name, price, quantity = 1) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  alert(`تمت إضافة ${name} إلى السلة`);
  updateCartSummary();
}

function showCart() {
  console.log("السلة الحالية:", cart);
  return cart;
}

function updateCartSummary() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const countElement = document.querySelector("[data-cart-count]");
  if (countElement) {
    countElement.textContent = totalItems;
  }

  console.log(`عدد العناصر: ${totalItems} | الإجمالي: ${totalPrice} ريال`);
}

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");

  if (button) {
    button.addEventListener("click", () => {
      addToCart("Laptop", 25000, 1);
    });
  }

  updateCartSummary();
});