# Guía de Despliegue - GetGo Web

## 📦 Build y Export

### 1. Construir la aplicación

```bash
npm run build
```

Este comando:
- Compila la aplicación Next.js
- Genera archivos estáticos en la carpeta `out/`
- **Automáticamente copia los archivos `.well-known/`** a `out/.well-known/`

### 2. Verificar que los archivos se copiaron

Después del build, verifica que existan:

```bash
ls -la out/.well-known/
```

Deberías ver:
- `assetlinks.json`
- `apple-app-site-association`

## 🚀 Despliegue

### Opción 1: Servidor Web (cPanel, Apache, Nginx)

1. **Sube todos los archivos de la carpeta `out/`** a tu servidor web
2. **Asegúrate de que los archivos `.well-known/` estén en la raíz del dominio**

   Estructura esperada:
   ```
   public_html/
   ├── index.html
   ├── refer.html
   ├── .well-known/
   │   ├── assetlinks.json
   │   └── apple-app-site-association
   └── ...
   ```

3. **Configura el servidor web para servir los archivos `.well-known/`**

   **Apache (.htaccess):**
   ```apache
   # Permitir acceso a archivos .well-known
   <DirectoryMatch "^.*/\.well-known/">
       Require all granted
   </DirectoryMatch>
   ```

   **Nginx:**
   ```nginx
   location ~ /\.well-known {
       allow all;
   }
   ```

4. **Configura Content-Type correcto**

   Los archivos deben servirse con `Content-Type: application/json`

   **Apache (.htaccess):**
   ```apache
   <FilesMatch "\.(json)$">
       Header set Content-Type "application/json"
   </FilesMatch>
   ```

### Opción 2: Vercel

Vercel detecta automáticamente Next.js con `output: "export"` y despliega desde `out/`.

#### Configuración Automática

El archivo `vercel.json` ya está configurado para:
- ✅ Servir archivos desde `out/`
- ✅ Configurar headers correctos para `.well-known/` (Content-Type: application/json)
- ✅ Permitir acceso CORS a los archivos de verificación

#### Despliegue

**Opción A: Desde la CLI**
```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Desplegar
vercel --prod
```

**Opción B: Desde GitHub (Recomendado)**
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente Next.js
3. Configuración automática:
   - **Build Command:** `npm run build`
   - **Output Directory:** `out`
   - **Install Command:** `npm install`

#### Verificación en Vercel

Después del despliegue, verifica:

```bash
# Reemplaza 'tu-proyecto' con tu dominio de Vercel
curl https://tu-proyecto.vercel.app/.well-known/assetlinks.json
curl https://tu-proyecto.vercel.app/.well-known/apple-app-site-association
```

#### Configurar Dominio Personalizado

1. Ve a **Settings** → **Domains** en Vercel
2. Agrega tu dominio: `getgoapp.cl`
3. Configura los DNS según las instrucciones de Vercel
4. Una vez configurado, los archivos estarán en:
   - `https://getgoapp.cl/.well-known/assetlinks.json`
   - `https://getgoapp.cl/.well-known/apple-app-site-association`

### Opción 3: Netlify

```bash
netlify deploy --prod --dir=out
```

## ✅ Verificación Post-Despliegue

### 1. Verificar que los archivos sean accesibles

```bash
# Android App Links
curl https://getgoapp.cl/.well-known/assetlinks.json

# iOS Universal Links
curl https://getgoapp.cl/.well-known/apple-app-site-association
```

**Debe retornar:**
- Status: `200 OK`
- Content-Type: `application/json`
- El contenido del archivo JSON

### 2. Verificar formato JSON

Los archivos deben ser JSON válido. Puedes verificar con:

```bash
curl https://getgoapp.cl/.well-known/assetlinks.json | jq .
```

### 3. Verificar en Android

```bash
# Verificar estado de App Links
adb shell pm get-app-links com.getgoapp.pasajero

# Debería mostrar: 200 (verificado)
```

### 4. Verificar en iOS

1. Abre la app en un dispositivo iOS
2. Abre Safari y visita: `https://getgoapp.cl/refer?code=TEST123`
3. Debería abrir la app automáticamente (si está instalada)

## 🔧 Troubleshooting

### Los archivos no se copian al build

Si los archivos `.well-known/` no aparecen en `out/`:

1. Ejecuta manualmente el script:
   ```bash
   node scripts/copy-well-known.js
   ```

2. Verifica que los archivos existan en `public/.well-known/`

### Los archivos no son accesibles después del despliegue

1. **Verifica permisos del servidor:**
   - Los archivos deben ser legibles (chmod 644)
   - El directorio debe ser accesible (chmod 755)

2. **Verifica que no haya redirecciones:**
   - Algunos servidores redirigen `.well-known/` automáticamente
   - Asegúrate de que no haya reglas de redirección que interfieran

3. **Verifica HTTPS:**
   - Los App Links y Universal Links **requieren HTTPS**
   - No funcionarán en HTTP

### Android muestra diálogo en lugar de abrir automáticamente

Esto significa que `assetlinks.json` no está verificado:

1. Verifica que el archivo sea accesible
2. Verifica que el SHA256 fingerprint sea correcto
3. Espera hasta 20 horas (o fuerza la verificación):
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

## 📝 Notas Importantes

- Los archivos `.well-known/` **deben estar en la raíz del dominio**
- Deben ser accesibles **sin autenticación**
- Deben servirse con **Content-Type: application/json**
- **Requieren HTTPS** para funcionar
- La verificación puede tardar hasta 20 horas

## 🔗 URLs de Verificación

Después del despliegue, estas URLs deben funcionar:

- `https://getgoapp.cl/.well-known/assetlinks.json`
- `https://getgoapp.cl/.well-known/apple-app-site-association`
- `https://getgoapp.cl/refer?code=TEST123` (debe abrir la app si está instalada)

