const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('./dist/index.html');

    if(process.argv[2] === "--production"){
        win.setKiosk(true);
    } else {
        win.maximize();
        win.show();
        win.webContents.openDevTools()
    }
    
    console.log("MODE ======> " + process.argv[2]);
};

app.whenReady().then(createWindow);
