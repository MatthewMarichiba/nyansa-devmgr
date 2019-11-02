import React from 'react';
import ReactDOM from 'react-dom';
import DeviceDashboard from './DeviceDashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeviceDashboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
