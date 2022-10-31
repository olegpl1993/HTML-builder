const fs = require('fs')
const path = require('path')

const pathToFolder = path.join(__dirname, 'files') // путь к папке files
const pathToNewFolder = path.join(__dirname, 'files-copy') // путь для новой папки

function fileInFolder(pathToFolder, pathToNewFolder) { // создает копию папки со всеми вложеными файлами
  fs.mkdir(path.join(pathToNewFolder), { recursive: true }, err => { if (err) throw err }) // создает новую папку
  // очищает папку если она осталась с предыдущего раза----------------
  fs.readdir(pathToNewFolder, { withFileTypes: true }, (err, files) => { // массив обьектов вложенных в папку
    if (files) { // проверка что массив файлов соществует
      files.forEach(file => { // перебор массива по обьектам
        const newPathToFile = path.join(pathToNewFolder, file.name) // путь к файлу
        fs.unlink(newPathToFile, err => { if (err) throw err }) // удаляет файл
      })
    }
  })
  // заполняет папку новыми файлами --------------------------------------
  fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => { // массив обьектов вложенных в папку
    files.forEach(file => { // перебор массива по обьектам
      const pathToFile = path.join(pathToFolder, file.name) // путь к файлу
      const newPathToFile = path.join(pathToNewFolder, file.name) // новый путь к файлу
      fs.copyFile(pathToFile, newPathToFile, err => { if (err) throw err }) // копирует файлы в нувую папку
    })
  })
}

fileInFolder(pathToFolder, pathToNewFolder)
