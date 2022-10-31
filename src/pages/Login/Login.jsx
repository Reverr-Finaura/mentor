import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth, db } from "../../firebase/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login, setUserData } from "../../features/userSlice";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const docRef = doc(db, "Users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      signInWithEmailAndPassword(auth, email, password)
        .then((t) => {
          dispatch(setUserData(docSnap.data()));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      setLoading(false);
      // doc.data() will be undefined in this case
      alert("User Not Found");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/home");

        // ...
      } else {
        navigate("/");
        // User is signed out
        // ...
      }
    });
  }, []);

  return (
    <>
      <Header theme={"black"} />
      <section className={styles.auth}>
        <div className={styles.signup}>
          <div className={styles.google_signup}>
            {/* <Button
              className={styles.googleLoginBtn}
              onClick={signInWithGoogle}
            >
              <img src="/images/image 134.svg" alt="" />
              Login with Google
            </Button> */}
          </div>
          <div>
            <p>
              <b>Hello Mentor! Login with your E-mail</b>
            </p>
          </div>
          <form onSubmit={checkUser}>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your E-Mail"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter a password"
              />
            </div>
            <Button type="submit">{loading ? "Verifying..." : "Login"}</Button>
          </form>
          {/* <p>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.link}>
              Sign Up
            </Link>
          </p> */}
          <p>
            Forgot Password?{" "}
            <Link to="/forgotpassword" className={styles.link}>
              Click Here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

export default Auth;
