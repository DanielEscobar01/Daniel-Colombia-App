// All comments and text are in English as requested.

// Minimal list of countries with emoji flags. You can extend this list as needed.
// Each entry: { code: ISO code, name: display name, flag: emoji }
const countries = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' }
];

// Get references to DOM elements
const userCountrySelect = document.getElementById('userCountry');
const partnerCountrySelect = document.getElementById('partnerCountry');

// Function to populate a select element with country options (including emoji flags)
function populateCountrySelect(selectEl) {
  // Create option elements for each country in the array
  countries.forEach(c => {
    const opt = document.createElement('option');
    // Option value will be the country code; display will include flag emoji
    opt.value = c.code;
    opt.textContent = `${c.flag}  ${c.name}`;
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
    return countries.find(c => c.code === code) || { flag: '', name: 'Unknown' };
  }

  const userCountry = findCountry(userCode);
  const partnerCountry = findCountry(partnerCode);

  // Build the summary HTML
  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <strong>Submission summary</strong>
    <div style="margin-top:8px">
      <div><strong>Your name:</strong> ${escapeHtml(userName)} ${userCountry.flag} <em>${userCountry.name}</em></div>
      <div style="margin-top:6px"><strong>Partner's name:</strong> ${escapeHtml(partnerName)} ${partnerCountry.flag} <em>${partnerCountry.name}</em></div>
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
