import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
    return (
        <div className = "nav">
            <div className = "row">
                <h1 className = "blue link"><a href="/">coinbased</a></h1>
                <form method="get" action="/search/">
                    <input type="text" id="keyw" name="keyword" placeholder="Search a coin..." />
                </form>
            </div>
            <a href = "/"><p>Home</p></a>
        </div>
    );
}

export default Nav;