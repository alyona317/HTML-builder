const fs = require('fs');
const path = require('path');

// Получение пути к файлу
const filePath = path.join(__dirname, 'text.txt');

// Создание потока для чтения
const readStream = fs.createReadStream(filePath, 'utf8');

// Направление потока в стандартный вывод
readStream.pipe(process.stdout);

// Обработка ошибок
readStream.on('error', (err) => {
  console.error('Ошибка при чтении файла:', err);
});