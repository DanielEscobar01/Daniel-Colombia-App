// All comments and text are in English as requested.

// Function to fetch a random user from the Random User Generator API
// and populate the user name field, respecting the selected nationality
async function fetchRandomUser(targetFieldId, countryCode) {
  try {
    // Build the API URL with the selected nationality and only name/nat fields
    // inc parameter: only include name and nat fields for efficiency
    // nat parameter: request user from the selected country
    const apiUrl = `https://randomuser.me/api/?inc=name,nat&nat=${countryCode.toLowerCase()}`;
    
    // Fetch data from the Random User Generator API
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Extract the first result
    const user = data.results[0];
    
    // Construct the full name from the API response
    const fullName = `${user.name.first} ${user.name.last}`;
    
    // Set the value of the target field (userName or partnerName)
    const field = document.getElementById(targetFieldId);
    if (field) {
      field.value = fullName;
      // Log to console for debugging
      console.log(`Generated name for ${targetFieldId} (${countryCode}): ${fullName}`);
    }
  } catch (error) {
    // Log any errors that occur during the API fetch
    console.error('Error fetching random user:', error);
    alert('Failed to generate name. Please try again or enter manually.');
  }
}

// Function to generate both user and partner names by calling the API twice
// Uses the selected nationalities from the form dropdowns
async function generateBothNames() {
  // Get the selected country codes from the form
  const userCountryCode = document.getElementById('userCountry').value;
  const partnerCountryCode = document.getElementById('partnerCountry').value;
  
  // Validate that both nationalities have been selected
  if (!userCountryCode || !partnerCountryCode) {
    alert('Please select both nationalities first.');
    return;
  }
  
  // Fetch random users for each selected nationality
  await fetchRandomUser('userName', userCountryCode);
  await fetchRandomUser('partnerName', partnerCountryCode);
}

// Minimal list of countries with ISO codes. Sorted alphabetically.
// Each entry: { code: ISO code, name: display name }
const countries = [
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'DE', name: 'Germany' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EG', name: 'Egypt' },
  { code: 'ES', name: 'Spain' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'GH', name: 'Ghana' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IN', name: 'India' },
  { code: 'IR', name: 'Iran' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'RU', name: 'Russia' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SE', name: 'Sweden' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ZA', name: 'South Africa' }
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

// Handle form submission: prevent default, validate, and show a summary
document.getElementById('partnerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Read values from the form
  const userName = document.getElementById('userName').value.trim();
  const partnerName = document.getElementById('partnerName').value.trim();
  const userCode = userCountrySelect.value;
  const partnerCode = partnerCountrySelect.value;

  // Basic validation
  if (!userName || !partnerName || !userCode || !partnerCode) {
    alert('Please complete all fields.');
    return;
  }

  // Helper to find country object by code
  function findCountry(code) {
    return countries.find(c => c.code === code) || { name: 'Unknown' };
  }

  const userCountry = findCountry(userCode);
  const partnerCountry = findCountry(partnerCode);

  // Build the summary HTML
  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <strong>Submission summary</strong>
    <div style="margin-top:8px">
      <div><strong>Your name:</strong> ${escapeHtml(userName)} <em>(${userCountry.name})</em></div>
      <div style="margin-top:6px"><strong>Partner's name:</strong> ${escapeHtml(partnerName)} <em>(${partnerCountry.name})</em></div>
    </div>
  `;
});

// Small utility to escape user input before injecting into HTML
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
