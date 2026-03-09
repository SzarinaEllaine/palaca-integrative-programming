/* ---------------------------
   ADMIN ACCESS VALIDATION
----------------------------*/

// Simulated logged-in user object (replace with real session/server data)
const currentUser = {
  username: "szarinagwapa",
  role: "admin", // "admin" or "user"
  loggedIn: true,
};

// Protect admin pages
function protectAdminPage() {
  const adminPages = ["admin.html", "manage-users.html"]; // add other admin pages here
  const currentPage = window.location.pathname.split("/").pop();

  if (adminPages.includes(currentPage)) {
    if (!currentUser.loggedIn || currentUser.role !== "admin") {
      alert("Access denied! Admins only.");
      window.location.href = "login.html"; // redirect non-admins
    }
  }
}

// Call admin protection immediately
protectAdminPage();

/* ---------------------------
   DOM CONTENT LOADED
----------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  function showError(input, message) {
    const error = input.nextElementSibling;
    input.classList.remove("valid");
    input.classList.add("invalid");
    if (error) error.textContent = message;
  }

  function showSuccess(input) {
    const error = input.nextElementSibling;
    input.classList.remove("invalid");
    input.classList.add("valid");
    if (error) error.textContent = "";
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  /* ---------------------------
     LOGIN FORM
  ----------------------------*/

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail");
      const password = document.getElementById("loginPassword");

      let valid = true;

      if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email.");
        valid = false;
      } else {
        showSuccess(email);
      }

      if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        valid = false;
      } else {
        showSuccess(password);
      }

      if (valid) {
        // Update currentUser object after login (replace with real server logic)
        currentUser.loggedIn = true;
        // For demo: assign role based on email (in real app, get from server)
        currentUser.role = email.value === "admin@email.com" ? "admin" : "user";

        // Redirect based on role
        if (currentUser.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "profile.html";
        }
      }
    });
  }

  /* ---------------------------
     SIGNUP FORM
  ----------------------------*/

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("fullName");
      const email = document.getElementById("signupEmail");
      const password = document.getElementById("signupPassword");
      const confirm = document.getElementById("confirmPassword");

      let valid = true;

      if (name.value.trim().length < 3) {
        showError(name, "Name must be at least 3 characters.");
        valid = false;
      } else {
        showSuccess(name);
      }

      if (!validateEmail(email.value)) {
        showError(email, "Enter a valid email.");
        valid = false;
      } else {
        showSuccess(email);
      }

      if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        valid = false;
      } else {
        showSuccess(password);
      }

      if (confirm.value !== password.value || confirm.value === "") {
        showError(confirm, "Passwords do not match.");
        valid = false;
      } else {
        showSuccess(confirm);
      }

      if (valid) {
        alert("Account created successfully!");
        window.location.href = "login.html";
      }
    });
  }

  /* ---------------------------
     SETTINGS FORM
  ----------------------------*/

  const settingsForm = document.getElementById("settingsForm");

  if (settingsForm) {
    settingsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("settingsEmail");
      const address = document.getElementById("settingsAddress");
      const password = document.getElementById("settingsPassword");

      let valid = true;

      if (email.value !== "" && !validateEmail(email.value)) {
        showError(email, "Enter a valid email.");
        valid = false;
      } else if (email.value !== "") {
        showSuccess(email);
      }

      if (address.value.trim().length < 5) {
        showError(address, "Address must be at least 5 characters.");
        valid = false;
      } else {
        showSuccess(address);
      }

      if (password.value !== "" && password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.");
        valid = false;
      } else if (password.value !== "") {
        showSuccess(password);
      }

      if (valid) {
        alert("Settings updated successfully!");
      }
    });
  }

  /* ---------------------------
     NEWSLETTER FORM
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

/* ---------------------------
   ADMIN - ADD USER FORM
----------------------------*/

const addUserForm = document.getElementById("addUserForm");

if (addUserForm) {
  addUserForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    const role = document.getElementById("userRole");

    let valid = true;

    /* Name Validation */
    if (name.value.trim().length < 3) {
      showError(name, "Name must be at least 3 characters.");
      valid = false;
    } else {
      showSuccess(name);
    }

    /* Email Validation */
    if (!validateEmail(email.value)) {
      showError(email, "Enter a valid email.");
      valid = false;
    } else {
      showSuccess(email);
    }

    /* Role Validation */
    if (role.value === "") {
      alert("Please select a role.");
      valid = false;
    }

    /* If valid, add user to table */
    if (valid) {
      const table = document.getElementById("userTable");

      const newRow = table.insertRow();

      newRow.innerHTML = `
        <td>${table.rows.length}</td>
        <td>${name.value}</td>
        <td>${email.value}</td>
        <td>${role.value}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
      `;

      alert("User added successfully!");

      addUserForm.reset();
    }
  });
}

/* ---------------------------
   DELETE USER
----------------------------*/

function deleteRow(button) {
  const row = button.parentNode.parentNode;
  row.remove();
}
