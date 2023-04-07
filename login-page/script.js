"use strict";

///////////////////////////////////////////////////
//Selectors

const register = document.querySelector("#register-box");
const login = document.querySelector("#login-box");

const newAccountButton = document.querySelector("#newAccBtn");
const closeRegButton = document.querySelector("#close-reg");
const registerButton = document.querySelector("#register-button");
const loginButton = document.querySelector("#login-button");

const loginEmail = document.querySelector("#email-login");
const loginPassword = document.querySelector("#password-login");

const regUsername = document.querySelector("#username");
const regEmail = document.querySelector("#email-reg");
const regPassword = document.querySelector("#new-password");
const regConfirmPassword = document.querySelector("#confirm-password");

const passShow = document.querySelector(".show-pass");
const passHide = document.querySelector(".hide-pass");
const passShowReg = document.querySelector(".show-pass-reg");
const passHideReg = document.querySelector(".hide-pass-reg");

const overlay = document.querySelector(".overlay");

//////////////////////////////////////////////////////

//Modal reg window

const registerOpen = function () {
  register.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const registerClose = function () {
  register.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !register.classList.contains("hidden")) {
    registerClose();
  }
});

newAccountButton.addEventListener("click", registerOpen);
closeRegButton.addEventListener("click", registerClose);

///////////////////////////////////////////////

//REG

const checkerReg = function () {
  const validReg = /^\S+@\S+\.\S+$/;
  if (regEmail.value.match(validReg)) {
    regEmail.style.borderColor = "black";
  } else {
    regEmail.style.borderColor = "red";
  }

  if (regUsername.value === "") {
    regUsername.style.borderColor = "red";
  } else {
    regUsername.style.borderColor = "black";
  }

  if (
    regPassword.value !== regConfirmPassword.value ||
    regConfirmPassword.value === "" ||
    regPassword.value === ""
  ) {
    regPassword.style.borderColor = "red";
    regConfirmPassword.style.borderColor = "red";
    return false;
  } else {
    regPassword.style.borderColor = "black";
    regConfirmPassword.style.borderColor = "black";
    return true;
  }
};

registerButton.addEventListener("click", () => {
  checkerReg();
});

//////////////////////////

//lOGIN

const loginValidity = function () {
  const validLogin = /^\S+@\S+\.\S+$/;
  if (loginEmail.value.match(validLogin)) {
    loginEmail.style.borderColor = "black";
  } else {
    loginEmail.style.borderColor = "red";
  }

  const loginPassValidity = loginPassword.validity;

  if (loginPassValidity.valueMissing) {
    loginPassword.setCustomValidity("please enter a password");
  } else if (loginPassValidity.patternMismatch) {
    loginPassword.setCustomValidity("Incorrect Password");
  } else {
    loginPassword.setCustomValidity("");
  }

  if (loginPassword.value === "" || loginPassValidity.patternMismatch) {
    loginPassword.style.borderColor = "red";
  } else {
    loginPassword.style.borderColor = "black";
  }
};

loginButton.addEventListener("click", () => {
  loginValidity();
});

/////////////////////////////////////////////////
//Password Showing

const showPassLogin = function () {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
  }

  passShow.classList.add("hidden");
  passHide.classList.remove("hidden");
};

const showPassReg = function () {
  if (
    regPassword.type === "password" &&
    regConfirmPassword.type === "password"
  ) {
    regPassword.type = "text";
    regConfirmPassword.type = "text";
  }

  passShowReg.classList.add("hidden");
  passHideReg.classList.remove("hidden");
};

const hidePassLogin = function () {
  if (loginPassword.type === "text") {
    loginPassword.type = "password";
  }

  passShow.classList.remove("hidden");
  passHide.classList.add("hidden");
};

const hidePassReg = function () {
  if (regPassword.type === "text" && regConfirmPassword.type === "text") {
    regPassword.type = "password";
    regConfirmPassword.type = "password";
  }

  passShowReg.classList.remove("hidden");
  passHideReg.classList.add("hidden");
};

passShow.addEventListener("click", showPassLogin);
passHide.addEventListener("click", hidePassLogin);

passShowReg.addEventListener("click", showPassReg);
passHideReg.addEventListener("click", hidePassReg);

/////////////////////////////////////////////////

//Registering API

const registerFunc = function (e) {
  e.preventDefault();
  fetch("https://reqres.in/api/register", {
    method: "POST",
    body: JSON.stringify({
      //   username: regUsername.value,
      email: regEmail.value,
      password: regPassword.value,
      confirmPassword: regConfirmPassword.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
};

const formReg = document.querySelector("#reg-form");

formReg.addEventListener("submit", registerFunc);

////////////////////////////////////////////////

//LOGGING IN API

const loginFunc = function (e) {
  e.preventDefault();
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const formLog = document.querySelector("#login-form");

formLog.addEventListener("submit", loginFunc);
