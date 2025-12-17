const fs = require('fs');
const path = require('path');

// Rutas de las APIs que necesitamos excluir temporalmente del build
const apiRoutesDir = path.join(__dirname, '../src/app/api');
const tempDir = path.join(__dirname, '../.temp-api-routes');

// Función para mover directorio
function moveDirectory(src, dest) {
  if (fs.existsSync(src)) {
    // Crear directorio temporal si no existe
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Mover cada archivo/subdirectorio
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        // Copiar recursivamente
        copyDirectory(srcPath, destPath);
        // Eliminar original
        fs.rmSync(srcPath, { recursive: true, force: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
      }
    });
    
    // Eliminar directorio vacío
    try {
      fs.rmdirSync(src);
    } catch (e) {
      // Ignorar si no está vacío
    }
  }
}

// Función para copiar directorio recursivamente
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Función para restaurar directorio
function restoreDirectory(src, dest) {
  if (fs.existsSync(src)) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const items = fs.readdirSync(src);
    items.forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      
      if (fs.statSync(srcPath).isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
}

const command = process.argv[2];

if (command === 'exclude') {
  console.log('📦 Excluyendo rutas API del build estático...');
  if (fs.existsSync(apiRoutesDir)) {
    moveDirectory(apiRoutesDir, tempDir);
    console.log('✅ Rutas API movidas temporalmente');
  } else {
    console.log('⚠️  No se encontró el directorio de rutas API');
  }
} else if (command === 'restore') {
  console.log('🔄 Restaurando rutas API...');
  if (fs.existsSync(tempDir)) {
    restoreDirectory(tempDir, apiRoutesDir);
    // Eliminar directorio temporal
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('✅ Rutas API restauradas');
  } else {
    console.log('⚠️  No se encontró el directorio temporal');
  }
} else {
  console.log('Uso: node scripts/exclude-api-routes.js [exclude|restore]');
  process.exit(1);
}

