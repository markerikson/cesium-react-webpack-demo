import React, {Component} from "react";

import Cartesian3 from "cesium/Source/Core/Cartesian3";
import BillboardCollection from "cesium/Source/Scene/BillboardCollection";

import logo from "../logo.svg";

export default class CesiumBillboardExample extends Component {
    constructor(props) {
        super(props);

        this.billboards = new BillboardCollection();

        const {scene} = props;

        if(scene) {
            scene.primitives.add(this.billboards);
        }
    }

    componentWillUnmount() {
        const {billboards} = this;

        if(!billboards.isDestroyed()) {
            billboards.destroy();
        }

        const {scene} = this.props;

        if(scene && !scene.isDestroyed() && scene.primitives) {
            scene.primitives.remove(billboards);
        }
    }

    componentDidMount() {
        const lat = 37.484505, lon = -122.147877;
        const position = Cartesian3.fromDegrees(lon, lat);

        this.billboard = this.billboards.add({
            position,
            image : logo,
        });
    }

    render() {
        return null;
    }
}