import React from 'react';

function Coincard(props) {
    return (
        <div className = "coin-card">
            <p>{props.title}</p>
            {props.value < 0 ? 
                <h1 className = "red">{props.value}% <i class="fas fa-chevron-down"></i></h1>
                : <h1 className = "green">{props.value}% <i class="fas fa-chevron-up"></i></h1>
            }
        </div>
    );
}

export default Coincard;