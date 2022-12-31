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
  const smallImage = addPostfixToFileName(image, 'small');
  if (fs.existsSync(smallImage) || image.match(/.*-(small|medium|large)\..*/)) {
    console.info(`The file ${image} has been resized before. Skipping...`);
    return;
  }
  resize({
    filename: image,
    width: 480,
    postfix: 'small',
  });
});

console.info('All images has been resized successfully!');
