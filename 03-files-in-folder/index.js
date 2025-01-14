const fs = require('fs/promises');
const path = require('path');

// Путь к директории с файлами
const folderPath = path.join(__dirname, 'secret-folder');

// Функция для отображения информации о файлах
async function getFilesInfo() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        displayFileInfo(filePath, file.name);
      }
    });
  } catch (err) {
    console.error('Ошибка при чтении директории:', err);
  }
}

// Функция для получения информации о файле
async function displayFileInfo(filePath, fileName) {
  try {
    const stats = await fs.stat(filePath);
    const fileSizeInKB = (stats.size / 1024).toFixed(3); // Размер в KB
    const fileExtension = path.extname(fileName).slice(1); // Получаем расширение файла
    const baseName = path.basename(fileName, path.extname(fileName)); // Имя файла без расширения

    console.log(`${baseName} - ${fileExtension} - ${fileSizeInKB}kb`);
  } catch (err) {
    console.error('Ошибка при получении информации о файле:', err);
  }
}

// Вызов функции для получения информации о файлах
getFilesInfo();
