import React from 'react';
import Plot from 'react-plotly.js';
import Devices from '../resources/Devices';

class TxTotalChart extends React.Component {
    constructor(props) {
        super(props);
        // Put all props we're going to use onto `this`.
        Object.assign(this, {
            devices: props.devices,
            width: props.width
        });
    }

    render() {
        const top5devices = Devices.getTopFive(this.devices, 'cpuPct');
        const traceData = top5devices.map(dev => ({
            y: dev.traces['networkTxBytes'],
            type: 'bar',
            name: dev.ip,
        }));
        console.log(traceData);

        const layout = {
            title: 'Total TX Bandwidth',
            width: this.width,
            height: 300,
            barmode: 'stack',
            showlegend: false,
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
                showticklabels: true,
                autorange: true,
            },
        };

        return (
            <Plot
                data={traceData}
                layout={layout}
            />
        );
    }
}

export default TxTotalChart;

