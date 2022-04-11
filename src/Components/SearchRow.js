import React from 'react';
import { Link } from 'react-router-dom';

function SearchRow(props) {
    return (
        <div className = "search-row">
            <div className = "search-column">
                <img src = {props.thumb} alt = {props.name} />
                <p>{props.name}</p> 
            </div>
            <div className = "search-column" id = "collapse">
                <p className = "gray">${props.symbol}</p>
            </div>
            <div className = "search-column" id = "collapse">
                {props.market_cap_rank ? 
                    <p className = "gray">#{props.market_cap_rank}</p>
                    : <p className = "gray">No Rank</p>
                }
            </div>
            <div className = "search-column flex-end">
                <Link to={`/coin/${props.id}`}><button className = "btn">View More</button></Link>
            </div>
        </div>
    );
}

export default SearchRow;