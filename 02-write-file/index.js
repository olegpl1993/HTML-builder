const fs = require('fs')
const path = require('path')
const { stdin, stdout } = process

function add(data) { // добавляет ссобщение в файл
  fs.appendFile(
    path.join(__dirname, 'text.txt'), data, err => { if (err) throw err }
  )
}
function bye() { // выводит сообщение и завершает программу
  stdout.write('Удачи в изучении Node.js!')
  process.exit()
}

function enter(data) { // проверка ввода слова exit
  if (data.toString().trim() === 'exit') bye()
  else add(data)
}

fs.writeFile( // создает пустой файл
  path.join(__dirname, 'text.txt'), '', err => { if (err) throw err }
)

stdout.write('Введите сообщение:\n') // вывод сообщения в консоль
stdin.on('data', data => { enter(data) }) // ожидает ввод
process.on('SIGINT', bye) // при нажатии ctrl+c


