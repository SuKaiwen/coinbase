import React from 'react';

function Nav(props) {
    return (
        <div className = "nav">
            <div className = "row">
                <h1 className = "blue">coinbased</h1>
                <form>
                    <input type="text" id="fname" name="firstname" placeholder="Search a coin..." />
                </form>
            </div>
            <p>Home</p>
        </div>
    );
}

export default Nav;