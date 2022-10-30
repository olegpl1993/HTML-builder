const fs = require('fs')
const path = require('path')

const pathToStyles = path.join(__dirname, 'styles')
const pathToDist = path.join(__dirname, 'project-dist')

function createDist() { // создает папку project-dist
  fs.mkdir(pathToDist, { recursive: true }, err => { if (err) throw err }) // создает папку project-dist
}

async function styleBundler() { // делает бандл из CSS файлов и помещает в папку project-dist
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

function fileInFolder(pathToFolder, pathToNewFolder) { // создает копию паапки со всеми вложеными файлами
  fs.mkdir(path.join(pathToNewFolder), { recursive: true }, err => { if (err) throw err }) // создает новую папку
  fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => { // массив обьектов вложенных в папку
    files.forEach(file => { // перебор массива по обьектам
      const pathToFile = path.join(pathToFolder, file.name) // путь к файлу
      const newPathToFile = path.join(pathToNewFolder, file.name) // новый путь к файлу
      fs.copyFile(pathToFile, newPathToFile, err => { if (err) throw err }) // копирует файлы в нувую папку
    })
  })
}

function copyAssetsFolders() {
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


createDist(); // создает папку project-dist
styleBundler(); // делает бандл из CSS файлов и помещает в папку project-dist
copyAssetsFolders() // копирует папку assets со всем содержимым в папку project-dist

// node 06-build-page