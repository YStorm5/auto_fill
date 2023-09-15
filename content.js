// Get all input elements on the page
var allInputs = document.getElementsByTagName("input");
// Function to generate a random word of given length
function generateRandomWord(length) {
  let randomWord = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomWord += characters[randomIndex];
  }
  return randomWord;
}
// Function to generate a random number within a range
function generateRandomNumber(min, max) {
  const randomDecimal = Math.random();
  const randomNumber = randomDecimal * (max - min) + min;
  const roundedNumber = Math.floor(randomNumber);
  return roundedNumber;
}

// Function to generate a random date within a range
function generateRandomDate() {
  const year = generateRandomNumber(2000, new Date().getFullYear());
  const month = generateRandomNumber(1, 12).toString().padStart(2, "0");
  const day = generateRandomNumber(1, 28).toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Filter out invalid input elements
var visibleInputs = [];
for (var i = 0; i < allInputs.length; i++) {
  var input = allInputs[i];
  if (input.type !== "hidden" && input.type !== "file") {
    visibleInputs.push(input);
  }
}

// Load option config from local storage
chrome.storage.local.get("config").then((result) => {
  config = result.config;
  // Give input value base on type
  visibleInputs.map((e) => {
    if (e.type == "text") {
      e.value = generateRandomWord(
        config.text.length == "" ? 8 : config.text.length
      );
    } else if (e.type == "number") {
      e.value = generateRandomNumber(1, 1000);
    } else if (e.type == "email") {
      e.value = generateRandomWord(8) + "@gmail.com";
    } else if (e.type == "date") {
      e.value = generateRandomDate();
    } else if (e.type == "password") {
      e.value = "ThisPa55w.rdIsLong";
    }
  });
});
