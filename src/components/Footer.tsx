import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{ backgroundImage: "linear-gradient(90deg,rgba(2,25,35,.55),rgba(2,25,35,.3)),url('/images/footer-water.webp')" }}
    >
      <p className="footer-motto">
        Disciplină.
        <br />
        Dezvoltare.
        <br />
        Performanță.
        <br />
        Comunitate.
      </p>
      <Link to="/" aria-label="Înapoi la pagina principală">
        <img src="/images/logo.png" alt="Renovatio Sport Club" />
      </Link>
    </footer>
  );
}
