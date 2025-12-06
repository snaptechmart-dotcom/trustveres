"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Hit correct backend API (NextAuth compatible)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    // Auto login after signup
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    if (loginRes?.error) alert(loginRes.error);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ marginBottom: 20, textAlign: "center" }}>Create an Account</h2>

      <form onSubmit={handleSignup}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 20,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#0070f3",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Creating Account..." : "Signup"}
        </button>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
