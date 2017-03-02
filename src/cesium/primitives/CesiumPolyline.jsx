import React, {Component} from "react";

import Cartographic from "cesium/Source/Core/Cartographic";
import Color from "cesium/Source/Core/Color";
import Ellipsoid from "cesium/Source/Core/Ellipsoid";
import Material from "cesium/Source/Scene/Material";

import {shallowEqual} from "utils/utils";

export default class CesiumPolyline extends Component {
    componentDidMount() {
        const {polylines, coords} = this.props;

        if(polylines) {
            this.polyline = polylines.add({
                positions : [],
                width : 2,
                material : Material.fromType('Color', {
                    color: Color.BLUE
                }),
            });


            this.updatePolyline();
        }
    }

    componentWillUnmount() {
        const {polylines} = this.props;

        if(polylines && !polylines.isDestroyed() && this.polyline) {
            polylines.remove(this.polyline);
        }
    }

    componentDidUpdate(prevProps) {
        if(!shallowEqual(prevProps, this.props)) {
            this.updatePolyline();
        }
    }

    updatePolyline() {
        const {coords, loop, color = "blue" } = this.props;

        if(this.polyline) {
            const cartographics = coords.map(coord =>
                Cartographic.fromDegrees(coord.lon, coord.lat, coord.alt)
            );

            const cartesians = Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartographics);

            const colorValue = Color.fromCssColorString(color);

            this.polyline.positions = cartesians;
            this.polyline.loop = !!loop;
            this.polyline.material.uniforms.color = colorValue;
        }
    }

    render() {
        return null;
    }
}