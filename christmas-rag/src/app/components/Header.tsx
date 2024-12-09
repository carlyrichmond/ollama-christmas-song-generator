import logo from '../../../public/logo-elastic-horizontal-color.svg';
import Image from "next/image";

export default function Header() {
  return (
    <header className="banner">
      <Image
        className="elastic__logo"
        src={logo}
        alt="Elastic"
      />
      <h1 aria-label="Christmas Song Generator">Christmas Song Generator</h1>
    </header>
  );
}
