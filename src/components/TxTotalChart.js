import React from 'react';
import Plot from 'react-plotly.js';
import Devices from '../resources/Devices';

class TxTotalChart extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const top5devices = Devices.getTopFive(this.props.devices, 'cpuPct');
        const traceData = top5devices.map(dev => {
            const devTxTrace = this.props.traces[dev.ip]['networkTxBytes'];
            return {
                y: devTxTrace,
                type: 'bar',
                name: dev.ip,
            };
        });

        const layout = {
            title: 'Total TX Bandwidth',
            width: this.props.width,
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

