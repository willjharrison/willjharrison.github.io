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


function fetchPublications() {
  const scholarId = 'zGyx5LoAAAAJ';
  const apiUrl = `https://bibbase.org/show?bib=https://scholar.google.co.uk/citations?user=${scholarId}&exportformat=bibtex&jsonp=1`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayPublications(data.entries))
    .catch(error => console.error('Error fetching publications:', error));
}

function displayPublications(publications) {
  const sortedPublications = publications.sort((a, b) => (a.year < b.year) ? 1 : -1);

  let publicationsHtml = '<h2>Publications</h2><ul>';

  sortedPublications.forEach(publication => {
    publicationsHtml += `
      <li>
        <strong>${publication.title}</strong><br>
        ${publication.author}<br>
        <em>${publication.journal}</em>, ${publication.year}
      </li>`;
  });

  publicationsHtml += '</ul>';

  document.getElementById('publications').innerHTML = publicationsHtml;
}

function init() {
  // Initialize color cycling
  //initColorCycling();

  // Fetch and display publications
  fetchPublications();

  // Update publications list every 24 hours
  setInterval(fetchPublications, 24 * 60 * 60 * 1000);
}
