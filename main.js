const { app, BrowserWindow, Tray, Menu } = require('electron')

let mainWindow
let tray

function createWindow() {

    tray = new Tray('assets/copy_icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'About', role: 'about' },
        { label: 'Quit', role: 'quit' }
    ])
    tray.setToolTip('This is my application')
    tray.setContextMenu(contextMenu)

    //mainWindow = new BrowserWindow({ width: 800, height: 600 })

    //mainWindow.loadFile('index.html')

    //mainWindow.on('closed', _ => {
     //   mainWindow = null
    //})
}

app.on('ready', createWindow)

app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', _ => {
    if (mainWindow === null) {
        createWindow()
    }
})