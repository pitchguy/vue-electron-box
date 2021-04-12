import electron from 'electron';
const { app, dialog, Notification } = electron.remote;

const eleNotify = config => {
    if (Notification.isSupported()) {
        let notify = new Notification({ ...config });

        notify.show();
    }
};

export { eleNotify };
