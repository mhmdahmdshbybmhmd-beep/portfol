document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".checkout-form");
  const summary = document.querySelector(".cart-summary");
  const cardFields = document.getElementById("card-fields");
  const vodafoneFields = document.getElementById("vodafone-fields");

  if (!form) return;

  const togglePaymentFields = () => {
    const selectedMethod = form.querySelector('input[name="paymentMethod"]:checked')?.value || "card";
    cardFields?.classList.toggle("hidden", selectedMethod !== "card");
    vodafoneFields?.classList.toggle("hidden", selectedMethod !== "vodafone");
  };

  form.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener("change", togglePaymentFields);
  });

  togglePaymentFields();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const generalInputs = form.querySelectorAll('input[name="fullName"], input[name="email"], input[name="address"], textarea');
    let isValid = true;

    generalInputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ef4444";
      } else {
        input.style.borderColor = "#d1d5db";
      }
    });

    const selectedMethod = form.querySelector('input[name="paymentMethod"]:checked')?.value || "card";

    if (selectedMethod === "card") {
      const cardFieldsToCheck = [
        form.querySelector('input[name="cardName"]'),
        form.querySelector('input[name="cardNumber"]'),
        form.querySelector('input[name="expiry"]'),
        form.querySelector('input[name="cvv"]')
      ];

      cardFieldsToCheck.forEach((input) => {
        if (!input?.value.trim()) {
          isValid = false;
          input.style.borderColor = "#ef4444";
        } else {
          input.style.borderColor = "#d1d5db";
        }
      });
    } else {
      const vodafonePhone = form.querySelector('input[name="vodafonePhone"]');
      if (!vodafonePhone?.value.trim()) {
        isValid = false;
        vodafonePhone.style.borderColor = "#ef4444";
      } else {
        vodafonePhone.style.borderColor = "#d1d5db";
      }
    }

    if (!isValid) {
      alert("يرجى ملء جميع الحقول المطلوبة قبل تأكيد الشراء");
      return;
    }

    if (summary) {
      const existingMessage = summary.querySelector(".success-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      const message = document.createElement("p");
      message.className = "success-message";
      message.textContent = `تم تأكيد الطلب بنجاح! سيتم الدفع عبر ${selectedMethod === "card" ? "البطاقة البنكية" : "فودافون كاش"} قريبًا.`;
      message.style.color = "#16a34a";
      message.style.fontWeight = "700";
      message.style.marginTop = "12px";
      summary.appendChild(message);
    }

    form.reset();
    togglePaymentFields();
  });
});
