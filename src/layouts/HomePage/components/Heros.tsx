export const Heros = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h1 className="font-alev">Quizlemeye var mısın ?</h1>
              <p className="lead">
                <strong>
                  Quizle'de istediğin kategorideki quizlere girebilir, belirli
                  alanlardaki bilgilerini test edebilrsin veya tamamen rastgele
                  sorulardan oluşan kendine özel quizle genel kültür seviyeni
                  ölçebilirsin. O halde ne duruyorsun, hemen kayıt ol!
                </strong>
              </p>
              {token ? (
                <a
                  type="button"
                  className="btn btn-dark btn-lg text-white font-alev"
                  href="#"
                >
                  Quizle
                </a>
              ) : (
                <a className="btn btn-dark btn-lg text-white" href="/register">
                  Kayıt Ol
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                      justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h1 className="font-alev">Bilginle başka insanlarla yarış</h1>
              <p className="lead">
                <strong>
                  Quizlere girerek kazandığın puanlarla başka insanlarla
                  yarışabil, liderlik tablomuzda yüksek sıralamalar yaparak
                  haftalık ödüllerimizden yararlanabilirsin.
                </strong>
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h1 className="font-alev">Quizlemeye var mısın ?</h1>
              <strong>
                Quizle'de istediğin kategorideki quizlere girebilir, belirli
                alanlardaki bilgilerini test edebilrsin veya tamamen rastgele
                sorulardan oluşan kendine özel quizle genel kültür seviyeni
                ölçebilirsin. O halde ne duruyorsun, hemen kayıt ol!
              </strong>
              <a
                className="btn btn-dark btn-sm text-white"
                style={{ display: "block" }}
                href="/register"
              >
                Kayıt Ol
              </a>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h1 className="font-alev">Bilginle başka insanlarla yarış</h1>
              <strong>
                Quizlere girerek kazandığın puanlarla başka insanlarla
                yarışabil, liderlik tablomuzda yüksek sıralamalar yaparak
                haftalık ödüllerimizden yararlanabilirsin.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
