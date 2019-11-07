import React from 'react';
import Plot from 'react-plotly.js';
import './HealthChart.scss';
import Devices from '../resources/Devices';

class HealthChart extends React.Component {
    constructor(props) {
        super(props);
        // Put all props we're going to use onto `this`.
        Object.assign(this, {
            devices: props.devices,
        });
    }

    healthVal() {
        const devices = this.state.devices;
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
        // const data = this.devices.map(dev => dev.traces['cpuPct']);
        const top5devices = Devices.getTopFive(this.devices, 'cpuPct');
        const traceData = top5devices.map(dev => ({
            y: dev.traces['cpuPct'],
            type: 'line',
            mode: 'lines',
            name: dev.ip,
        }));

        const layout = {
            title: 'CPU Utilization (%)',
            width: 600,
            height: 300,
            xaxis: {
                showgrid: false,
                showline: false,
                zeroline: false,
                range: [0, 19],
                autorange: false,
                showticklabels: false
            },
            yaxis: {
                showgrid: true,
                showline: true,
                range: [0, 100]
            },
            // margin: { t: 0, b: 0, l:0, r:0 },
        };

        return (
            <Plot
                data={traceData}
                layout={layout}
            />
        );
    }
}

export default HealthChart;

