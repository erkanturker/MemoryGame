const coolBackgroundColors = [
  "#ADD8E6", // Light Blue
  "#98FB98", // Mint Green
  "#E6E6FA", // Lavender
  "#FFDAB9", // Peach
  "#87CEEB", // Sky Blue
  "#D3D3D3", // Light Gray
  "#F0E68C", // Khaki
  "#DA70D6", // Orchid
  "#ADD8E6", // Light Blue
  "#98FB98", // Mint Green
  "#E6E6FA", // Lavender
  "#FFDAB9", // Peach
  "#87CEEB", // Sky Blue
  "#D3D3D3", // Light Gray
  "#F0E68C", // Khaki
  "#DA70D6", // Orchid
];

document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");

  for (const box of boxes) {
    // Generate a random index within the range of the array length
    let randomColorIndex = Math.floor(
      Math.random() * coolBackgroundColors.length
    );
    // Set the dataset color of the box
    box.dataset.colorHex = coolBackgroundColors[randomColorIndex];
    // Remove the selected color from the array
    coolBackgroundColors.splice(randomColorIndex, 1);
  }
});

let isClicked = false;
let isComparing = false;
const container = document.querySelector(".container");

container.addEventListener("click", function (event) {
  let storedColor = sessionStorage.getItem("selectedColor");
  let storedBox = sessionStorage.getItem("selectedBox");
  const targetColor = event.target.dataset.colorHex;

  // If currently comparing, do nothing
  if (isComparing) {
    return;
  }

  // If a card is already clicked
  if (isClicked) {
    // Set flags to indicate comparing state and reset clicked state
    isComparing = true;
    isClicked = false;

    // Update the background color of the clicked card
    event.target.style.backgroundColor = targetColor;

    // Check if the clicked card is not the same as the stored card
    if (storedBox === event.target.id) {
      isComparing = false;
      return;
    }
    // Check if colors match
    if (storedColor == targetColor) {
      console.log("Match!");
      isComparing = false;
    } else {
      setTimeout(() => {
        isComparing = false;
        resetColors(event.target, storedBox);
      }, 1000);
    }
  } else {
    // If no card has been clicked yet
    event.target.style.backgroundColor = targetColor;

    // Save to local storage
    sessionStorage.setItem("selectedColor", targetColor);
    sessionStorage.setItem("selectedBox", event.target.id);

    // Set the flag to indicate a card has been clicked
    isClicked = true;
  }
});

function resetColors(target, storedBox) {
  target.style.backgroundColor = "#FFFFFF";
  let previousBox = document.querySelector(`#${storedBox}`);
  previousBox.style.backgroundColor = "#FFFFFF";
}
