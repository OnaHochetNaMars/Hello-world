const electron = require('electron')
// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
/*
dialog.showSaveDialog(function (fileName) {
       if (fileName === undefined){
            console.log("You didn't save the file");
            return;
       }
       // fileName is a string that contains the path and filename created in the save file dialog.  
       fs.writeFile(fileName, content, function (err) {
           if(err){
               alert("An error ocurred creating the file "+ err.message)
           }
                        
           alert("The file has been succesfully saved");
       });
});

dialog.showOpenDialog(function (fileNames) {
        // fileNames is an array that contains all the selected
       if(fileNames === undefined){
            console.log("No file selected");
       }else{
            readFile(fileNames[0]);
       }
});

function readFile(filepath){
    fs.readFile(filepath, 'utf-8', function (err, data) {
          if(err){
              alert("An error ocurred reading the file :" + err.message);
              return;
          }
          // Change how to handle the file content
          console.log("The file content is : " + data);
    });
}

// Note that the previous example will handle only 1 file, if you want that the dialog accepts multiple files, then change the settings:
// And obviously , loop through the fileNames and read every file manually
dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections',function(fileNames){
  console.log(fileNames);
}]});

var filepath = "C:/Previous-filepath/existinfile.txt";// you need to save the filepath when you open the file to update without use the filechooser dialog againg
var content = "This is the new content of the file";

fs.writeFile(filepath, content, function (err) {
      if(err){
            alert("An error ocurred updating the file"+ err.message);
            console.log(err);
            return;
      }
                    
      alert("The file has been succesfully saved");
 });

var filepath = "D:/valera/file.txt";// Previously saved path somewhere
fs.exists(filepath, function(exists) {
      if(exists) {
            // File exists deletings
            fs.unlink(filepath,function(err){
                  if(err){
                      alert("An error ocurred updating the file"+ err.message);
                      console.log(err);
                      return;
                  }
              console.log("File succesfully deleted");
            });
      } else {
           alert("This file doesn't exist, cannot delete");
      }
});

dialog.showOpenDialog({
    title:"Select a folder",
    properties: ["openDirectory"]
},function (folderPaths) {
    // folderPaths is an array that contains all the selected paths
    if(fileNames === undefined){
        console.log("No destination folder selected");
        return;
    }else{
        console.log(folderPaths);
    }
});
*/