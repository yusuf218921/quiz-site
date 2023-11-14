export const Footer = () => {
  return (
    <div className="main-color">
      <footer
        className="container d-flex flex-wrap 
              justify-content-between align-items-center py-5 main-color"
      >
        <p className="col-md-4 mb-0 text-white">© Bigbox Quizle, Inc</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-white">
              Ana Sayfa
            </a>
          </li>
          <li className="nav-item">
            <a href="/leader-table" className="nav-link px-2 text-white">
              Liderlik Tablosu
            </a>
          </li>
          <li className="nav-item">
            <a href="/search" className="nav-link px-2 text-white">
              Quiz Ara
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};
