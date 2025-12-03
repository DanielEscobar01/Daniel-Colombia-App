// All comments and text are in English as requested.

// Function to display the baby name and photo in the designated container
function displayBabyName(babyFirstName, babyPhotoUrl) {
  const container = document.getElementById('babyNameContainer');
  const content = document.getElementById('babyNameContent');
  const photoContainer = document.getElementById('babyPhotoContainer');
  
  if (container && content) {
    // Display photo if available
    if (babyPhotoUrl && photoContainer) {
      photoContainer.innerHTML = `<img src="${babyPhotoUrl}" alt="${babyFirstName}" class="baby-photo">`;
      photoContainer.style.display = 'block';
    }
    
    content.textContent = babyFirstName;
    container.style.display = 'block';
    
    // Optional: scroll to the baby name
    setTimeout(() => {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 300);
  }
}

// Function to fetch a random baby name from a mix of both parent nationalities
async function generateBabyName(parentCountry1, parentCountry2) {
  try {
    // Validate that both countries are provided
    if (!parentCountry1 || !parentCountry2) {
      alert('Please enter both parent names and select both nationalities first.');
      return;
    }
    
    // Show loading spinner and disable button
    const loadingContainer = document.getElementById('loadingContainer');
    const generateBtn = document.getElementById('generateBtn');
    loadingContainer.classList.add('active');
    generateBtn.disabled = true;
    
    // Build the API URL with both parent nationalities as comma-separated list
    // Use CORS proxy to allow API calls from GitHub Pages and other hosted domains
    const randomUserApi = `https://randomuser.me/api/?inc=name&nat=${parentCountry1.toLowerCase()},${parentCountry2.toLowerCase()}`;
    const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(randomUserApi)}`;
    
    // Fetch data from the Random User Generator API through CORS proxy
    const response = await fetch(corsProxyUrl);
    const data = await response.json();
    
    // Extract the first name and photo URL
    const user = data.results[0];
    const babyFirstName = user.name.first;
    const babyPhotoUrl = user.picture.large;
    
    // Hide loading spinner
    loadingContainer.classList.remove('active');
    generateBtn.disabled = false;
    
    // Display the baby name and photo
    displayBabyName(babyFirstName, babyPhotoUrl);
    
    console.log(`Generated baby name: ${babyFirstName} (from ${parentCountry1} or ${parentCountry2})`);
    
    return babyFirstName;
  } catch (error) {
    // Hide loading spinner on error
    const loadingContainer = document.getElementById('loadingContainer');
    const generateBtn = document.getElementById('generateBtn');
    loadingContainer.classList.remove('active');
    generateBtn.disabled = false;
    
    console.error('Error generating baby name:', error);
    alert('Failed to generate baby name. Please try again.');
  }
}

// Minimal list of countries with ISO codes. Sorted alphabetically.
// Only includes nationalities supported by Random User API v1.4:
// AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IN, IR, MX, NL, NO, NZ, RS, TR, UA, US
// Each entry: { code: ISO code, name: display name }
const countries = [
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'DE', name: 'Germany' },
  { code: 'DK', name: 'Denmark' },
  { code: 'ES', name: 'Spain' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IN', name: 'India' },
  { code: 'IR', name: 'Iran' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'RS', name: 'Serbia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'US', name: 'United States' }
];

// Get references to DOM elements
const userCountrySelect = document.getElementById('userCountry');
const partnerCountrySelect = document.getElementById('partnerCountry');

// Function to populate a select element with country options
function populateCountrySelect(selectEl) {
  // Create option elements for each country in the array
  countries.forEach(c => {
    const opt = document.createElement('option');
    // Option value will be the country code; display will be country name only
    opt.value = c.code;
    opt.textContent = c.name;
    selectEl.appendChild(opt);
  });
}

// Populate both nationality dropdowns
populateCountrySelect(userCountrySelect);
populateCountrySelect(partnerCountrySelect);

// Small utility to escape user input before injecting into HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
