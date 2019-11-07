import {find, findIndex, cloneDeep, sortBy} from 'lodash';

const deviceInitState = [
    {
        ip: '150.1.1.1',
        owner: 'Jack Brown',
        cpuPct: 75,
        memBytes: 2 * 1024 * 1024 * 1024,
        networkRxBytes: 10 * 1024 * 1024,
        networkTxBytes: 4 * 1024 * 1024
    },
    {
        ip: '164.1.1.1',
        owner: 'Simon Homestead',
        cpuPct: 20,
        memBytes: 1 * 1024 * 1024 * 1024,
        networkRxBytes: 3 * 1024 * 1024,
        networkTxBytes: 20 * 1024 * 1024
    },
    {
        ip: '171.1.1.1',
        owner: 'Emily Santiago',
        cpuPct: 65,
        memBytes: 3 * 1024 * 1024 * 1024,
        networkRxBytes: 2 * 1024 * 1024,
        networkTxBytes: 6 * 1024 * 1024
    },
    {
        ip: '231.1.1.1',
        owner: 'Rosalie Guthrie',
        cpuPct: 15,
        memBytes: 1.5 * 1024 * 1024 * 1024,
        networkRxBytes: 2.7 * 1024 * 1024,
        networkTxBytes: 6.3 * 1024 * 1024
    },
    {
        ip: '181.1.1.1',
        owner: 'Mary Morales',
        cpuPct: 45,
        memBytes: 45 * 1024 * 1024 * 1025,
        networkRxBytes: 64 * 1024 * 1024,
        networkTxBytes: 74 * 1024 * 1024
    },
    {
        ip: '191.1.1.1',
        owner: 'Judith Mcintosh',
        cpuPct: 50,
        memBytes: 3 * 1024 * 1024 * 1024,
        networkRxBytes: 70 * 1024 * 1024,
        networkTxBytes: 65 * 1024 * 1024
    },
    {
        ip: '179.1.1.1',
        owner: 'Elise Grace Pacheco',
        cpuPct: 70,
        memBytes: 70 * 1024 * 1024 * 1024,
        networkRxBytes: 30 * 1024 * 1024,
        networkTxBytes: 10 * 1024 * 1024
    }
];

class Devices {
    constructor() {
        this.devices = cloneDeep(deviceInitState);

        // Refresh device data periodically
        // TODO: hook this up to a db. ideally with the stats constantly changing.
        //   For now, let's fake a little activity.
        setInterval(() => {
            this.devices.forEach((dev, index) => {
                // mock updated device values, which should typically come from an API
                const plusMinus = () => 0.8 + (Math.random() * 0.4); // Coefficient to vary values between 80% & 120%
                const initialValues = deviceInitState[index];
                dev.cpuPct = Math.min(initialValues.cpuPct * plusMinus(), 100);
                dev.memBytes = initialValues.memBytes * plusMinus();
                dev.networkTxBytes = initialValues.networkTxBytes * plusMinus();
                dev.networkRxBytes = initialValues.networkRxBytes * plusMinus();
            })
        }, 1000);
    }

    all() {
        return this.devices;
    };

    updateDevice(ip, properties) {
        const device = find(this.devices, { ip });
        Object.assign(device, {...properties});
    }

    static getTopFive(devices, attr, cutoff = 5) {
        const topDevices = sortBy(devices, attr);
        topDevices.reverse();
        topDevices.splice(cutoff);
        return topDevices;
    }

    getTraces(attr) {
        return this.traces[attr];
    }

    static getDeviceIndex(dev) {
        return findIndex(this.devices, d => d.ip === dev.ip);
    }
};

export default Devices;
