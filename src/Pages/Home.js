import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import TopCoinsCard from '../Components/TopCoinsCard';
import TableRow from '../Components/TableRow';

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

    // Pagination
    const [page, setPage] = useState(1);

    // Get popular coins
    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=20&page=1&sparkline=false')
            .then(result => {
                setTopCoins(result.data.slice(0,4)); 
                setCoins(result.data.slice(4));
                setFilteredCoins(result.data.slice(4));
            })
            .catch(error => {console.log(error)});
    }, []);

    useEffect(() => {
        console.log(page);
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`)
            .then(result => {
                setCoins(result.data);
                setFilteredCoins(result.data);
            })
            .catch(error => {console.log(error)});
    }, [page]);

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
                    <TopCoinsCard
                        image = {coin.image}
                        name = {coin.name}
                        symbol = {coin.symbol}
                        price = {coin.current_price}
                        high_24h = {coin.high_24h}
                        low_24h = {coin.low_24h}
                        price_change_percentage_24h = {coin.price_change_percentage_24h}
                        price_change_24h = {coin.price_change_24h}
                        ath = {coin.ath}
                        id = {coin.id}
                    />
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
                        <p>Change %</p>
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
                    <TableRow 
                        image = {coin.image}
                        name = {coin.name}
                        symbol = {coin.symbol}
                        price_change_percentage_24h = {coin.price_change_percentage_24h}
                        current_price = {coin.current_price}
                        high_24h = {coin.high_24h}
                        low_24h = {coin.low_24h}
                        price_change_24h = {coin.price_change_24h}
                        last_updated = {coin.last_updated}
                        total_supply = {coin.total_supply}
                        id = {coin.id}
                    />
                )})}
            </div>

            {/* Pagination Component */}
            {page === 1 ?
                <div className = "row justify-cen">
                    <button className = "number"><i class="fas fa-chevron-left"></i></button>
                    <button className = "number number-active">1</button>
                    <button onClick = {() => setPage(2)} className = "number">2</button>
                    <button onClick = {() => setPage(3)} className = "number">3</button>
                    <button onClick = {() => setPage(2)} className = "number"><i class="fas fa-chevron-right"></i></button>
                </div> :
                <div className = "row justify-cen">
                    <button onClick = {() => setPage(page - 1)} className = "number"><i class="fas fa-chevron-left"></i></button>
                    <button onClick = {() => setPage(page - 1)}className = "number">{page - 1}</button>
                    <button className = "number number-active">{page}</button>
                    <button onClick = {() => setPage(page + 1)} className = "number">{page + 1}</button>
                    <button onClick = {() => setPage(page + 1)} className = "number"><i class="fas fa-chevron-right"></i></button>
                </div>
            }
        </div>
    );
}

export default Home;