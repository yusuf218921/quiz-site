import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "../NavbarAndFooter/Navbar";

const RegisterPage = () => {
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
  return (
    <div>
      <Navbar />
      <div className="page">
        <div className="cover">
          <h1>Kayıt Ol</h1>
          <input type="text" placeholder="e-posta" />
          <input type="text" placeholder="kullanıcı adı" />
          <input type="password" placeholder="şifre" />

          <div className="login-btn">Kayıt Ol</div>
          <div>
            Hesabın var mı ? <a href="/login">giriş yap</a>
          </div>

          <p className="text">Ya da Şunları Kullanarak Kayıt Ol</p>

          <div className="alt-login">
            <div className="facebook"></div>
            <div className="google"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
