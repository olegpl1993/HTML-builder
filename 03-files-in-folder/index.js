const fs = require('fs')
const path = require('path')
const { stdout } = process

const pathToSecretFolder = path.join(__dirname, 'secret-folder') // путь к папке

function filesInFolderInfo() { // выводит информацию о файлах в папке
  fs.readdir(pathToSecretFolder, { withFileTypes: true }, (err, files) => { // массив обьектов вложенных в папку
    files.forEach(file => { // перебор массива по обьектам
      if (file.isFile()) { // проверка что обьект является файлом
        const pathToFile = path.join(__dirname, 'secret-folder', file.name) // путь к файлу
        const [fileName, fileType] = file.name.split('.') // разделяем имена по точке
        fs.stat(pathToFile, (err, stats) => { // получаем данные о файле
          stdout.write(`${fileName} - ${fileType} - ${stats.size / 1024}kb\n`) // выводим все полученные данные в консоль
        })
      }
    })
  })
}

filesInFolderInfo(pathToSecretFolder);
