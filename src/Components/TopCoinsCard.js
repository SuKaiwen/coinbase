import React from 'react';
import { Link } from 'react-router-dom';

function TopCoinsCard(props) {
    return (
        <div className = "card">
            <img src = {props.image} alt = {props.name} />
            <h1>{props.name} | <span className = "gray">{props.symbol.toUpperCase()}</span></h1> 
            <div className = "row">
                <div className = "col-2">
                    <p>Price</p>
                    <h1 className = "blue">${props.price}</h1>
                    <p>24H High</p>
                    <h1 className = "blue">${props.high_24h}</h1>
                    <p>Price Change 24h</p>
                    {props.price_change_percentage_24h < 0 ? 
                        <h1 className = "red">${props.price_change_24h.toFixed(2)}</h1>
                        : <h1 className = "green">${props.price_change_24h.toFixed(2)}</h1>
                    }
                </div>
                <div className = "col-2">
                    <p>ATH</p>
                    <h1 className = "blue">${props.ath}</h1>
                    <p>24H Low</p>
                    <h1 className = "blue">${props.low_24h}</h1>
                    <p>Price % Change 24h</p>
                    {props.price_change_percentage_24h < 0 ? 
                        <h1 className = "red">{props.price_change_percentage_24h.toFixed(2)}%</h1>
                        : <h1 className = "green">{props.price_change_percentage_24h.toFixed(2)}%</h1>
                    }
                </div>
            </div>
            
            <Link to={`/coin/${props.id}`}><button className = "btn">View More</button></Link>
        </div>
    );
}

export default TopCoinsCard;