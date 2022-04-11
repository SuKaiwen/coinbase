import React from 'react';

function CoinDetailSummary(props) {
    return (
        <div className = "col-2">
            <div className = "row">
                <img src = {props.image} alt = {props.name} />
                <h1>{props.name}</h1>
                <h1 className = "gray">{props.symbol.toUpperCase()} / AUD</h1>
            </div>
            <h1 className = "coin-price">A${props.price}</h1>
            <h1>Market Stats</h1>
            <div className = "row">
                <div className = "col-2">
                    <p>Market Rank</p>
                    <h1>#{props.market_cap_rank}</h1>
                    <p>ATH</p>
                    <h1 className = "green">${props.ath}</h1>
                    <p>24H High</p>
                    <h1>${props.high_24}</h1>
                    <p>Price Change 24h</p>
                    {props.price_change_24 < 0 ? 
                        <h1 className = "red">${props.price_change_24.toFixed(2)}</h1>
                        : <h1 className = "green">${props.price_change_24.toFixed(2)}</h1>
                    }
                </div>
                <div className = "col-2">
                    <p>-</p>
                    <h1>-</h1>
                    <p>ATL</p>
                    <h1 className = "red">${props.atl}</h1>
                    <p>24H Low</p>
                    <h1>${props.low_24}</h1>
                    <p>Price % Change 24h</p>
                    {props.price_change_percent_24 < 0 ? 
                        <h1 className = "red">{props.price_change_percent_24.toFixed(2)}%</h1>
                        : <h1 className = "green">{props.price_change_percent_24.toFixed(2)}%</h1>
                    }
                </div>
            </div>
        </div>
    );
}

export default CoinDetailSummary;