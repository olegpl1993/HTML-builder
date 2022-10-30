const fs = require('fs')
const path = require('path')

const pathToStyles = path.join(__dirname, 'styles')
const pathToDist = path.join(__dirname, 'project-dist')

async function fileInFolder() {
  fs.writeFile(path.join(pathToDist, 'bundle.css'), '', err => { }) // создает bundle CSS
  const arrCssText = []; // масив содержимого CSS файлов
  const arrFiles = await fs.promises.readdir(pathToStyles, { withFileTypes: true }) // массив обьектов вложенных в папку
  for (let i in arrFiles) {
    if (arrFiles[i].isFile() && path.extname(arrFiles[i].name) === '.css') { // выбирает css файлы
      const pathToFile = path.join(pathToStyles, arrFiles[i].name) // путь к текущему файлу
      const data = await fs.promises.readFile(pathToFile, 'utf-8') // содержимое css файла
      arrCssText.push(data) // заполняет массив информацией из css файлов
    }
  }
  arrCssText.forEach((data) => { fs.appendFile(path.join(pathToDist, 'bundle.css'), data, err => { }) }) // заполняет bundle CSS
}

fileInFolder();

