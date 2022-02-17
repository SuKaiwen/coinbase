import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Home(props) {

    const [market, setMarket] = useState([]);

    // Get popular coins
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(result => {setMarket(result.data); console.log(result.data)})
            .catch(error => {console.log(error)});
    }, []);

    return (
        <div className = "home-container">
            <h1>Home</h1>
            <h2>Popular Coins</h2>
            <div className = "grid">
                {/* Get the first four coins which are the most popular */}
                {market.slice(0, 4).map(coin => {return (
                    <div className = "card">
                        <img src = {coin.image} alt = {coin.name} />
                        <h1>{coin.name} | <span className = "gray">{coin.symbol.toUpperCase()}</span></h1> 
                        <div className = "row">
                            <div className = "col-2">
                                <p>Price</p>
                                <h1 className = "gray">${coin.current_price}</h1>
                                <p>24H High</p>
                                <h1 className = "gray">${coin.high_24h}</h1>
                                <p>Price Change 24h</p>
                                {coin.price_change_percentage_24h < 0 ? 
                                    <h1 className = "red">${coin.price_change_24h.toFixed(2)}</h1>
                                    : <h1 className = "green">${coin.price_change_24h.toFixed(2)}</h1>
                                }
                            </div>
                            <div className = "col-2">
                                <p>24H Low</p>
                                <h1 className = "gray">${coin.low_24h}</h1>
                                <p>24H Low</p>
                                <h1 className = "gray">${coin.low_24h}</h1>
                                <p>Price % Change 24h</p>
                                {coin.price_change_percentage_24h < 0 ? 
                                    <h1 className = "red">{coin.price_change_percentage_24h.toFixed(2)}%</h1>
                                    : <h1 className = "green">{coin.price_change_percentage_24h.toFixed(2)}%</h1>
                                }
                            </div>
                        </div>
                        
                        <button className = "btn">View More</button>
                    </div>
                )})}
            </div>
            <h2>Coin List</h2>
            {/* The rest of the coins are displayed in table format */}
            <div className = "table">
                <div className = "table-row">
                    <div className = "section-name">
                        <p>Name</p>
                    </div>
                    <div className = "section-price">
                        <p>Price</p>
                    </div>
                    <div className = "section-price" id = "high">
                        <p>24h High</p>
                    </div>
                    <div className = "section-price" id = "low">
                        <p>24h Low</p>
                    </div>
                    <div className = "section-price" id = "price-change">
                        <p>24h Price Change</p>
                    </div>
                    <div className = "section-price" id = "price-change-per">
                        <p>24h Price Change %</p>
                    </div>
                    <div className = "section-price" id = "last-updated">
                        <p>Last Updated</p>
                    </div>
                    <div className = "section-price" id = "supply">
                        <p>Supply</p>
                    </div>
                    <div className = "section-price end" id = "info">
                        <p>More Info</p>
                    </div>
                </div>
                <hr/>
                {market.slice(4).map(coin => {return (
                    <div className = "table-row">
                        <div className = "section-name row">
                            <img src = {coin.image} alt = {coin.name} />
                            <p>{coin.name} | <span className = "gray">{coin.symbol.toUpperCase()}</span></p> 
                        </div>
                        <div className = "section-price">
                            <p className = "gray">${coin.current_price}</p>
                        </div>
                        <div className = "section-price" id = "high">
                            <p className = "gray">${coin.high_24h}</p>
                        </div>
                        <div className = "section-price" id = "low">
                            <p className = "gray">${coin.low_24h}</p>
                        </div>
                        <div className = "section-price" id = "price-change">
                            {coin.price_change_percentage_24h < 0 ? 
                                <p className = "red">${coin.price_change_24h.toFixed(2)}</p>
                                : <p className = "green">${coin.price_change_24h.toFixed(2)}</p>
                            }
                        </div>
                        <div className = "section-price" id = "price-change-per">
                            {coin.price_change_percentage_24h < 0 ? 
                                <p className = "red">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                : <p className = "green">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                            }
                        </div>
                        <div className = "section-price" id = "last-updated">
                            <p>{coin.last_updated.split("T")[0]}</p>
                        </div>
                        <div className = "section-price" id = "supply">
                            <p>{(coin.total_supply/1000000).toFixed(2)}M</p>
                        </div>
                        <div className = "section-price" id = "info">
                            <button className = "btn">More Info</button>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}

export default Home;