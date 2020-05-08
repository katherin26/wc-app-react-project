'use strict';

import React from 'react';

export default function ViewMoreBtn(props) {
    return (
        <div className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half has-text-centered">
                        <button className="button is-link is-inverted is-outlined" onClick={e => props.clickHandler(e)}>View More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}