import React from 'react';
import Buy from "../../../containers/Buy.js";
export default class Sifa extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buy c="司法拍卖" k="sifa">
                <div>
                    <h1>司法拍卖</h1>
                </div>
            </Buy>
        );
    }
}
