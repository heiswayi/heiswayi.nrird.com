const fs = require('fs');
const path = require('path');

function listFilesInFolder(folderPath, outputFile) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    const quotedFileNames = files.map(file => `"${file}",`).join('\n');

    fs.writeFile(outputFile, quotedFileNames, (writeErr) => {
      if (writeErr) {
        console.error('Error writing output file:', writeErr);
        return;
      }

      console.log(`List of files saved to ${outputFile}`);
    });
  });
}

const folderPath = process.argv[2];
const outputFile = process.argv[3] || path.join(folderPath, '__fileList.txt');

if (!folderPath) {
  console.error('Please provide a folder path.');
  return;
}

listFilesInFolder(folderPath, outputFile);