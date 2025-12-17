const fs = require('fs');
const path = require('path');

// Rutas
const sourceDir = path.join(__dirname, '../public/.well-known');
const destDir = path.join(__dirname, '../out/.well-known');
const htaccessSource = path.join(__dirname, '../public/.htaccess');
const htaccessDest = path.join(__dirname, '../out/.htaccess');

// Crear directorio de destino si no existe
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copiar archivos .well-known
const files = ['assetlinks.json', 'apple-app-site-association'];

files.forEach(file => {
  const sourceFile = path.join(sourceDir, file);
  const destFile = path.join(destDir, file);
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log(`✅ Copiado: ${file}`);
  } else {
    console.warn(`⚠️  No encontrado: ${file}`);
  }
});

// Copiar .htaccess si existe
if (fs.existsSync(htaccessSource)) {
  fs.copyFileSync(htaccessSource, htaccessDest);
  console.log('✅ Copiado: .htaccess');
}

console.log('✅ Archivos .well-known copiados correctamente');


