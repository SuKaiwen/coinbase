import React from 'react';
import { Link } from 'react-router-dom';

function TableRow(props) {

    // Formats in M, B, T or Q
    const formatPrice = (supply) => {
        let suffix = ["M", "B", "T", "Q"]
        let suffix_count = 0;

        while(supply > 1000){
            if(supply < 1000) {
                break;
            }

            if(suffix_count > 3){
                break;
            }

            suffix_count++;
            supply = supply/1000;
        }
        
        return supply.toFixed(2).toString().concat(suffix[suffix_count]);
    }

    return (
        <div className = "table-row">
            <div className = "section-name row">
                <img src = {props.image} alt = {props.name} />
                <p>{props.name} | <span className = "gray">{props.symbol.toUpperCase()} </span></p> 
                {props.price_change_percentage_24h < 0 ? 
                    <p className = "red"><i class="fas fa-chevron-down"></i></p>
                    : <p className = "green"><i class="fas fa-chevron-up"></i></p>
                }
            </div>
            <div className = "section-small">
                <p className = "gray">${props.current_price}</p>
            </div>
            <div className = "section-small" id = "high">
                <p className = "gray">${props.high_24h}</p>
            </div>
            <div className = "section-small" id = "low">
                <p className = "gray">${props.low_24h}</p>
            </div>
            <div className = "section-small" id = "price-change">
                {props.price_change_percentage_24h < 0 ? 
                    <p className = "red">${props.price_change_24h.toFixed(2)}</p>
                    : <p className = "green">${props.price_change_24h.toFixed(2)}</p>
                }
            </div>
            <div className = "section-small" id = "price-change-per">
                {props.price_change_percentage_24h < 0 ? 
                    <p className = "red">{props.price_change_percentage_24h.toFixed(2)}%</p>
                    : <p className = "green">{props.price_change_percentage_24h.toFixed(2)}%</p>
                }
            </div>
            <div className = "section-small" id = "last-updated">
                <p>{props.last_updated.split("T")[0]}</p>
            </div>
            <div className = "section-small" id = "supply">
                <p>{formatPrice(props.total_supply/1000000)}</p>
            </div>
            <div className = "section-small" id = "info">
                <Link to={`/coin/${props.id}`}><button className = "btn">View More</button></Link>
            </div>
        </div>
    );
}

export default TableRow;