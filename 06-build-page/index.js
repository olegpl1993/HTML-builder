const fs = require('fs')
const path = require('path')

function createDist() { // создает папку project-dist
  const pathToDist = path.join(__dirname, 'project-dist')
  fs.mkdir(pathToDist, { recursive: true }, err => { if (err) throw err }) // создает папку project-dist
}

async function styleBundler() { // делает бандл из CSS файлов и помещает в папку project-dist
  const pathToDist = path.join(__dirname, 'project-dist')
  const pathToStyles = path.join(__dirname, 'styles')
  fs.writeFile(path.join(pathToDist, 'style.css'), '', err => { }) // создает bundle
  const arrCssText = []; // масив содержимого CSS файлов
  const arrFiles = await fs.promises.readdir(pathToStyles, { withFileTypes: true }) // массив обьектов вложенных в папку
  for (let i in arrFiles) {
    if (arrFiles[i].isFile() && path.extname(arrFiles[i].name) === '.css') { // выбирает css файлы
      const pathToFile = path.join(pathToStyles, arrFiles[i].name) // путь к текущему файлу
      const data = await fs.promises.readFile(pathToFile, 'utf-8') // содержимое css файла
      arrCssText.push(data) // заполняет массив информацией из css файлов
    }
  }
  arrCssText.forEach((data) => { fs.appendFile(path.join(pathToDist, 'style.css'), data, err => { }) }) // заполняет bundle CSS
}

function fileInFolder(pathToFolder, pathToNewFolder) { // создает копию папки со всеми вложеными файлами
  fs.mkdir(path.join(pathToNewFolder), { recursive: true }, err => { if (err) throw err }) // создает новую папку
  // очищает папку если она осталась с предыдущего раза----------------
  fs.readdir(pathToNewFolder, { withFileTypes: true }, (err, files) => { // массив обьектов вложенных в папку
    if (files) {
      files.forEach(file => { // перебор массива по обьектам
        const newPathToFile = path.join(pathToNewFolder, file.name) // путь к файлу
        fs.unlink(newPathToFile, err => { }) // удаляет файл
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

function copyAssetsFolders() { // копирует папку assets со всем содержиным в папку project-dist
  const pathToDist = path.join(__dirname, 'project-dist')
  const pathToAssets = path.join(__dirname, 'assets') // путь к папке assets
  const pathToFonts = path.join(pathToAssets, 'fonts')
  const pathToImg = path.join(pathToAssets, 'img')
  const pathToSvg = path.join(pathToAssets, 'svg')
  const pathToAssetsCopy = path.join(pathToDist, 'assets') // путь для копии папки assets
  const pathToFontsCopy = path.join(pathToAssetsCopy, 'fonts')
  const pathToImgCopy = path.join(pathToAssetsCopy, 'img')
  const pathToSvgCopy = path.join(pathToAssetsCopy, 'svg')
  fs.mkdir(path.join(pathToAssetsCopy), { recursive: true }, err => { if (err) throw err }) // создание новой папки assets
  fileInFolder(pathToFonts, pathToFontsCopy) // создает копию паапки со всеми вложеными файлами
  fileInFolder(pathToImg, pathToImgCopy)
  fileInFolder(pathToSvg, pathToSvgCopy)
}

async function htmlBundler() {
  const pathToDist = path.join(__dirname, 'project-dist')
  const pathToHtmlTemplate = path.join(__dirname, 'template.html') // путь к html шаблону
  let dataHtmlTemplate = await fs.promises.readFile(pathToHtmlTemplate, 'utf-8') // содержимое html файла template
  const pathToHtmlComponents = path.join(__dirname, 'components') // путь к папке с компонентами html
  const arrFiles = await fs.promises.readdir(pathToHtmlComponents, { withFileTypes: true }) // массив обьектов вложенных в папку components
  for (let i in arrFiles) {
    if (arrFiles[i].isFile() && path.extname(arrFiles[i].name) === '.html') { // выбирает html файлы
      const pathToFile = path.join(pathToHtmlComponents, arrFiles[i].name) // путь к текущему файлу
      const data = await fs.promises.readFile(pathToFile, 'utf-8') // содержимое html компонента
      dataHtmlTemplate = dataHtmlTemplate.replace(`{{${path.basename(arrFiles[i].name, '.html')}}}`, data) // заменяет текст в шаблоне на из модуля
    }
  }
  fs.writeFile(path.join(pathToDist, 'index.html'), dataHtmlTemplate, err => { if (err) throw err }) // создает html файл с измененным содержимым
}

createDist(); // создает папку project-dist
styleBundler(); // делает бандл из CSS файлов и помещает в папку project-dist
copyAssetsFolders() // копирует папку assets со всем содержиным в папку project-dist
htmlBundler() // делает бандл из HTML файлов и помещает в папку project-dist
