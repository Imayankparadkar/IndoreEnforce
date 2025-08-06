// Utility functions for generating demo data for Prahaar 360
// This is only used for demonstration purposes where real data is not available

export interface IndoreLocation {
  name: string;
  latitude: number;
  longitude: number;
  area: string;
}

export const indoreLocations: IndoreLocation[] = [
  { name: "Rajwada", latitude: 22.7196, longitude: 75.8577, area: "Central" },
  { name: "Vijay Nagar", latitude: 22.7532, longitude: 75.8937, area: "West" },
  { name: "Palasia", latitude: 22.6934, longitude: 75.8703, area: "South" },
  { name: "MG Road", latitude: 22.7278, longitude: 75.8723, area: "Central" },
  { name: "Saket", latitude: 22.7044, longitude: 75.8869, area: "South" },
  { name: "LIG Square", latitude: 22.6989, longitude: 75.8605, area: "South" },
  { name: "Treasure Island", latitude: 22.7547, longitude: 75.8947, area: "West" },
  { name: "Bhawar Kuan", latitude: 22.7254, longitude: 75.8613, area: "Central" },
  { name: "Airport Road", latitude: 22.7279, longitude: 75.8011, area: "East" },
  { name: "Silicon City", latitude: 22.7831, longitude: 75.8631, area: "North" }
];

export const scamTypes = [
  "UPI Fraud",
  "Voice Call Scam", 
  "Job Scam",
  "Phishing",
  "Loan Scam",
  "KYC Fraud",
  "Investment Scam",
  "Fake Apps"
];

export const fraudPatterns = {
  upiIds: [
    "@paytmfraud123",
    "@phonepescam456", 
    "@gpayfraud789",
    "@bharatpescam012",
    "@fakeupi345",
    "@scammerupi678"
  ],
  phoneNumbers: [
    "+91 9876543210",
    "+91 8765432109", 
    "+91 7654321098",
    "+91 6543210987",
    "+91 9988776655",
    "+91 8877665544"
  ],
  telegramHandles: [
    "@LoanApp123",
    "@FakeJobAlert",
    "@SBIupdatehelp",
    "@KYCsupport456",
    "@Bankinghelp789",
    "@Investmentguru012"
  ],
  aliases: [
    "SBI Helper",
    "KYC Update Team",
    "Loan Officer",
    "Bank Manager", 
    "Support Executive",
    "Investment Advisor",
    "Job Consultant",
    "Payment Gateway",
    "Security Department",
    "Account Verification"
  ]
};

export function getRandomLocation(): IndoreLocation {
  return indoreLocations[Math.floor(Math.random() * indoreLocations.length)];
}

export function getRandomScamType(): string {
  return scamTypes[Math.floor(Math.random() * scamTypes.length)];
}

export function generateFakePhoneNumber(): string {
  const area = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
  const number = Math.floor(Math.random() * 900000) + 100000; // 100000-999999
  return `+91 ${area.toString().slice(0, 2)}${area.toString().slice(2)} ${number.toString().slice(0, 3)} ${number.toString().slice(3)}`;
}

export function generateFakeUPIId(): string {
  const providers = ["paytm", "phonepe", "gpay", "bharatpe", "amazonpay"];
  const username = Math.random().toString(36).substring(2, 8);
  const provider = providers[Math.floor(Math.random() * providers.length)];
  return `${username}@${provider}`;
}

export function generateFakeName(): string {
  const firstNames = [
    "Rahul", "Priya", "Amit", "Sneha", "Rajesh", "Pooja", "Vikas", "Neha",
    "Suresh", "Kavita", "Deepak", "Sunita", "Ashok", "Meera", "Ravi", "Sita"
  ];
  const lastNames = [
    "Sharma", "Gupta", "Singh", "Patel", "Kumar", "Agarwal", "Jain", "Shah",
    "Verma", "Tiwari", "Yadav", "Pandey", "Mishra", "Chouhan", "Malhotra", "Goyal"
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

export function generateCaseId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export function generateRandomAmount(): number {
  // Generate amounts typical of scam cases
  const ranges = [
    { min: 500, max: 5000 },      // Small amounts
    { min: 5000, max: 25000 },    // Medium amounts  
    { min: 25000, max: 100000 },  // Large amounts
    { min: 100000, max: 500000 }  // Very large amounts
  ];
  
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}

export function generateTimeAgo(): Date {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30); // 0-30 days ago
  const hoursAgo = Math.floor(Math.random() * 24); // 0-24 hours ago
  const minutesAgo = Math.floor(Math.random() * 60); // 0-60 minutes ago
  
  return new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000) - (minutesAgo * 60 * 1000));
}

