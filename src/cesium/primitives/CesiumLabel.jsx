import {Component} from "react";

import Cartesian2 from "cesium/Source/Core/Cartesian2";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import LabelStyle from "cesium/Source/Scene/LabelStyle";
import HorizontalOrigin from "cesium/Source/Scene/HorizontalOrigin";
import VerticalOrigin from "cesium/Source/Scene/VerticalOrigin";

import {shallowEqual} from "utils/utils";


export default class CesiumLabel extends Component {
    componentDidMount() {
        const {labels, offset = "TOP"} = this.props;

        if(labels) {
            const offsetIsTop = offset === "TOP";
            this.label = labels.add({
                eyeOffset : new Cartesian3(0.0, 0.0, -5000.0),
                fillColor : "white",
                horizontalOrigin : HorizontalOrigin.CENTER,
                verticalOrigin : offsetIsTop ? VerticalOrigin.TOP : VerticalOrigin.BOTTOM,
                labelStyle : LabelStyle.FILL,
                font : "20px Helvetica",
                pixelOffset : new Cartesian2(0, offsetIsTop ? 16 : -16),
            });
        }

        this.updateLabel();
    }

    componentDidUpdate(prevProps) {
        if(!shallowEqual(this.props, prevProps)) {
            this.updateLabel();
        }
    }

    updateLabel() {
        const {text = "", lat, lon, alt, show = true} = this.props;

        if(this.label) {
            const newLocation = Cartesian3.fromDegrees(lon, lat, alt);
            
            this.label.position = newLocation;
            this.label.text = text;

            this.label.show = show;
        }
    }

    componentWillUnmount() {
        const {labels} = this.props;

        if(labels && !labels.isDestroyed() && this.label) {
            labels.remove(this.label);
        }
    }

    render() {
        return null;
    }
}
