const fs = require('fs');
const path = require('path');

// Rutas
const sourceDir = path.join(__dirname, '../public/.well-known');
const destDir = path.join(__dirname, '../out/.well-known');

// Crear directorio de destino si no existe
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copiar archivos
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

console.log('✅ Archivos .well-known copiados correctamente');

