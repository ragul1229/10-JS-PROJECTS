const colorInput = document.getElementById("colorInput");
const colorDisplay = document.getElementById("colorDisplay");
const hexValue = document.getElementById("hexValue");
const rgbValue = document.getElementById("rgbValue");

function updateColor() {
  let color = colorInput.value;
  colorDisplay.style.background = color;
  hexValue.textContent = color;

  // Convert HEX to RGB
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);
  rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
}

function copyColor() {
  navigator.clipboard.writeText(hexValue.textContent);
  alert("Copied: " + hexValue.textContent);
}

colorInput.addEventListener("input", updateColor);

// Initial display
updateColor();
