import React from "react";

const RegisterPage = () => {
  return (
    <div className="page">
      <div className="cover">
        <h1>Kayıt Ol</h1>
        <input type="text" placeholder="e-posta" />
        <input type="text" placeholder="kullanıcı adı" />
        <input type="password" placeholder="şifre" />

        <div className="login-btn">Kayıt Ol</div>

        <p className="text">Ya da Şunları Kullanarak Kayıt Ol</p>

        <div className="alt-login">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
