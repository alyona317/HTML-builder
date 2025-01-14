const fs = require('fs/promises');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles'); // Папка с CSS файлами
const outputDir = path.join(__dirname, 'project-dist'); // Папка для сборки
const bundleFile = path.join(outputDir, 'bundle.css'); // Итоговый файл

// Функция для объединения стилей
async function mergeStyles() {
  try {
    // Чтение содержимого папки styles
    const files = await fs.readdir(stylesDir);

    // Массив для хранения содержимого CSS файлов
    let allStyles = '';

    // Перебираем все файлы в папке
    for (const file of files) {
      const filePath = path.join(stylesDir, file);

      // Проверяем, является ли файл CSS
      if (path.extname(file) === '.css') {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        allStyles += fileContent + '\n'; // Добавляем содержимое файла в итоговый результат
      }
    }

    // Создаем папку project-dist, если она не существует
    await fs.mkdir(outputDir, { recursive: true });

    // Записываем объединенные стили в файл bundle.css
    await fs.writeFile(bundleFile, allStyles);

    console.log('Стили успешно объединены в bundle.css!');
  } catch (err) {
    console.error('Ошибка при объединении стилей:', err);
  }
}

// Запуск функции
mergeStyles();
