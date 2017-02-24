import React, { Component } from 'react';


import CesiumGlobe from "./cesium/CesiumGlobe";


class App extends Component {
    state = {logoCoords : null}

    onMoveLogoClicked = () => {
        const logoCoords = {lat : 39.097465, lon : -84.50703};
        this.setState({logoCoords});
    }

    render() {
        const {logoCoords} = this.state;

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
                <CesiumGlobe logoCoords={logoCoords} />
                <div style={{position : "fixed", top : 0}}>
                    <div style={{color : "white", fontSize: 40, }}>
                        Text Over the Globe
                    </div>
                    <button
                        onClick={this.onMoveLogoClicked}
                        style={{fontSize: 40}}
                    >
                        Move Logo
                    </button>
                </div>

            </div>
        );
    }
}

export default App;
