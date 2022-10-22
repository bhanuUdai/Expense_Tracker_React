import React from "react";
import classes from './Header.module.css'
const Header=()=>
{
    return(<React.Fragment>
        <header className={classes.header}>
            <ul>
                <li><p>Home</p></li>
                <li><p>Product</p></li>
                <li><p>About Us</p></li>
            </ul>
        </header>
    </React.Fragment>)
}
export default Header;