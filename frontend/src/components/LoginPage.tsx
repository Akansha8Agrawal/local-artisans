import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../firebaseConfig.js"; // make sure firebaseConfig exports `app`

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✳️ Google Login handler
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const userCred = await signInWithPopup(auth, provider);
      const idToken = await userCred.user.getIdToken();

      // Send token to backend
      await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email: userCred.user.email }),
      });

      alert(`✅ Welcome ${userCred.user.email}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✳️ Email/Password Login handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", { email, password });

    const auth = getAuth(app);

    try {
      // Sign in user from Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      console.log("✅ Login successful! Token:", idToken);
      alert("Login successful!");

      // Optional: test backend protected route
      const res = await fetch("http://localhost:5000/protected-route", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
      });

      const data = await res.json();
      console.log("Backend response:", data);
    } catch (error: any) {
      console.error("❌ Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl border border-gray-200">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">Welcome Back!</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* ✳️ Google Login Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
