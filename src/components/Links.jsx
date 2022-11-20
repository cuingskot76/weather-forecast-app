import React from "react";
import { links } from "./constant/Index";

import { Link } from "react-router-dom";

const Links = () => {
    return (
        <div className="flex justify-center gap-2 text-blue-700 flex-wrap mb-5">
            {links.map((link) => (
                <Link
                    to={`/${link.value === "weather" ? "" : link.value}`}
                    key={link.name}
                    className="px-5 cursor-pointer"
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
};

export default Links;
