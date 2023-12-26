import { useEffect, useState } from "react";
import CategoryModel from "../../models/CategoryModel";
import AddQuiz from "./components/AddQuiz";
import AddQuestion from "./components/AddQuestion";

const AdminPanel = () => {
  const token = localStorage.getItem("token");
  const [httpError, setHttpError] = useState(null);
  const [userRoles, setUserRoles] = useState<String[]>([]);

  useEffect(() => {
    // localStorage'dan JWT'yi al
    const jwtToken = token;

    if (jwtToken) {
      try {
        // JWT'yi parse et
        const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
        // JWT içindeki rolleri al
        const roles =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ] || [];
        // Roller state'e setle
        setUserRoles(roles);

        // Eğer "admin" rolü yoksa, 404 hatası ver veya başka bir işlem yap
        if (!roles.includes("admin")) {
          // Burada sayfayı yönlendirebilir veya hata mesajı gösterebilirsiniz.
          console.error("Admin rolü yok. Sayfa bulunamadı.");
        }
      } catch (error) {
        console.error("JWT parse hatası:", error);
      }
    } else {
      console.error("JWT bulunamadı. Giriş yapmış olmalısınız.");
    }
  }, []);

  if (userRoles.includes("admin")) {
    return (
      <div className="container mt-3 p-3">
        <h1 className="border-bottom border-5">Admin Panel</h1>
        <AddQuiz />
        <AddQuestion />
      </div>
    );
  } else {
    return (
      <div className="container d-flex justify-content-center">
        <h1>404 NOT FOUND</h1>
      </div>
    );
  }
};

export default AdminPanel;
