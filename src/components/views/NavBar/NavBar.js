import React from 'react'
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/ResearchList">ResearchList</Link>
                </li>
                <li>
                    <Link to="/Matrix">Matrix</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar
