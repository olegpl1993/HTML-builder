const fs = require('fs');
const path = require('path');


const stream = fs.createReadStream(  // поток для передачи данных
  path.join(__dirname, 'text.txt'), // путь к файлу
  'utf-8'); // кодировка файла
let data = ''; // итоговый результат
stream.on('data', chunk => data += chunk); // получает пакеты и добавляет их в data (на получении каждого пакета)
stream.on('end', () => console.log(data)); // после передачи пакетов
stream.on('error', error => console.log('Error', error.message)); // обработка ошибки
