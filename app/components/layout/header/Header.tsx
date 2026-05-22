import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div>
      <span className="header-logo">S.R</span>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
