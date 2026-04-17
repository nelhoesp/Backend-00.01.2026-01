const Router = require("express");
const { readdirSync } = require('fs');

const PATH_ROUTER = `${__dirname}`;

console.log("PATH_ROUTER: ", PATH_ROUTER);

const router = Router();

const cleanFileName = (filename) => {
  const file = filename.split('.').shift();
  return file;
}


readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename)
  if(cleanName !== 'index') {
    // Importacion Dynamica
    const module = require(`./${filename}`);
    router.use(`/${cleanName}`, module);
    // console.log(`/${cleanName}`, moduleExport);
  }
})

module.exports = router;
