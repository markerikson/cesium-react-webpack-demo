import React, {Component} from "react";

import BillboardCollection from "cesium/Source/Scene/BillboardCollection";

import CesiumBillboard from "./primitives/CesiumBillboard";

export class CesiumProjectContents extends Component {
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

    render() {
        const {icons = []} = this.props;

        const renderedBillboards = icons.map( (icon, index) =>
            <CesiumBillboard
                {...icon}
                billboards={this.billboards}
                key={index}
            />
        );


        return (
            <span>
                {renderedBillboards}
            </span>
        );
    }
}


export default CesiumProjectContents;
