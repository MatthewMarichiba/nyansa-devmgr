import React from 'react';
import Plot from 'react-plotly.js';
import './HealthChart.scss';
import Devices from '../resources/Devices';

class CpuTraceChart extends React.Component {
    constructor(props) {
        super(props);
        // Put all props we're going to use onto `this`.
        Object.assign(this, {
            devices: props.devices,
            traces: props.traces,
            width: props.width
        });
    }

    render() {
        const top5devices = Devices.getTopFive(this.devices, 'cpuPct');
        const traceData = top5devices.map(dev => ({
            y: this.traces[dev.ip]['cpuPct'],
            type: 'line',
            mode: 'lines',
            name: dev.ip,
        }));

        const layout = {
            title: 'CPU Utilization (%)',
            width: this.width,
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
        };

        return (
            <Plot
                data={traceData}
                layout={layout}
            />
        );
    }
}

export default CpuTraceChart;

