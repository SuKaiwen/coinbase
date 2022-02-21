import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Home(props) {

    // Top 4 coins
    const [topCoins, setTopCoins] = useState([]);

    // All remaining coins, this const is used to reset filtered coins back to original value
    // when the user selects "All" button
    const [coins, setCoins] = useState([]);

    // Array to be displayed to the UI
    const [filteredCoins, setFilteredCoins] = useState([]);

    // Filtered keyword
    const [filter, setFilter] = useState("All");

    // Search keyword
    const [search, setSearch] = useState("");

    // Get popular coins
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(result => {
                setTopCoins(result.data.slice(0,4)); 
                setCoins(result.data.slice(4));
                setFilteredCoins(result.data.slice(4));
            })
            .catch(error => {console.log(error)});
    }, []);

    // Button onclick changes the filter value and we catch it here to make adjustments
    useEffect(() => {
        switch (filter) {
            case "All":
              setFilteredCoins(coins);
              break;
            case "Gainers":
              setFilteredCoins(coins.filter(x => x.price_change_24h > 0));
              break;
            case "Losers":
              setFilteredCoins(coins.filter(x => x.price_change_24h < 0));
              break;
            default:
              setFilteredCoins(coins);
          }
    }, [filter]);

    return (
        <div className = "home-container">
            <h1>Home</h1>
            <h2 className = "bold">Popular Coins</h2>
            <div className = "grid">
                {/* Display first four coins which are the most popular */}
                {topCoins.map(coin => {return (
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
                                <p>ATH</p>
                                <h1 className = "gray">${coin.ath}</h1>
                                <p>24H Low</p>
                                <h1 className = "gray">${coin.low_24h}</h1>
                                <p>Price % Change 24h</p>
                                {coin.price_change_percentage_24h < 0 ? 
                                    <h1 className = "red">{coin.price_change_percentage_24h.toFixed(2)}%</h1>
                                    : <h1 className = "green">{coin.price_change_percentage_24h.toFixed(2)}%</h1>
                                }
                            </div>
                        </div>
                        
                        <Link to={`/coin/${coin.id}`}><button className = "btn">View More</button></Link>
                    </div>
                )})}
            </div>

            <h2>Coin List</h2>
            {/* Buttons to change the filter */}
            <div className = "row">
                {filter === "All" ? <button className = "btn-cir-active">All</button> : <button className = "btn-cir" onClick={() => setFilter("All")}>All</button>}
                {filter === "Gainers" ? <button className = "btn-cir-active">Gainers</button> : <button className = "btn-cir" onClick={() => setFilter("Gainers")}>Gainers</button>}
                {filter === "Losers" ? <button className = "btn-cir-active">Losers</button> : <button className = "btn-cir" onClick={() => setFilter("Losers")}>Losers</button>}
            </div>

            {/* The rest of the coins are displayed in table format */}
            <div className = "table">
                <div className = "table-row bold">
                    <div className = "section-name">
                        <p>Name</p>
                    </div>
                    <div className = "section-small">
                        <p>Price</p>
                    </div>
                    <div className = "section-small" id = "high">
                        <p>24h High</p>
                    </div>
                    <div className = "section-small" id = "low">
                        <p>24h Low</p>
                    </div>
                    <div className = "section-small" id = "price-change">
                        <p>Price Change</p>
                    </div>
                    <div className = "section-small" id = "price-change-per">
                        <p>Price Change %</p>
                    </div>
                    <div className = "section-small" id = "last-updated">
                        <p>Last Updated</p>
                    </div>
                    <div className = "section-small" id = "supply">
                        <p>Supply</p>
                    </div>
                    <div className = "section-small" id = "info">
                        <p>More Info</p>
                    </div>
                </div>
                <hr/>
                {filteredCoins.map(coin => {return (
                    <div className = "table-row">
                        <div className = "section-name row">
                            <img src = {coin.image} alt = {coin.name} />
                            <p>{coin.name} | <span className = "gray">{coin.symbol.toUpperCase()} </span></p> 
                            {coin.price_change_percentage_24h < 0 ? 
                                <p className = "red"><i class="fas fa-chevron-down"></i></p>
                                : <p className = "green"><i class="fas fa-chevron-up"></i></p>
                            }
                        </div>
                        <div className = "section-small">
                            <p className = "gray">${coin.current_price}</p>
                        </div>
                        <div className = "section-small" id = "high">
                            <p className = "gray">${coin.high_24h}</p>
                        </div>
                        <div className = "section-small" id = "low">
                            <p className = "gray">${coin.low_24h}</p>
                        </div>
                        <div className = "section-small" id = "price-change">
                            {coin.price_change_percentage_24h < 0 ? 
                                <p className = "red">${coin.price_change_24h.toFixed(2)}</p>
                                : <p className = "green">${coin.price_change_24h.toFixed(2)}</p>
                            }
                        </div>
                        <div className = "section-small" id = "price-change-per">
                            {coin.price_change_percentage_24h < 0 ? 
                                <p className = "red">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                                : <p className = "green">{coin.price_change_percentage_24h.toFixed(2)}%</p>
                            }
                        </div>
                        <div className = "section-small" id = "last-updated">
                            <p>{coin.last_updated.split("T")[0]}</p>
                        </div>
                        <div className = "section-small" id = "supply">
                            <p>{(coin.total_supply/1000000).toFixed(2)}M</p>
                        </div>
                        <div className = "section-small" id = "info">
                            <Link to={`/coin/${coin.id}`}><button className = "btn">View More</button></Link>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}

export default Home;