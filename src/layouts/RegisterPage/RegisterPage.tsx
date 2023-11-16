import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [popupStyle, showPopup] = useState("hide");
  const navigate = useNavigate();

  const fetchUser = async () => {
    const userForRegister = {
      password: password,
      email: email,
      username: username,
    };
    const response = await fetch("http://localhost:29722/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userForRegister),
    });
    if (response.ok) {
      navigate("/login");
    } else {
      showPopup("login-popup");
      setTimeout(() => showPopup("hide"), 3000);
      return;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="cover">
          <h1>Kayıt Ol</h1>
          <input
            type="text"
            placeholder="e-posta"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="kullanıcı adı"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="şifre"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-btn" onClick={fetchUser}>
            Kayıt Ol
          </div>
          <div>
            Hesabın var mı ? <a href="/login">giriş yap</a>
          </div>

          <p className="text">Ya da Şunları Kullanarak Kayıt Ol</p>

          <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
          </div>

          <div className={popupStyle}>
            <h3>Kayıt Olma Başarısız</h3>
            <p>Bu Kullanıcı Adi veya Email zaten mevcut!!!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