export function generateRiskScore(): number {
  // Generate realistic risk scores with higher probability for medium-high risk
  const rand = Math.random();
  if (rand < 0.2) return Math.floor(Math.random() * 30) + 10;  // Low risk: 10-40
  if (rand < 0.6) return Math.floor(Math.random() * 40) + 40;  // Medium risk: 40-80
  return Math.floor(Math.random() * 20) + 80;                 // High risk: 80-100
}

export function generateScamDescription(scamType: string): string {
  const descriptions = {
    "UPI Fraud": [
      "Received fake UPI transaction failure message asking for refund",
      "Scammer asked for UPI PIN claiming account verification", 
      "Fake merchant payment request with wrong amount",
      "Phishing message about UPI account suspension"
    ],
    "Voice Call Scam": [
      "Caller claimed to be from bank asking for card details",
      "Fake police officer demanding money for case settlement",
      "Scammer posed as relative asking for emergency money",
      "Fraudulent call about winning lottery prize"
    ],
    "Job Scam": [
      "Asked to pay registration fee for fake job opportunity",
      "Work from home scam requiring upfront payment",
      "Fake recruitment for government job with fees",
      "Online data entry job scam demanding advance"
    ],
    "Phishing": [
      "Fake banking website asking for login credentials",
      "Fraudulent email claiming account compromise",
      "Fake COVID vaccination certificate link",
      "Phishing SMS about electricity bill payment"
    ],
    "Loan Scam": [
      "Instant loan approval scam requiring advance fee",
      "Fake loan app asking for processing charges",
      "Credit card upgrade scam with upfront payment",
      "Personal loan fraud with document verification fee"
    ]
  };

  const typeDescriptions = descriptions[scamType as keyof typeof descriptions] || descriptions["UPI Fraud"];
  return typeDescriptions[Math.floor(Math.random() * typeDescriptions.length)];
}

export function generateAlertMessage(): string {
  const location = getRandomLocation();
  const scamType = getRandomScamType();
  const alertTemplates = [
    `🚨 Alert: ${scamType} reported near ${location.name}`,
    `⚠️ ${scamType} detected in ${location.name} area`,
    `📱 Surge in ${scamType} cases around ${location.name}`,
    `🔗 Active ${scamType} targeting ${location.name} residents`
  ];
  
  return alertTemplates[Math.floor(Math.random() * alertTemplates.length)];
}

// Generate realistic officer names
export function generateOfficerName(): string {
  const ranks = ["Inspector", "Sub-Inspector", "ASI", "Constable"];
  const names = [
    "Sharma", "Gupta", "Singh", "Patel", "Yadav", "Tiwari", "Verma", "Jain",
    "Agarwal", "Mishra", "Pandey", "Chouhan", "Rajput", "Thakur"
  ];
  
  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  const name = names[Math.floor(Math.random() * names.length)];
  return `${rank} ${name}`;
}

// Generate hash for immutable logging
export function generateActionHash(): string {
  return Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

// Seasonal patterns for more realistic data
export function getSeasonalMultiplier(): number {
  const month = new Date().getMonth();
  // Higher scam activity during festival seasons and year-end
  if (month >= 9 || month <= 1) return 1.3; // Oct-Jan (Diwali, New Year)
  if (month >= 2 && month <= 4) return 1.1; // Mar-May (Holi, financial year end)
  return 1.0; // Normal months
}

// Export all utility functions
export const fakeDataUtils = {
  getRandomLocation,
  getRandomScamType,
  generateFakePhoneNumber,
  generateFakeUPIId,
  generateFakeName,
  generateCaseId,
  generateRandomAmount,
  generateTimeAgo,
  generateRiskScore,
  generateScamDescription,
  generateAlertMessage,
  generateOfficerName,
  generateActionHash,
  getSeasonalMultiplier
};
