document.addEventListener("DOMContentLoaded", function () {
  /* ---------------------------
     Utility Functions
  ----------------------------*/

  function showError(input, message) {
    const error = input.nextElementSibling;
    input.classList.add("invalid");
    input.classList.remove("valid");
    error.textContent = message;
  }

  function showSuccess(input) {
    const error = input.nextElementSibling;
    input.classList.remove("invalid");
    input.classList.add("valid");
    error.textContent = "";
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /* ---------------------------
     LOGIN VALIDATION
  ----------------------------*/

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail");
      const password = document.getElementById("loginPassword");
      let isValid = true;

      if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email.");
        isValid = false;
      } else {
        showSuccess(email);
      }

      if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        isValid = false;
      } else {
        showSuccess(password);
      }

      if (isValid) {
        alert("Login successful!");
        window.location.href = "profile.html";
      }
    });
  }

  /* ---------------------------
     SIGNUP VALIDATION
  ----------------------------*/

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("fullName");
      const email = document.getElementById("signupEmail");
      const password = document.getElementById("signupPassword");
      const confirm = document.getElementById("confirmPassword");

      let isValid = true;

      if (name.value.trim().length < 3) {
        showError(name, "Full name must be at least 3 characters.");
        isValid = false;
      } else {
        showSuccess(name);
      }

      if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email address.");
        isValid = false;
      } else {
        showSuccess(email);
      }

      if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        isValid = false;
      } else {
        showSuccess(password);
      }

      if (confirm.value !== password.value || confirm.value === "") {
        showError(confirm, "Passwords do not match.");
        isValid = false;
      } else {
        showSuccess(confirm);
      }

      if (isValid) {
        alert("Account created successfully!");
        window.location.href = "login.html";
      }
    });
  }

  /* ---------------------------
     SETTINGS VALIDATION
  ----------------------------*/

  const settingsForm = document.getElementById("settingsForm");

  if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("settingsEmail");
      const address = document.getElementById("settingsAddress");
      const password = document.getElementById("settingsPassword");

      let isValid = true;

      if (email.value && !validateEmail(email.value)) {
        showError(email, "Enter a valid email.");
        isValid = false;
      } else if (email.value) {
        showSuccess(email);
      }

      if (address.value.trim().length < 5) {
        showError(address, "Address must be at least 5 characters.");
        isValid = false;
      } else {
        showSuccess(address);
      }

      if (password.value && password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        isValid = false;
      } else if (password.value) {
        showSuccess(password);
      }

      if (isValid) {
        alert("Settings updated successfully!");
      }
    });
  }

  /* ---------------------------
     NEWSLETTER VALIDATION
  ----------------------------*/

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("newsletterEmail");

      if (!validateEmail(email.value)) {
        alert("Please enter a valid email.");
      } else {
        alert("Subscribed successfully!");
        email.value = "";
      }
    });
  }
});
