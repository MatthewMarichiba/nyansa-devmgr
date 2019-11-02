import React from 'react';
import ReactDOM from 'react-dom';
import DeviceDashboard from './components/DeviceDashboard';
import Devices from './resources/Devices';

// Instantiate the Devices resource/service. Pass this singleton to any component that needs the device list.
const devices = new Devices();

// Render the dashboard
ReactDOM.render(
    <DeviceDashboard devicesService={devices} />,
    document.getElementById('react-root')
);
