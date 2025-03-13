import express from "express";
import { auth } from "../config/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  try {
    const { email, password, role, userData } = req.body;

    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      email,
      role,
      name: userData.name,
      createdAt: new Date().toISOString()
    });

    // Store role-specific data
    await setDoc(doc(db, `${role}s`, firebaseUser.uid), userData);

    res.status(201).json({
      id: result.insertedId,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;