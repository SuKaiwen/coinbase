import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Search(props) {

    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [load, setLoad] = useState(false);

    // Search a coin
    useEffect(() => {
        try{
            async function searchCoins(){
                // Get the query string...
                const params = new Proxy(new URLSearchParams(window.location.search), {
                    get: (searchParams, prop) => searchParams.get(prop),
                });
                // Get the value of "keyword" in eg "https://example.com/?keyword=some_value"
                let key = params.keyword;
                setKeyword(key); // "some_value"

                let response = await fetch(`https://api.coingecko.com/api/v3/search?query=${key}`);
                if(response.status !== 200){
                    console.log(response.status);
                    setLoad(false);
                }else{
                    response = await response.json();
                    let results = response.coins;
                    setSearchResults(results);
                    console.log(results);
                    setLoad(true);
                }   
            }
            searchCoins();
        }catch(error){
            setLoad(false);
        }

        return () => {
            setLoad(false);
            setSearchResults([]);    
        };
    }, []);

    return (
        <div className = "home-container">
            <h1>Search</h1>
            <p>Showing results for keyword: {keyword}</p>
            {load ?
                <div>
                    {searchResults.length > 0 ? 
                        <div>
                            {/* The rest of the coins are displayed in table format */}
                            <div className = "table">
                                <div className = "table-row bold">
                                    <div className = "section-name">
                                        <p>Name</p>
                                    </div>
                                    <div className = "section-name">
                                        <p>Symbol</p>
                                    </div>
                                    <div className = "section-name">
                                        <p>Market Cap Rank</p>
                                    </div>
                                    <div className = "section-name">
                                        <p>More Info</p>
                                    </div>
                                </div>
                                <hr/>
                                {searchResults.map(coin => {return (
                                    <div className = "table-row">
                                        <div className = "section-name row">
                                            <img src = {coin.thumb} alt = {coin.name} />
                                            <p>{coin.name} | <span className = "gray">{coin.symbol.toUpperCase()}</span></p> 
                                        </div>
                                        <div className = "section-name">
                                            <p className = "gray">${coin.symbol}</p>
                                        </div>
                                        <div className = "section-name" id = "high">
                                            {coin.market_cap_rank ? 
                                                <p className = "gray">#{coin.market_cap_rank}</p>
                                                : <p className = "gray">No Rank</p>
                                            }
                                        </div>
                                        <div className = "section-name" id = "info">
                                            <Link to={`/coin/${coin.id}`}><button className = "btn">View More</button></Link>
                                        </div>
                                    </div>
                                )})}
                            </div>
                        </div>
                        : 
                        <div>
                            <h1>No Results for keyword: {keyword}</h1>
                        </div>
                    }
                </div>
                
            : 
                <div>
                    <h1>Loading...</h1>
                </div>
            }
        </div>
    );
}

export default Search;