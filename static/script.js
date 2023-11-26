var d2 = document.getElementById("d2");
var d1 = document.getElementById("d1");
var d0 = document.getElementById("d0");

var ub = document.getElementById("ub");
var sb = document.getElementById("sb");

var intId2 = -1,
  intId1 = -1,
  intId0 = -1;

var runId2 = false,
  runId1 = false,
  runId0 = false;

window.onload = () => {
  sb.classList.add("disabled-button");
};

d2.onanimationiteration = () => {
  if (runId2) return;
  void d2.offsetWidth;
  d2.style.animation = "none";
};

d1.onanimationiteration = () => {
  if (runId1) return;
  void d1.offsetWidth;
  d1.style.animation = "none";
};

d0.onanimationiteration = () => {
  if (runId0) return;
  void d0.offsetWidth;
  d0.style.animation = "none";
};

function uploadImage() {
  clearDigits();
  var imageInput = document.getElementById("img-ip");
  imageInput.click();
  sb.classList.add("disabled-button");
}

function setImage() {
  var imageInput = document.getElementById("img-ip");
  var imageBox = document.getElementById("img-bx");
  var image = imageInput.files[0];
  if (!image) return;

  var reader = new FileReader();
  reader.onload = () => (imageBox.src = reader.result);
  reader.readAsDataURL(image);
  sb.classList.remove("disabled-button");
}

function submitImage() {
  var imageInput = document.getElementById("img-ip");
  var image = imageInput.files[0];
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);
  startProcess();

  setTimeout(stopProcess, 5000);
}

function startProcess() {
  ub.classList.add("disabled-button");
  sb.classList.add("disabled-button");

  clearDigits();
  startAnimation();
  startCounter();
}

function stopProcess(str) {
  stopCounter();
  stopAnimation();
  setDigits(str);

  setTimeout(() => ub.classList.remove("disabled-button"), 3000);
}

function startAnimation() {
  runId2 = true;
  runId1 = true;
  runId0 = true;

  d2.style.animation = `moveDigits 0.5000s linear infinite`;
  d2.style.animationDirection = "reverse";
  d1.style.animation = `moveDigits 0.5000s linear infinite`;
  d1.style.animationDirection = "normal";
  d0.style.animation = `moveDigits 0.2500s linear infinite`;
  d0.style.animationDirection = "reverse";
}

function stopAnimation() {
  setTimeout(() => (runId2 = false), 3000);
  setTimeout(() => (runId1 = false), 2000);
  setTimeout(() => (runId0 = false), 1000);
}

function startCounter() {
  intId2 = setInterval(() => updateDigit(d2), 250);
  intId1 = setInterval(() => updateDigit(d1), 250);
  intId0 = setInterval(() => updateDigit(d0), 250);
}

function stopCounter() {
  setTimeout(() => clearInterval(intId2), 2750);
  setTimeout(() => clearInterval(intId1), 1750);
  setTimeout(() => clearInterval(intId0), 750);
}

function clearDigits() {
  d2.textContent = "-";
  d1.textContent = "-";
  d0.textContent = "-";
}

function setDigits(str) {
  setTimeout(() => clearInterval((d2.textContent = str[0])), 2750);
  setTimeout(() => clearInterval((d1.textContent = str[1])), 1750);
  setTimeout(() => clearInterval((d0.textContent = str[2])), 750);
}

function updateDigit(d) {
  const randomNumber = Math.floor(Math.random() * 10);
  const randomDigit = randomNumber.toString().split("");
  d.textContent = randomDigit[0] ?? "0";
}
