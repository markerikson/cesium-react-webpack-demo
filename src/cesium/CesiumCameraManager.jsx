import {Component} from "react";

import CesiumMath from "cesium/Source/Core/Math";
import Cartesian3 from "cesium/Source/Core/Cartesian3";

import {isUndefined} from "utils/utils";


export default class CesiumCameraManager extends Component {
    componentDidMount() {
        const {camera} = this.props;

        if(camera) {
            this.handleUpdatedCameraProps({}, this.props.globe, camera);
        }
    }


    componentDidUpdate(prevProps) {
        const {flyToLocation, camera} = this.props;
        if(prevProps.flyToLocation !== flyToLocation) {
            this.handleUpdatedCameraProps(prevProps.flyToLocation, flyToLocation, camera);
        }
    }

    handleUpdatedCameraProps(oldFlyTo, flyToLocation, camera) {
        let newLocationObject = null;

        if(flyToLocation && oldFlyTo !== flyToLocation) {
            newLocationObject = flyToLocation;
        }

        if(newLocationObject) {
            let {lat, lon, alt = undefined, heading, pitch, roll} = newLocationObject;
            const {delay = 0} = newLocationObject;

            let orientation = undefined;

            if(lat === 0.0 && lon === 0.0) {
                // Nobody wants a closeup of the ocean off west Africa
                lat = 35.0;
                lon = -117.0;
                alt = 2500000;
            }

            if(!isUndefined(heading)) {
                orientation = {
                    heading : CesiumMath.toRadians(heading),
                    pitch : CesiumMath.toRadians(pitch),
                    roll : CesiumMath.toRadians(roll),
                };
            }

            camera.flyTo({
                destination : Cartesian3.fromDegrees(lon, lat, alt),
                duration : delay,
                orientation,
            });
        }
    }


    render() {
        return null;
    }
}