// can't use typescript since node needs to read this file directly.
// used in .github/workflows
const fs = require('fs');

const path = require('path');

const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file.name}`, arrayOfFiles);
    } else {
      // need to format each element in the array so that process.stdout writes it in a way github actions matrix can understand
      arrayOfFiles.push(`${path.join(dirPath, '/', file.name)}`);
    }
  });

  return arrayOfFiles;
};

const specs = getAllFiles('cypress/e2e/');
/*
    using process.stdout rather than console.log here so it all comes out on the same line
    otherwise the process breaks in github as it feeds this to the matrix
*/
process.stdout.write(`${JSON.stringify(specs)}\n`);
