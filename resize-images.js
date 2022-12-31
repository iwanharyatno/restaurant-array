const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

console.info('Resizing images at src/public/images');

const workingDirectory = path.resolve(__dirname, 'src/public/images');

function addPostfixToFileName(filename, postfix) {
  return `${filename.split('.').slice(0, -1).join('.')}-${postfix}.jpg`;
}

function resize({ filename, width, postfix }) {
  const workingFile = `${workingDirectory}/${filename}`;
  sharp(workingFile)
    .resize(width)
    .toFile(addPostfixToFileName(workingFile, postfix));
}

fs.readdirSync(workingDirectory).forEach((image) => {
  const mediumImage = addPostfixToFileName(image, 'medium');
  if (fs.existsSync(mediumImage) || image.match(/.*-(small|medium|large)\..*/)) {
    console.info(`The file ${image} has been resized before. Skipping...`);
    return;
  }
  resize({
    filename: image,
    width: 800,
    postfix: 'medium',
  });
});

console.info('All images has been resized successfully!');
