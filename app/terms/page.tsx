export default function TermsOfService() {
  return (
    <div className="prose max-w-4xl mx-auto p-8">
      <h1>Terms of Service — Trustverse AI</h1>
      <p>Effective date: {new Date().toISOString().slice(0,10)}</p>

      <h2>1. Acceptance</h2>
      <p>By using Trustverse AI, you agree to these Terms.</p>

      <h2>2. Services</h2>
      <p>We provide AI-based trust verification tools. Features, plans and pricing are described on our website.</p>

      <h2>3. Accounts</h2>
      <p>You are responsible for keeping credentials secure. Do not share account access.</p>

      <h2>4. Payments & Subscriptions</h2>
      <p>Payments are processed by third parties (e.g., Razorpay). Subscription cancellations and refunds follow our refund policy (link).</p>

      <h2>5. Acceptable Use</h2>
      <p>You must not use the service to harass, defraud, or infringe rights. We can suspend accounts that violate these terms.</p>

      <h2>6. Liability</h2>
      <p>We provide services "as is". We are not liable for indirect or consequential damages. Our liability is limited to the amounts paid in the last 12 months.</p>

      <h2>7. Governing Law</h2>
      <p>These Terms are governed by the laws of your operating jurisdiction (India).</p>

      <h2>Contact</h2>
      <p>Email: support@trustverseai.com</p>
    </div>
  );
}
