/* =========================================================
   form-validation.js
   Purpose:
   - Frontend validation for Contact & Feedback forms
   - Error handling and success messages
   - Secure, modern ES6
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();

      let valid = true;

      // Clear previous messages
      form.querySelectorAll(".form-error").forEach(el => el.remove());

      // Required fields
      form.querySelectorAll("[required]").forEach(field => {
        if (!field.value.trim()) {
          showError(field, "This field is required");
          valid = false;
        }
      });

      // Email validation
      const emailFields = form.querySelectorAll("input[type='email']");
      emailFields.forEach(email => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !regex.test(email.value)) {
          showError(email, "Invalid email address");
          valid = false;
        }
      });

      // Phone validation
      const phoneFields = form.querySelectorAll("input[type='tel']");
      phoneFields.forEach(phone => {
        const regex = /^[0-9+\-\s]{7,15}$/;
        if (phone.value && !regex.test(phone.value)) {
          showError(phone, "Invalid phone number");
          valid = false;
        }
      });

      if (valid) {
        showSuccess(form, "Form submitted successfully!");
        form.reset();
      }
    });
  });

  function showError(field, message) {
    const error = document.createElement("div");
    error.className = "form-error";
    error.textContent = message;
    field.insertAdjacentElement("afterend", error);
  }

  function showSuccess(form, message) {
    let success = form.querySelector(".form-success");
    if (!success) {
      success = document.createElement("div");
      success.className = "form-success";
      form.prepend(success);
    }
    success.textContent = message;
  }
});
