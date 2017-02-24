import React, { Component } from 'react';


import CesiumGlobe from "./cesium/CesiumGlobe";


class App extends Component {
    render() {
        return (
            <div>
                <CesiumGlobe />
            </div>
        );
    }
}

export default App;
