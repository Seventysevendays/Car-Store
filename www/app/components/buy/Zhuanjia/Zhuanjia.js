import React from 'react';
import Buy from "../../../containers/Buy.js";
export default class Zhuanjia extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buy c="专家荐车" k="zhuanjia">
                <div>
                    <h1>专家荐车</h1>
                </div>
            </Buy>
        );
    }
}
