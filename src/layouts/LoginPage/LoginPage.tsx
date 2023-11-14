import React, { useState } from "react";
import "./loginform.css";

const LoginPage = () => {
  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("login-popup");
    setTimeout(() => showPopup("hide"), 3000);
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>Giriş</h1>
        <input type="text" placeholder="e-posta" />
        <input type="password" placeholder="şifre" />

        <div className="login-btn" onClick={popup}>
          Giriş Yap
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
  );
};

export default LoginPage;
