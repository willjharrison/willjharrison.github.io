// Function to convert LAB to RGB using color-convert library
function labToRgb(l, a, b) {
  const convert = require('color-convert');
  const [r, g, b] = convert.lab.rgb(l, a, b);
  return [r, g, b];
}

// Function to cycle through the LAB color space and set the background color
function cycleLabColor() {
  let startTime = new Date().getTime();
  let duration = 10000; // Duration of the animation in milliseconds (10 seconds)

  function animate() {
    let currentTime = new Date().getTime();
    let progress = (currentTime - startTime) / duration;

    // Cycle through the L, A, and B values
    let l = 0 + progress * 100;
    let a = -128 + progress * 256;
    let b = -128 + progress * 256;

    // Convert LAB to RGB
    let [r, g, b] = labToRgb(l, a, b);

    // Set the background color
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Reset the progress and start time if the cycle is complete
    if (progress >= 1) {
      startTime = new Date().getTime();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Load the color-convert library and start the color cycling
function loadScript(url, callback) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

loadScript('https://unpkg.com/color-convert@2.0.1', cycleLabColor);
