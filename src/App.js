import React, { Component } from 'react';


import CesiumGlobe from "./cesium/CesiumGlobe";


class App extends Component {
    render() {
        const containerStyle = {
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
        };

        return (
            <div style={containerStyle}>
                <CesiumGlobe/>
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
