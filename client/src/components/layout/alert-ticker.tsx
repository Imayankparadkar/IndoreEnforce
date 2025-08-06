import { useEffect, useState } from "react";

const alertMessages = [
  "🚨 Alert: Voice scam reported near Palasia",
  "⚠️ UPI fraud detected in Vijay Nagar", 
  "📱 Fake job scam active in MG Road area",
  "🔗 Phishing links targeting Rajwada residents",
  "💰 Loan scam calls from unknown numbers",
  "📞 Fake KYC update calls in Saket area"
];

export default function AlertTicker() {
  const [currentMessage, setCurrentMessage] = useState(alertMessages.join(" • "));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(alertMessages.join(" • "));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-500 text-white py-2 overflow-hidden">
      <div className="alert-ticker whitespace-nowrap">
        <span className="inline-block px-8">{currentMessage}</span>
      </div>
    </div>
  );
}
