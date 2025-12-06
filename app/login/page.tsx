"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      alert(res.error);
      return;
    }

    // Login successful
    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background: "#f5f7fa",
        fontFamily: "Arial",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "30px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          required
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#0070f3",
            color: "white",
            borderRadius: "6px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user? <Link href="/signup">Create account</Link>
        </p>
      </form>
    </div>
  );
}
