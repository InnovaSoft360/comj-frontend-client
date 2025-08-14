import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="style-Main">
        <nav>
          <div>
            <Link to="/">
              Condomínio Osvaldo MJ
            </Link>
          </div>
          <ul>
            <li> <Link to="/">Início</Link> </li>
            <li> <Link to="/ex">Início </Link> </li>
            <li> <Link to="/ex">Início </Link> </li>
            <li> <Link to="/ex">Início </Link> </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
