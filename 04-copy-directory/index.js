const fs = require('fs/promises'); // Для работы с файловой системой
const path = require('path'); // Для работы с путями

const srcDir = path.join(__dirname, 'files'); // Исходная папка
const destDir = path.join(__dirname, 'files-copy'); // Папка для копирования

async function copyDir() {
  try {
    // Проверяем, существует ли папка назначения, если нет, создаем её
    await fs.mkdir(destDir, { recursive: true });

    // Чтение содержимого исходной папки
    const files = await fs.readdir(srcDir);

    // Копирование файлов в папку назначения
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);

      // Получаем информацию о файле
      const stat = await fs.stat(srcFile);

      // Проверяем, является ли это файлом (не папкой)
      if (stat.isFile()) {
        await fs.copyFile(srcFile, destFile); // Копируем файл
      }
    }

    console.log('Копирование завершено!');
  } catch (err) {
    console.error('Ошибка при копировании:', err);
  }
}

// Запуск функции
copyDir();
