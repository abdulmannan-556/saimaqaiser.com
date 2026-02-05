/* =========================================================
   form-validation.js
   Project: saimaqaiser.com
   Purpose:
   - Client-side form validation
   - Accessible error handling
   - Spam prevention (honeypot)
   - No external dependencies
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function $all(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }

  function showError(input, message) {
    const field = input.closest(".form-group") || input.parentElement;
    if (!field) return;

    let error = field.querySelector(".form-error");

    if (!error) {
      error = document.createElement("div");
      error.className = "form-error";
      error.setAttribute("role", "alert");
      field.appendChild(error);
    }

    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  }

  function clearError(input) {
    const field = input.closest(".form-group") || input.parentElement;
    if (!field) return;

    const error = field.querySelector(".form-error");
    if (error) error.remove();

    input.removeAttribute("aria-invalid");
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isEmpty(value) {
    return !value || value.trim() === "";
  }

  /* ---------------------------------------------------------
     VALIDATION RULES
  --------------------------------------------------------- */
  function validateField(input) {
    const value = input.value;
    const required = input.hasAttribute("required");
    const type = input.getAttribute("type");

    clearError(input);

    if (required && isEmpty(value)) {
      showError(input, "This field is required.");
      return false;
    }

    if (type === "email" && !isEmpty(value) && !isEmail(value)) {
      showError(input, "Please enter a valid email address.");
      return false;
    }

    if (input.hasAttribute("minlength")) {
      const min = parseInt(input.getAttribute("minlength"), 10);
      if (value.length < min) {
        showError(
          input,
          `Please enter at least ${min} characters.`
        );
        return false;
      }
    }

    return true;
  }

  /* ---------------------------------------------------------
     FORM HANDLER
  --------------------------------------------------------- */
  function initForm(form) {
    const inputs = $all("input, textarea, select", form);
    const honeypot = form.querySelector('input[name="company"]');

    // Honeypot must stay empty
    if (honeypot) {
      honeypot.style.display = "none";
      honeypot.setAttribute("aria-hidden", "true");
      honeypot.tabIndex = -1;
    }

    inputs.forEach(function (input) {
      input.addEventListener("blur", function () {
        validateField(input);
      });

      input.addEventListener("input", function () {
        clearError(input);
      });
    });

    form.addEventListener("submit", function (e) {
      let isValid = true;

      // Spam detected
      if (honeypot && honeypot.value.trim() !== "") {
        e.preventDefault();
        return false;
      }

      inputs.forEach(function (input) {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
        const firstError = form.querySelector(
          '[aria-invalid="true"]'
        );
        if (firstError) {
          firstError.focus();
        }
      }
    });
  }

  /* ---------------------------------------------------------
     INIT ALL FORMS
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form[data-validate]");
    forms.forEach(initForm);
  });
})();
