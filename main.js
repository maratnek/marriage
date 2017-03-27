#!/usr/bin/env node
/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('marriage:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */
console.log('my test');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Require Browsersync
 */
var browserSync = require('browser-sync').create();

/**
 * Run Browsersync with server config
 */
browserSync.init(null, {
    // proxy: "http://localhost:3000",
    port: 3000 ,
    server: ".",
    files: ["views/*.*", "public/*"]
});

browserSync.reload(["views/*.*", "public/*"]
);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


// ELECTRONG APP
const electron = require('electron');
// Module to control application life.
const app2 = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// const path = require('path')
// const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, icon: '../public/images/marriage_bcg.jpg'})

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: '/index',
  //   protocol: 'http:',
  //   slashes: true
  // }))
  mainWindow.loadURL('http://localhost:3000/');
  // mainWindow.loadURL('https://github.com');

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app2.on('ready', createWindow);

// Quit when all windows are closed.
// app2.on('window-all-closed', function () {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app2.quit()
//   }
// });

// app2.on('activate', function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
