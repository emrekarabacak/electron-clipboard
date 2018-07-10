const { app, BrowserWindow, Tray, Menu, globalShortcut, clipboard, ipcMain } = require('electron')

let mainWindow
let tray

function checkClipboard(clipboard, onChange) {
    let cache = clipboard.readText()
    let latest
    setInterval(_ => {
        latest = clipboard.readText()
        if (latest !== cache) {
            cache = latest
            onChange(cache)
        }
    }, 750)
}

function clearStack() {
    mainWindow.webContents.send('clear-stack')
}

function createSystemTray() {
    tray = new Tray('assets/copy_icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'About', role: 'about' },
        {
            label: 'Clear', click: _ => {
                clearStack()
            }
        },
        { label: 'Quit', role: 'quit' }
    ])
    tray.setToolTip('This is my application')
    tray.setContextMenu(contextMenu)
}

function createMainWindow() {

    mainWindow = new BrowserWindow({ width: 300, height: 800, frame: false, show: false, resizable: false })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', _ => {
        mainWindow = null
    })
}

function createWindow() {

    createSystemTray()
    createMainWindow()

    const ret = globalShortcut.register('Control+G', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    })

    checkClipboard(clipboard, text => {
        mainWindow.webContents.send('new-value-captured', text)
    })
}

ipcMain.on('value-selected', (event, arg) => {
    clipboard.writeText(arg)
    if (mainWindow.isVisible) {
        mainWindow.hide()
    }
})

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

app.on('deactivate', _ => {
    console.log('deactivate')
})