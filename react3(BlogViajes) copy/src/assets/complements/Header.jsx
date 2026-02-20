import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header main-container">
      <Link to="/">
        <img src="img/logo.png" alt="logotipo" />
      </Link>
    </header>
  );
}
