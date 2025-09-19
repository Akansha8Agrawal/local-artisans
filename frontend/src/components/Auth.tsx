import React, { useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ Auto-track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Register with Email/Password
  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      alert("✅ Registered Successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Login with Email/Password
  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCred.user);
      alert("✅ Logged in Successfully!");
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Login with Google
  const handleGoogleLogin = async () => {
    try {
      const userCred = await signInWithPopup(auth, googleProvider);
      setUser(userCred.user);
      alert(`✅ Welcome ${userCred.user.email}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    alert("👋 Logged out!");
  };

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">🔑 Authentication</h2>
      
      {user ? (
        <div>
          <p className="mb-2">Welcome, <b>{user.email}</b></p>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Email/Password */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <div className="flex space-x-2">
            <button 
              onClick={handleRegister} 
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Register
            </button>
            <button 
              onClick={handleLogin} 
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </div>

          <hr />

          {/* Google Login */}
          <button 
            onClick={handleGoogleLogin} 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default Auth;
