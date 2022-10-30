const fs = require('fs')
const path = require('path')

const pathToStyles = path.join(__dirname, 'styles')
const pathToDist = path.join(__dirname, 'project-dist')

async function fileInFolder() { // опредляет css файлы в папке
  return await fs.promises.readdir(pathToStyles, { withFileTypes: true })   // делает массив обьектов вложенных в папку
}

function cssFiles(arrFiles) {
  const arrCssFiles = [];
  arrFiles.forEach(file => { // перебор массива по обьектам
    if (file.isFile() && path.extname(file.name) === '.css') { //  проверка что обьект является файлом и проверка расширение файла css
      arrCssFiles.push(file.name)
    }
  })
  return arrCssFiles
}

async function dataFromCSS(file) {
  const pathToFile = path.join(pathToStyles, file)
  const data = fs.promises.readFile(pathToFile, 'utf-8', (err, data) => { })
  return data
}

async function pathCssFiles(arrCssFiles) {
  const arrCssText = [];
  const data0 = await dataFromCSS(arrCssFiles[0])
  const data1 = await dataFromCSS(arrCssFiles[1])
  const data2 = await dataFromCSS(arrCssFiles[2])
  arrCssText.push(data0)
  arrCssText.push(data1)
  arrCssText.push(data2)
  return arrCssText;
}

function add(arrCssText) { // добавляет ссобщение в файл
  arrCssText.forEach((data) => {
    fs.appendFile(
      path.join(pathToDist, 'bundle.css'), data, err => { if (err) throw err }
    )
  })
}

async function createNewCss(arrCssText) {
  fs.writeFile( // создает пустой файл
    path.join(pathToDist, 'bundle.css'), '', err => { if (err) throw err }
  )
  add(arrCssText);
}

fileInFolder()
  .then(arrFiles => cssFiles(arrFiles))
  .then(arrCssFiles => pathCssFiles(arrCssFiles))
  .then(arrCssText => createNewCss(arrCssText))

// node 05-merge-styles

