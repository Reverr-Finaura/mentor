import { sendPasswordResetEmail } from "firebase/auth";
import styles from "./Forgotpassword.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth, db } from "../../firebase/firebase";
import Header from "../../components/Header/Header";
import { toast } from "react-hot-toast";
import { collection, getDocs, query, where } from "firebase/firestore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const checkUser = async () => {
    const q = query(
      collection(db, "Users"),
      where("userType", "==", "Mentor"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);
    if (querySnapshot.exists()) {
      handleSubmit();
    } else {
      toast.error("Email not found!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your email");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <>
      <Header theme={"black"} />
      <section className={styles.auth}>
        <div className={styles.password_reset}>
          <p>We'll mail you password reset link.</p>
          <form onSubmit={checkUser}>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id=""
              placeholder="Email"
            />
            <p>
              <Link to="/" className={styles.link}>
                Back to Login
              </Link>
            </p>
            <Button type="submit">Send Mail</Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
