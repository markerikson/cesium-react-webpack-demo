import React, { Component } from 'react';


import CesiumGlobe from "./cesium/CesiumGlobe";

import reactLogo from "logo.svg";
import redsLogo from "./redsLogo.png";


class App extends Component {
    state = {
        reactLogo : {lat : 37.484505, lon : -122.147877, image : reactLogo},
        redsLogo : { lat : 39.097465, lon : -84.50703, image : redsLogo, scale : 0.3}
    }


    render() {
        const {reactLogo, redsLogo} = this.state;

        const containerStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
        };

        const icons = [reactLogo, redsLogo];

        return (
            <div style={containerStyle}>
                <CesiumGlobe icons={icons} />
                <div style={{position : "fixed", top : 0}}>
                    <div style={{color : "white", fontSize: 40, }}>
                        Text Over the Globe
                    </div>
                </div>

            </div>
        );
    }
}

export default App;
