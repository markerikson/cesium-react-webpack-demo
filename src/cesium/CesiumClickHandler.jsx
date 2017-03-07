import {Component} from "react";

import ScreenSpaceEventHandler from "cesium/Source/Core/ScreenSpaceEventHandler";
import SSET from "cesium/Source/Core/ScreenSpaceEventType";
import CesiumMath from "cesium/Source/Core/Math";

import {noop} from "utils/utils";

export default class CesiumClickHandler extends Component {
    static defaultProps = {
        onLeftClick : noop
    }

    componentDidMount() {
        const {scene} = this.props;

        if(scene && scene.canvas) {
            this.screenEvents = new ScreenSpaceEventHandler(scene.canvas);
            this.createInputHandlers();
        }
    }

    componentWillUnmount() {
        if(this.screenEvents && !this.screenEvents.isDestroyed()) {
            this.screenEvents.destroy();
        }
    }

    createInputHandlers() {
        this.screenEvents.setInputAction(this.onMouseLeftClick, SSET.LEFT_CLICK);
    }

    onMouseLeftClick = (e) => {
        const {position : clientPos} = e;
        const mapCoordsRadians = this.pickMapCoordinates(clientPos);

        if(mapCoordsRadians) {
            const mapCoordsDegrees = {
                lat : CesiumMath.toDegrees(mapCoordsRadians.latitude),
                lon : CesiumMath.toDegrees(mapCoordsRadians.longitude),
            };

            this.props.onLeftClick(mapCoordsDegrees);
        }
    }


    pickMapCoordinates(screenPos) {
        const {scene} = this.props;
        let mapCoords;

        if(scene) {
            const cartesianPos = scene.camera.pickEllipsoid(screenPos);

            if(cartesianPos) {
                mapCoords = scene.globe.ellipsoid.cartesianToCartographic(cartesianPos);
            }
        }

        return mapCoords;
    }


    render() {
        return null;
    }
}
