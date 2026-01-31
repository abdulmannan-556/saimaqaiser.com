/* =========================================================
   form-validation.js
   Purpose:
   - Client-side validation for forms
   - Contact & Feedback pages
   - Prevent empty or malformed submissions
   - Static-site safe (no backend)
   ========================================================= */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form[data-validate]");

    if (!forms.length) return;

    forms.forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;
        const fields = form.querySelectorAll("[required]");

        fields.forEach(function (field) {
          field.classList.remove("field-error");

          if (!field.value.trim()) {
            isValid = false;
            field.classList.add("field-error");
          }

          if (field.type === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value.trim())) {
              isValid = false;
              field.classList.add("field-error");
            }
          }
        });

        if (!isValid) {
          alert("Please fill in all required fields correctly.");
          const firstError = form.querySelector(".field-error");
          if (firstError) firstError.focus();
          return;
        }

        /* =========================================================
           SUCCESS (STATIC SITE)
           ========================================================= */

        alert("Thank you. Your submission has been received.");
        form.reset();
      });
    });
  });
})();
