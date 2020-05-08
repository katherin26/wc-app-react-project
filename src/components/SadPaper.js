

'use strict';

import React from 'react';

export default function SadPaper(props) {
    return (
        <div className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half has-text-centered">
                        <h3 className="has-text-white">{props.message}</h3>
                        <img src={"https://webstockreview.net/images/clipart-paper-cartoon-18.gif"} width="200" height="200" />
                    </div>
                </div>
            </div>
        </div>
    );
}