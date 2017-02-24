import React, { Component } from 'react';

import Viewer from "cesium/Source/Widgets/Viewer/Viewer";

class App extends Component {
    componentDidMount() {
        this.viewer = new Viewer(this.cesiumContainer);
    }

    render() {
        return (
            <div>
                <div id="cesiumContainer" ref={ element => this.cesiumContainer = element }/>
            </div>
        );
    }
}

export default App;