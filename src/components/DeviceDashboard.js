import React from 'react';
import { find } from 'lodash';
import Formatting from '../shared/Formatting';
import HotDevicesPanel from "./HotDevicesPanel";
import HealthChart from "./HealthChart";
import CpuTraceChart from "./CpuTraceChart";
import './DeviceDashboard.scss';

const hotPanelCutoff = 5;
const panelColumns = 4;

class DeviceDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.devicesService = props.devicesService;
        this.state = {
            devices: this.devicesService.all(),
            selectedDevice: {},
        };
        // Poll for new device data periodically
        setInterval(() => {
            this.setState({ devices: props.devicesService.all() });
        }, 1500);

        this.openChangeOwnerModal = this.openChangeOwnerModal.bind(this);
    }

    openChangeOwnerModal(ip) {
        const device = find(this.state.devices, { ip });
        this.setState({
            selectedDevice: device,
        });
        document.querySelector('#newOwnerName').value = device.owner;
        // TODO: Below isn't bootstrap's recommended way to show/hide Modals.
        //  They suggest this form: $('#modalId').modal('show')
        //  I had some glitches with bootstrap/jquery/react integration. For expediency, I'm leaving it for now.
        document.querySelector('#changeOwnerModal').style.display = "block";
    }
    cancelChangeOwnerModal() {
        document.querySelector('#changeOwnerModal').style.display = "none";
    }
    acceptChangeOwnerModal() {
        document.querySelector('#changeOwnerModal').style.display = "none";
        const newName = document.querySelector('#newOwnerName').value;
        this.devicesService.updateDevice(this.state.selectedDevice.ip, { owner: newName });
        this.setState({ devices: this.devicesService.all() });
    }

    renderDeviceRows() {
        return this.state.devices.map(device => (
            <React.Fragment key={device.ip}>
                <tr>
                    <td>{device.ip}</td>
                    <td className="owner" onClick={() => this.openChangeOwnerModal(device.ip)}>
                        {device.owner}
                        <span className="show-on-hover glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </td>
                    <td>{Formatting.percent(device.cpuPct)}</td>
                    <td>{Formatting.bytesToStr(device.memBytes, 2)}</td>
                    <td>{Formatting.bytesToStr(device.networkRxBytes, 2)}</td>
                    <td>{Formatting.bytesToStr(device.networkTxBytes, 2)}</td>
                </tr>
            </React.Fragment>
        ));
    }

    render() {
        const defaultPanelOptions = {
            devices: this.state.devices,
            cutoff: hotPanelCutoff,
            columns: panelColumns,
            openChangeOwnerModal: this.openChangeOwnerModal
        };
        return (
            <div className="DeviceDashboard">
                <h4>Hot Devices</h4>
                <div className="container">
                    <div className="row">
                        <HotDevicesPanel
                            {...defaultPanelOptions}
                            hotAttribute={'cpuPct'}
                            attributeLabel={'CPU'}
                            attributeFormatter={Formatting.percent}
                            threshold={50}
                        ></HotDevicesPanel>
                        <HotDevicesPanel
                            {...defaultPanelOptions}
                            hotAttribute={'memBytes'}
                            attributeLabel={'Memory'}
                            attributeFormatter={Formatting.bytesToStr}
                            threshold={10 * 1024 * 1024 * 1024 /* 10GB */}
                        ></HotDevicesPanel>
                        <HotDevicesPanel
                            {...defaultPanelOptions}
                            hotAttribute={'networkTxBytes'}
                            attributeLabel={'TX'}
                            attributeFormatter={Formatting.bytesToStr}
                            threshold={70 * 1024 * 1024 /* 70MB */}
                        ></HotDevicesPanel>
                        <HotDevicesPanel
                            {...defaultPanelOptions}
                            hotAttribute={'networkRxBytes'}
                            attributeLabel={'RX'}
                            attributeFormatter={Formatting.bytesToStr}
                            threshold={70 * 1024 * 1024 /* 70MB */}
                        ></HotDevicesPanel>
                    </div>
                    <div className="row">
                        <HealthChart devices={this.state.devices}></HealthChart>
                        <CpuTraceChart devices={this.state.devices}></CpuTraceChart>
                    </div>
                </div>
                <h4>All Devices</h4>
                <table className="table table-bordered table-condensed table-striped table-hover DevicesDashboard__table">
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

                <div id="changeOwnerModal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={() => this.cancelChangeOwnerModal()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Change name for "{this.state.selectedDevice.owner}"</h4>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="newOwnerName">New name:</label>
                                <input id="newOwnerName" type="text" defaultValue={this.state.selectedDevice.owner}></input>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"
                                        onClick={() => this.cancelChangeOwnerModal()}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={() => this.acceptChangeOwnerModal()}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeviceDashboard;
