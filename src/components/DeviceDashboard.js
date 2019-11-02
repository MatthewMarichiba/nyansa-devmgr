'use strict';
import React from 'react';
import Formatting from '../shared/Formatting';

class DeviceDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.devicesService = props.devicesService;
    }

    renderDeviceRows() {
        const devices = this.devicesService.all();
        return devices.map(device => (
            <React.Fragment key={device.ip}>
                <tr>
                    <td>{device.ip}</td>
                    <td>{device.owner}</td>
                    <td>{device.cpuPct}%</td>
                    <td>{Formatting.bytesToStr(device.memBytes)}</td>
                    <td>{Formatting.bytesToStr(device.networkRxBytes)}</td>
                    <td>{Formatting.bytesToStr(device.networkTxBytes)}</td>
                </tr>
            </React.Fragment>
        ));
    }

    render() {
        return (
            <React.Fragment>
                <h4>Hot Devices</h4>

                <h4>All Devices</h4>
                <table className="table table-bordered table-condensed table-striped table-hover">
                    <thead>
                        <tr>
                            <th className="col-md-2">IP</th>
                            <th className="col-md-2">Owner</th>
                            <th className="col-md-2">CPU</th>
                            <th className="col-md-2">Mem</th>
                            <th className="col-md-2">TX</th>
                            <th className="col-md-2">RX</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderDeviceRows() }
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default DeviceDashboard;

