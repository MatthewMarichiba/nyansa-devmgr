import React from 'react';
import Plot from 'react-plotly.js';
import './HealthChart.scss';
import Devices from '../resources/Devices';

class CpuTraceChart extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const top5devices = Devices.getTopFive(this.props.devices, 'cpuPct');
        const traceData = top5devices.map(dev => {
            const devCpuTrace = this.props.traces[dev.ip]['cpuPct'];
            return {
                y: devCpuTrace,
                type: 'line',
                mode: 'lines',
                name: dev.ip,
            };
        });

        const layout = {
            title: 'CPU Utilization (%)',
            height: 300,
            width: this.props.width,
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

