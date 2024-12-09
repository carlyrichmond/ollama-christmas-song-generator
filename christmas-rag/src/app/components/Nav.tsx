
import logo from "../../../public/logo-elastic-horizontal-color.svg";
import llama from "../../../public/funny-llama-with-santa-hat-cute-christmas-hat-llama-eq-designs-transparent.png";

import Image from "next/image";

export default function Nav() {
    return (
        <div className="nav__fixed">
            <a href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    alt="Elastic logo"
                />
            </a>
            <Image 
                className="nav__llama__logo"
                src={llama}
                alt="Festive Llama"
                />
        </div>
    );
}
