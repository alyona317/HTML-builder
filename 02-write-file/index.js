const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Создание пути для файла
const filePath = path.join(__dirname, 'output.txt');

// Создание потока для записи в файл (с флагом 'a' для добавления)
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

// Создание интерфейса для ввода с консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Приветственное сообщение
console.log(
  'Добро пожаловать! Введите текст, который хотите записать в файл. Для выхода введите "exit".',
);

// Ожидание ввода
rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('Процесс завершен. До свидания!');
    rl.close();
    writeStream.end();
  } else {
    writeStream.write(input + '\n');
    console.log('Текст записан в файл. Введите новый текст...');
  }
});

// Обработка завершения процесса через ctrl + c
process.on('SIGINT', () => {
  console.log('\nПроцесс завершен. До свидания!');
  rl.close();
  writeStream.end();
});
