import { useEffect, useState } from "react";
import CategoryModel from "../../models/CategoryModel";

const AdminPanel = () => {
  const token = localStorage.getItem("token");
  const [quizName, setQuizName] = useState("");
  const [quizImgUrl, setQuizImgUrl] = useState("");
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [categoryId, setCategoryId] = useState(0);
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

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        "http://localhost:29722/api/Categories/getallcategories"
      );

      if (!response.ok) {
        throw new Error("Bir Şeyler Ters Gitti");
      }

      const responseJson = await response.json();

      const categories: CategoryModel[] = [];

      for (const key in responseJson) {
        categories.push({
          id: responseJson[key].categoryID,
          categoryName: responseJson[key].categoryName,
          status: responseJson[key].status,
        });
      }

      setCategories(categories);
      console.log(categories);
    };
    fetchCategory().catch((error: any) => {
      setHttpError(error.message);
    });
  }, []);

  if (httpError) {
    console.log(httpError);
  }

  const fetchQuiz = async () => {
    const quizData = {
      categoryId: categoryId,
      quizName: quizName,
      quizImgUrl: quizImgUrl,
      status: status,
    };

    console.log(JSON.stringify(quizData));

    const response = await fetch("http://localhost:29722/api/Quizzes/addquiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(quizData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.log("eklenemedi");
    }
  };

  if (userRoles.includes("admin")) {
    return (
      <div className="container mt-3 p-3">
        <h1 className="border-bottom border-5">Admin Panel</h1>
        <form>
          <h3>Quiz Ekleme</h3>
          <div className="mb-3">
            <label htmlFor="quizName" className="form-label">
              Quiz Adı
            </label>
            <input
              onChange={(o) => setQuizName(o.target.value)}
              type="text"
              className="form-control"
              id="quizName"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quizImgUrl" className="form-label">
              Quiz Img Url
            </label>
            <input
              onChange={(o) => setQuizImgUrl(o.target.value)}
              type="text"
              className="form-control"
              id="quizImgUrl"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="select" className="form-label">
              Kategori
            </label>
            <select
              id="select"
              className="form-select"
              onChange={(o) => {
                console.log(o.target.value);
                setCategoryId(parseInt(o.target.value));
              }}
            >
              <option value={0}>Seçiniz</option>
              {categories.map((c) => (
                <option value={c.id}>{c.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="form-select"
              onChange={(o) => {
                if (o.target.value === "True") {
                  setStatus(true);
                } else {
                  setStatus(false);
                }
              }}
            >
              <option>True</option>
              <option>False</option>
            </select>
          </div>
          <button onClick={fetchQuiz} type="button" className="btn btn-primary">
            Ekle
          </button>
        </form>
      </div>
    );
  } else {
    return <div>404 NOT FOUND</div>;
  }
};

export default AdminPanel;
