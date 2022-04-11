import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

// Components
import ChangeCard from '../Components/ChangeCard';
import CoinDetailSummary from '../Components/CoinDetailSummary';

import CoinChart from '../Components/CoinChart';

function Coin(props) {

    const { slug } = useParams();

    // Holds generic info like price and name
    const [coinInfo, setCoinInfo] = useState([]);

    // Holds the price changes within the last 7, 14, 30, 60, 365 days
    const [prevChanges, setPrevChanges] = useState([]);

    // Holds graph info to pass into React Chart JS 2 line graph
    const [graphInfo, setGraphInfo] = useState([]);
    const [graphInfo90d, setGraphInfo90d] = useState([]);
    const [graphInfo180d, setGraphInfo180d] = useState([]);

    // Setting to select which graph to view
    const [timeSetting, setTimeSetting] = useState("180d");

    // Loading stuff
    const [load, setLoad] = useState(false);
    const [chartLoad, setChartLoad] = useState(false);

    // New description after filtering any html tags such as <a> and <p>
    const [filteredDesc, setFilteredDesc] = useState('');

    // Function to remove <a> tags in description
    function filterDesc(desc){
        var newDesc = desc.replace(new RegExp('<[^>]*>', 'g'), '');
        setFilteredDesc(newDesc);
    }

    // Get coin info
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
                    filterDesc(response.description.en);
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

    // Get market info for the line chart
    // Calls 3 APIS for 30, 90 and 180 days
    useEffect(() => {
        try {
            async function fetchCoinGraph(){
                let response = await fetch(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=aud&days=30`);
                let response90d = await fetch(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=aud&days=90`);
                let response180d = await fetch(`https://api.coingecko.com/api/v3/coins/${slug}/market_chart?vs_currency=aud&days=180`);

                if(response.status !== 200 || response90d.status !== 200 || response180d.status !== 200){
                    console.log(response.status);
                    setChartLoad(false);
                }else{
                    response = await response.json();
                    response90d = await response90d.json();
                    response180d = await response180d.json();

                    setGraphInfo(response.prices);
                    setGraphInfo90d(response90d.prices);
                    setGraphInfo180d(response180d.prices);
                    setChartLoad(true);
                }
            }
            fetchCoinGraph();
        } catch (error) {
            console.log(error);
            setLoad(false);
            setChartLoad(false);
        }

        return () => {
            setLoad(false);
            setChartLoad(false);  
            setGraphInfo([]);  
        };
    }, []);

    return (
        <div className = "home-container">
            {load ? 
                <div className = "coin-page">
                    <p className = "gray">coinbased - {coinInfo.name.toLowerCase()}</p>
                    <div className = "row" id = "coin-main-row">

                        {/* Summary Component LHS bar */}
                        <CoinDetailSummary
                            image = {coinInfo.image.small}
                            name = {coinInfo.name}
                            symbol = {coinInfo.symbol}
                            price = {coinInfo.market_data.current_price.aud}
                            market_cap_rank = {coinInfo.market_cap_rank}
                            ath = {coinInfo.market_data.ath.aud}
                            atl = {coinInfo.market_data.atl.aud}
                            high_24h = {coinInfo.market_data.high_24h.aud}
                            low_24 = {coinInfo.market_data.low_24h.aud}
                            price_change_24 = {coinInfo.market_data.price_change_24h_in_currency.aud}
                            price_change_percent_24 = {coinInfo.market_data.price_change_percentage_24h}
                        />

                        {/* Line Chart Component */}
                        <div className = "col-2">
                            <h1>Market Chart</h1>
                            {/* Buttons to select which timeframe to view */}
                            <div className = "row">
                                {timeSetting === "30d" ? <button className = "btn-cir-active">30d</button> : <button className = "btn-cir" onClick={() => setTimeSetting("30d")}>30d</button>}
                                {timeSetting === "90d" ? <button className = "btn-cir-active">90d</button> : <button className = "btn-cir" onClick={() => setTimeSetting("90d")}>90d</button>}
                                {timeSetting === "180d" ? <button className = "btn-cir-active">180d</button> : <button className = "btn-cir" onClick={() => setTimeSetting("180d")}>180d</button>}
                            </div>

                            {/* Depending on time frame display the correct chart */}
                            {chartLoad ? 
                                <div>
                                    {timeSetting === "30d" ? <CoinChart data = {graphInfo}/> :
                                        <div>
                                            {timeSetting === "90d" ? <CoinChart data = {graphInfo90d}/> :
                                                <div>
                                                    <CoinChart data = {graphInfo180d}/>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    <h1>Loading Chart...</h1>
                                </div>
                            }
                        </div>
                    </div>
                    
                    <h1>Previous Changes</h1>
                    <div className = "row" id = "coin-changes">
                        {prevChanges.map(change => {return (
                            <ChangeCard
                                title = {change.title}
                                value = {change.value}
                            />
                        )})}
                    </div>
                    
                    <h1>About {coinInfo.name}</h1>
                    <p className = "gray">{filteredDesc}</p>
                </div>
            : <h1>Loading...</h1>
            }
        </div>
    );
}

export default Coin;