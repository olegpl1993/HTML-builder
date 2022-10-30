const fs = require('fs')
const path = require('path')

const pathToStyles = path.join(__dirname, 'styles')
const pathToDist = path.join(__dirname, 'project-dist')

async function fileInFolder() {
  fs.writeFile(path.join(pathToDist, 'bundle.css'), '', err => { }) // создает bundle CSS
  const arrCssFiles = []; // массив файлов css
  const arrFiles = await fs.promises.readdir(pathToStyles, { withFileTypes: true }) // делает массив обьектов вложенных в папку
  arrFiles.forEach(file => { if (file.isFile() && path.extname(file.name) === '.css') arrCssFiles.push(file.name) }) // выбирает css файлы
  const arrCssText = []; // масив содержимого CSS файлов
  for (let i in arrCssFiles) {
    const pathToFile = path.join(pathToStyles, arrCssFiles[i]) // путь к текущему файлу
    const data = await fs.promises.readFile(pathToFile, 'utf-8') // содержимое css файла
    arrCssText.push(data) // заполняет массив информацией из css файлов
  }
  arrCssText.forEach((data) => { fs.appendFile(path.join(pathToDist, 'bundle.css'), data, err => { }) }) // заполняет bundle CSS
}

fileInFolder();

// node 05-merge-styles
