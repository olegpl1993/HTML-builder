const fs = require('fs')
const path = require('path')

const pathToFolder = path.join(__dirname, 'files') // путь к папке files

function fileInFolder() { // определяет список вложенных файлов
  fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => { // делает массив обьектов вложенных в папку
    files.forEach(file => { // перебор массива по обьектам
      const pathToFile = path.join(pathToFolder, file.name) // путь к файлу
      const newPathToFile = path.join(__dirname, 'files-copy', file.name) // новый путь к файлу
      copyFile(pathToFile, newPathToFile)
    })
  })
}

function copyFile(pathToFile, newPathToFile) { // копирует файл из старой папки в новую
  fs.copyFile(pathToFile, newPathToFile, err => {
    if (err) throw err
  })
}

fs.mkdir( // создает пустую папку
  path.join(__dirname, 'files-copy'), // путь к новой папке
  { recursive: true }, // если папка существует ошибки не будет
  err => {
    if (err) throw err
    fileInFolder()
  }
)
