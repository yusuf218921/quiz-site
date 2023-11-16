import { useState, useEffect } from "react";
import "./loginform.css";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../NavbarAndFooter/Navbar";

const LoginPage = () => {
  const [popupStyle, showPopup] = useState("hide");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [httpError, setHttpError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage'dan token'u al
    const token = localStorage.getItem("token");

    // Token varsa ana sayfada kal
    // Token yoksa giriş sayfasına yönlendir
    if (token) {
      navigate("/"); // '/giris' yerine kendi giriş sayfasının yolunu belirtin
    }
  }, []);

  const fetchUser = async () => {
    const user = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:29722/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      localStorage.setItem("token", token);
    } else {
      showPopup("login-popup");
      setTimeout(() => showPopup("hide"), 3000);
      return;
    }
  };

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="cover">
          <h1>Giriş</h1>
          <input
            type="text"
            placeholder="e-posta"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="şifre"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <div className="login-btn" onClick={fetchUser}>
            Giriş Yap
          </div>

          <div>
            Hesabın yok mu? <a href="/register">kayıt ol</a>
          </div>

          <p className="text">Şunları kullanarak giriş yap</p>

          <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
          </div>

          <div className={popupStyle}>
            <h3>Giriş Başarısız</h3>
            <p>E-posta veya şifre hatalı</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
