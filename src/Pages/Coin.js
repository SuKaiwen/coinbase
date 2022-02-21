import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import CoinChart from '../Components/CoinChart';

function Coin(props) {

    const { slug } = useParams();
    const [coinInfo, setCoinInfo] = useState([]);
    const [prevChanges, setPrevChanges] = useState([]);
    const [graphInfo, setGraphInfo] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        try {
            async function fetchCoinInfo(){
                let response = await fetch(`https://api.coingecko.com/api/v3/coins/${slug}`);
                if(response.status !== 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setCoinInfo(response);
                    setPrevChanges([
                        {
                            title: "Change 7D",
                            value:response.market_data.price_change_percentage_7d.toFixed(2)
                        },
                        {
                            title: "Change 14D",
                            value:response.market_data.price_change_percentage_14d.toFixed(2)
                        },
                        {
                            title: "Change 30D",
                            value:response.market_data.price_change_percentage_30d.toFixed(2)
                        },
                        {
                            title: "Change 60D",
                            value:response.market_data.price_change_percentage_60d.toFixed(2)
                        },
                        {
                            title: "Change 1Y",
                            value:response.market_data.price_change_percentage_1y.toFixed(2)
                        }
                    ]);
                    console.log(response);
                    setLoad(true);
                }
            }
            fetchCoinInfo();
        } catch (error) {
            console.log(error);
            setLoad(false);
        }

        return () => {
            setLoad(false);
            setCoinInfo([]);    
        };
    }, []);

    useEffect(() => {
        try {
            async function fetchCoinGraph(){
                let response = await fetch(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=aud&days=30`);
                if(response.status !== 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setGraphInfo(response.prices);
                }
            }
            fetchCoinGraph();
        } catch (error) {
            console.log(error);
            setLoad(false);
        }

        return () => {
            setLoad(false);
            setGraphInfo([]);    
        };
    }, []);

    return (
        <div className = "home-container">
            {load ? 
                <div className = "coin-page">
                    <p className = "gray">coinbased - {coinInfo.name.toLowerCase()}</p>
                    <div className = "row" id = "coin-main-row">
                        <div className = "col-2">
                            <div className = "row">
                                <img src = {coinInfo.image.small} alt = {coinInfo.name} />
                                <h1>{coinInfo.name}</h1>
                                <h1 className = "gray">{coinInfo.symbol.toUpperCase()} / AUD</h1>
                            </div>
                            <h1 className = "coin-price">A${coinInfo.market_data.current_price.aud}</h1>
                            <h1>Market Stats</h1>
                            <div className = "row">
                                <div className = "col-2">
                                    <p className = "gray">Market Rank</p>
                                    <h1>#{coinInfo.market_cap_rank}</h1>
                                    <p className = "gray">ATH</p>
                                    <h1 className = "green">${coinInfo.market_data.ath.aud}</h1>
                                    <p className = "gray">24H High</p>
                                    <h1>${coinInfo.market_data.high_24h.aud}</h1>
                                    <p>Price Change 24h</p>
                                    {coinInfo.market_data.price_change_24h_in_currency.aud < 0 ? 
                                        <h1 className = "red">${coinInfo.market_data.price_change_24h_in_currency.aud.toFixed(2)}</h1>
                                        : <h1 className = "green">${coinInfo.market_data.price_change_24h_in_currency.aud.toFixed(2)}</h1>
                                    }
                                </div>
                                <div className = "col-2">
                                    <p className = "gray">-</p>
                                    <h1>-</h1>
                                    <p className = "gray">ATL</p>
                                    <h1 className = "red">${coinInfo.market_data.atl.aud}</h1>
                                    <p className = "gray">24H Low</p>
                                    <h1>${coinInfo.market_data.low_24h.aud}</h1>
                                    <p className = "gray">Price % Change 24h</p>
                                    {coinInfo.market_data.price_change_24h_in_currency.aud < 0 ? 
                                        <h1 className = "red">{coinInfo.market_data.price_change_percentage_24h.toFixed(2)}%</h1>
                                        : <h1 className = "green">{coinInfo.market_data.price_change_percentage_24h.toFixed(2)}%</h1>
                                    }
                                </div>
                            </div>
                            
                        </div>
                        <div className = "col-2">
                            <h1>Market Chart</h1>
                            <CoinChart data = {graphInfo}/>
                        </div>
                    </div>
                    <h1>Previous Changes</h1>
                    <div className = "row" id = "coin-changes">
                        {prevChanges.map(change => {return (
                            <div className = "coin-card">
                                <p>{change.title}</p>
                                {change.value < 0 ? 
                                    <h1 className = "red">{change.value}% <i class="fas fa-chevron-down"></i></h1>
                                    : <h1 className = "green">{change.value}% <i class="fas fa-chevron-up"></i></h1>
                                }
                            </div>
                        )})}
                    </div>
                </div>
            : <h1>Loading...</h1>
            }
        </div>
    );
}

export default Coin;