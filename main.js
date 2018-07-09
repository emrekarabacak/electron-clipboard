const { app, BrowserWindow, Tray, Menu ,globalShortcut, clipboard} = require('electron')

let mainWindow
let tray

function checkClipboard(clipboard, onChange) {
    let cache = clipboard.readText()
    let latest
    setInterval( _ => {
        latest = clipboard.readText()
        if (latest !== cache){
            cache = latest
            onChange(cache)
        }
    },750)
}

function createSystemTray() {
    tray = new Tray('assets/copy_icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'About', role: 'about' },
        { label: 'Quit', role: 'quit' }
    ])
    tray.setToolTip('This is my application')
    tray.setContextMenu(contextMenu)
}

function createWindow() {

    createSystemTray()

    mainWindow = new BrowserWindow({ width: 800, height: 600 })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', _ => {
        mainWindow = null
    })

    const ret = globalShortcut.register('Control+G', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })

    checkClipboard(clipboard, text => {
        console.log(text)
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', _ => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
    globalShortcut.unregister('Control+G')
})

app.on('activate', _ => {
    if (mainWindow === null) {
        createWindow()
    }
})