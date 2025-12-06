export default function PrivacyPolicy() {
  return (
    <div className="prose max-w-4xl mx-auto p-8">
      <h1>Privacy Policy — Trustverse AI</h1>
      <p>Effective date: {new Date().toISOString().slice(0,10)}</p>

      <h2>1. Introduction</h2>
      <p>Trustverse AI ("we", "us", "our") provides AI-powered trust verification services. We respect your privacy and are committed to protecting your personal information.</p>

      <h2>2. Data We Collect</h2>
      <ul>
        <li>Information you provide: name, email, phone, social links, and any text you submit for checks.</li>
        <li>Technical data: device, IP, browser, cookies and usage logs.</li>
        <li>Payment data: We use third-party payment processors (e.g., Razorpay). We do not store full card details.</li>
      </ul>

      <h2>3. How We Use Data</h2>
      <p>To provide and improve services, process payments, generate reports, send notifications, and prevent abuse/fraud.</p>

      <h2>4. Sharing & Third Parties</h2>
      <p>We may share data with service providers (hosting, analytics, payment processors). We do not sell personal data. We may share anonymized aggregate data.</p>

      <h2>5. Security</h2>
      <p>We store data on secure infrastructure (MongoDB Atlas and SSL). Sensitive values (API keys, secrets) are stored in environment variables. We use industry reasonable measures to protect data.</p>

      <h2>6. Retention & Deletion</h2>
      <p>You may request data deletion by contacting us at support@trustverseai.com. We will delete personal data within a reasonable period, subject to legal or billing retention requirements.</p>

      <h2>7. Your Rights</h2>
      <p>You can access, correct, or delete your account data. For privacy requests, contact support@trustverseai.com.</p>

      <h2>8. Changes</h2>
      <p>We may update this policy; we will post the date of last update.</p>

      <h2>Contact</h2>
      <p>Email: support@trustverseai.com</p>
    </div>
  );
}
