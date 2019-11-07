import React from 'react';
import Plot from 'react-plotly.js';
import './HealthChart.scss';

class HealthChart extends React.Component {
    constructor(props) {
        super(props);
        // Put all props we're going to use onto `this`.
        Object.assign(this, {
            devices: props.devices,
            width: props.width
        });
    }

    healthVal() {
        const devices = this.devices;
        const txAvg = devices.reduce((acc, dev) => acc += dev.networkTxBytes, 0) / devices.length;
        const rxAvg = devices.reduce((acc, dev) => acc += dev.networkRxBytes, 0) / devices.length;
        return txAvg / rxAvg;
    }
    barColor(value) {
        if (value > 1.25) {
            return "red";
        }
        if (value > 1.0) {
            return "orange";
        }
        return "green";
    }

    render() {
        const value = this.healthVal();
        const color = this.barColor(value);
        const data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value,
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                        axis: { range: [0, 1.5], visible: false },
                        bar: { color },
                        borderwidth: 1,
                        bordercolor: "lightgray",
                        steps: [
                            { range: [1.0, 1.25], color: "lightgray" },
                            { range: [1.25, 1.5], color: "gray"}
                        ],
                        threshold: {
                            line: { color: "black", width: 2 },
                            thickness: 4,
                            value: 1.0
                        }
                    }
                },
            ];

        const layout = {
            title: 'System Health (Tx/Rx)',
            width: this.width,
            height: 300,
            transition: {
                duration: 500,
                easing: 'cubic-in-out'
            }
        };

        return (
            <Plot
                data={data}
                layout={layout}
            />
        );
    }
}

export default HealthChart;

