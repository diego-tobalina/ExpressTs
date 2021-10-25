// imports
const {promisify} = require('util');
const {resolve} = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// constantes
const baseEntity = "Entity"

// nombres para reemplazar
const entity = process.argv.slice(2)[0];
const entityLowerCase = entity.toLowerCase();
const entityCamelCase = toCamelCase(entity);
const entityCamelCaseFirsUpperCase = toUpperFistLetter(entityCamelCase);
const entityUpperSnakeCase = toUpperSnakeCase(entity);

// directorios para trabajar
const currentDir = __dirname;
const filesDir = `${currentDir}/src/entity`;
const filesDestinationDir = `${currentDir}/src/${entityLowerCase}`;

// copia los ficheros originales al nuevo directorio
copyFiles(filesDir, filesDestinationDir).then(r => {/**/
});

function replaceEntityNames(string) {
    let response = string;
    response = response.replaceAll(baseEntity.toLowerCase(), entityLowerCase)
    response = response.replaceAll(baseEntity, entityCamelCaseFirsUpperCase)
    return response.replaceAll(toUpperSnakeCase(baseEntity), entityUpperSnakeCase)
}

async function copyFiles(originalDir, destinationDir) {
    getFiles(originalDir).then(files => {
        for (let file of files) {
            const destinationFile = replaceEntityNames(file.replace(originalDir, destinationDir));
            const destinationFileDir = destinationFile.substring(0, destinationFile.lastIndexOf("/") + 1);
            fs.mkdirSync(destinationFileDir, {recursive: true});
            const content = replaceEntityNames(fs.readFileSync(file, 'utf8'));
            if (fs.existsSync(destinationFile)) fs.unlinkSync(destinationFile)
            fs.writeFileSync(destinationFile, content);
        }
    });
}

async function getFiles(dir) {
    const subDirs = await readdir(dir);
    const files = await Promise.all(subDirs.map(async (subDir) => {
        const res = resolve(dir, subDir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}


function toCamelCase(str) {
    return str.replace(/^\w|[A-Z]|\b\w/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function toUpperSnakeCase(string) {
    return string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();
}

function toUpperFistLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
