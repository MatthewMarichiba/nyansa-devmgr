import React from 'react';
import { sortBy } from 'lodash';
import './HotDevicesPanel.scss';

class HotDevicesPanel extends React.Component {
    constructor(props) {
        super(props);
        // Put all props we're going to use onto `this`.
        Object.assign(this, {
            devices: props.devices,
            hotAttribute: props.hotAttribute,
            attributeLabel: props.attributeLabel,
            attributeFormatter: props.attributeFormatter,
            cutoff: props.cutoff,
            threshold: props.threshold,
            columns: props.columns,
            openChangeOwnerModal: props.openChangeOwnerModal
        });
    }

    renderDeviceRows() {
        const hotDevices = sortBy(this.devices, this.hotAttribute);
        hotDevices.reverse();
        hotDevices.splice(this.cutoff);
        return hotDevices.map(device => {
            const attributeVal = device[this.hotAttribute];
            const rowClass = this.threshold && attributeVal > this.threshold ? 'danger' : '';
            return (
                <React.Fragment key={device.ip}>
                    <tr className={rowClass}>
                        <td>{device.ip}</td>
                        <td>
                            <div className="HotDevicesPanel__owner" onClick={() => this.openChangeOwnerModal(device.ip)}>
                                {device.owner}
                                <span className="show-on-hover glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </div>
                        </td>
                        <td>{this.attributeFormatter(attributeVal)}</td>
                    </tr>
                </React.Fragment>
            );
        });
    }

    render() {
        const gridSize = Math.floor(12 / this.columns);
        return (
            <div className={'HotDevicesPanel col-sm-' + gridSize}>
                <div className="panel panel-default panel-info">
                     <div className="panel-heading">
                         <h3 className="panel-title">{this.attributeLabel} &mdash; Top {this.cutoff} Devices</h3>
                     </div>
                    <div className="panel-body">
                        <table className="table table-condensed table-hover">
                            <tbody>
                                { this.renderDeviceRows() }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotDevicesPanel;

