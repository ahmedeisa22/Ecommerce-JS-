var nameEl = document.getElementById("name");
var emaliEl = document.getElementById("email");
var passwordEl = document.getElementById("password");
var formEl = document.getElementById("form");
var radios = document.querySelectorAll(".radio");
var tennisEl = document.getElementById("tennis");
var runningEl = document.getElementById("running");
var footballEl = document.getElementById("football");
var checks = document.querySelectorAll(".check");
var selectEl = document.getElementById("countries");
var submit = document.getElementById("submit");

function valideName(name) {
  if (name.length < 3) return false;

  return true;
}

function valideEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

form.addEventListener("submit", function (e) {
  // prevent default
  e.preventDefault();

  // check name
  if (!valideName(nameEl.value))
    document.getElementById("div-name").style.display = "block";
  else document.getElementById("div-name").style.display = "none";

  // check email
  if (!valideEmail(emaliEl.value))
    document.getElementById("div-email").style.display = "block";
  else document.getElementById("div-email").style.display = "none";

  //check password
  if (passwordEl.value.length < 8)
    document.getElementById("div-password").style.display = "block";
  else document.getElementById("div-password").style.display = "none";

  //gender
  var isChecked = false;
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) isChecked = true;
  }

  if (!isChecked) document.getElementById("div-radio").style.display = "block";
  else document.getElementById("div-radio").style.display = "none";

  //two sports
  var countCheck = 0;
  for (let i = 0; i < checks.length; i++) {
    if (checks[i].checked) countCheck++;
  }

  if (countCheck < 2)
    document.getElementById("div-checkbox").style.display = "block";
  else document.getElementById("div-checkbox").style.display = "none";

  //select countries
  if (!selectEl.value)
    document.getElementById("div-country").style.display = "block";
  else document.getElementById("div-country").style.display = "none";
});
