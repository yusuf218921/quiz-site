export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark dark py-3">
      <div className="container-fluid">
        <span className="navbar-brand font-alev">Quizle</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link px-2 text-white" href="/">
                {" "}
                Ana Sayfa
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-2 text-white" href="/leader-table">
                {" "}
                Liderlik Tablosu
              </a>
            </li>
            <li className="nav-item">
              <a href="/search" className="nav-link px-2 text-white">
                Quiz Ara
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item m-1">
              <a type="button" className="btn btn-outline-light" href="/login">
                Giriş Yap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
