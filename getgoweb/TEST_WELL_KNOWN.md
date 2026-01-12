# 🧪 Guía de Pruebas para Archivos .well-known

## ✅ Pruebas Básicas desde Terminal

### 1. Verificar que los archivos sean accesibles

```bash
# Probar assetlinks.json (Android)
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# Probar apple-app-site-association (iOS)
curl -I https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association
```

**Resultado esperado:**
```
HTTP/2 200
content-type: application/json
server: Vercel
```

### 2. Verificar el contenido completo

```bash
# Ver contenido de assetlinks.json
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# Ver contenido de apple-app-site-association
curl https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association
```

**Resultado esperado:** Debe mostrar el JSON completo sin errores.

### 3. Verificar formato JSON válido

```bash
# Verificar que el JSON sea válido (requiere jq)
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json | jq .

# O sin jq, verificar que no haya errores de sintaxis
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json | python3 -m json.tool
```

### 4. Verificar Content-Type

```bash
# Verificar headers completos
curl -v https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json 2>&1 | grep -i "content-type"

# Debe mostrar: content-type: application/json
```

### 5. Verificar que no haya redirecciones

```bash
# Seguir redirecciones y ver la URL final
curl -L -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# No debe haber redirecciones (301, 302, etc.)
```

## 🌐 Pruebas desde Navegador

### 1. Abrir directamente en el navegador

Abre estos URLs en tu navegador:

```
https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association
```

**Resultado esperado:**
- ✅ Debe mostrar el JSON formateado
- ✅ No debe mostrar página de error 404
- ✅ El navegador debe reconocerlo como JSON

### 2. Verificar en DevTools

1. Abre el navegador (Chrome/Firefox)
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Network**
4. Visita: `https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json`
5. Verifica:
   - ✅ Status: `200`
   - ✅ Content-Type: `application/json`
   - ✅ Response: Debe mostrar el JSON

## 🤖 Pruebas Específicas para Android

### 1. Verificar desde Android (con ADB)

```bash
# Conecta tu dispositivo Android por USB
# Activa "Depuración USB" en el teléfono

# Verificar estado de App Links
adb shell pm get-app-links com.getgoapp.pasajero
```

**Resultado esperado:**
```
com.getgoapp.pasajero:
  ID: ...
  Signatures: [C8:7B:33:92:...]
  Domain verification state:
    getgo-page-h84g.vercel.app: verified
```

Si muestra `1024` o `not verified`, el archivo no está configurado correctamente.

### 2. Forzar re-verificación (Android)

```bash
# Forzar re-verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Esperar unos segundos y verificar nuevamente
adb shell pm get-app-links com.getgoapp.pasajero
```

### 3. Probar deeplink manualmente (Android)

```bash
# Probar abrir deeplink desde terminal
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgo-page-h84g.vercel.app/refer?code=TEST123" \
  com.getgoapp.pasajero
```

**Resultado esperado:**
- ✅ La app se abre automáticamente (sin diálogo)
- ✅ La app recibe el código `TEST123`

### 4. Probar desde Chrome en Android

1. Abre Chrome en tu Android
2. Visita: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
3. **Si la app está instalada:**
   - ✅ Debe abrirse automáticamente (sin diálogo)
   - ✅ No debe mostrar opción de elegir navegador
4. **Si la app NO está instalada:**
   - ✅ Después de 2 segundos debe redirigir a Play Store

## 🍎 Pruebas Específicas para iOS

### 1. Probar desde Safari en iPhone

1. Abre Safari en iPhone
2. Visita: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
3. **Si la app está instalada:**
   - ✅ Debe abrirse automáticamente
   - ✅ No debe mostrar opción de elegir navegador
4. **Si la app NO está instalada:**
   - ✅ Muestra la página web con el código
   - ✅ Después de 2 segundos redirige a App Store

### 2. Verificar archivo desde iOS

1. Abre Safari en iPhone
2. Visita: `https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association`
3. Debe mostrar el contenido JSON

### 3. Probar desde Notes (método recomendado)

1. Abre la app Notes en iPhone
2. Escribe: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
3. Mantén presionado el link
4. Debe mostrar opción "Abrir en GetGo" (si la app está instalada)

## 🔍 Herramientas Online de Verificación

### Para Android App Links

**Google Digital Asset Links Validator:**
```
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://getgo-page-h84g.vercel.app&relation=delegate_permission/common.handle_all_urls
```

Abre este URL en el navegador y verifica que retorne información sobre tu app.

### Para iOS Universal Links

**Branch.io AASA Validator:**
```
https://branch.io/resources/aasa-validator/
```

Ingresa: `https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association`

**yURL Validator:**
```
https://yurl.chayev.com/
```

## 📋 Checklist Completo de Verificación

### Verificación Básica
- [ ] `curl -I` retorna `200 OK`
- [ ] `Content-Type: application/json`
- [ ] El JSON es válido (sin errores de sintaxis)
- [ ] No hay redirecciones
- [ ] Accesible sin autenticación
- [ ] Funciona vía HTTPS

### Verificación Android
- [ ] `adb shell pm get-app-links` muestra `verified`
- [ ] Deeplink abre la app automáticamente (sin diálogo)
- [ ] El código se pasa correctamente a la app
- [ ] Google Digital Asset Links Validator retorna información

### Verificación iOS
- [ ] Deeplink abre la app automáticamente desde Safari
- [ ] Funciona desde Notes app
- [ ] AASA Validator no muestra errores
- [ ] Associated Domains configurado en Xcode

## 🐛 Troubleshooting

### Si retorna 404

1. **Verifica que el archivo esté en `out/.well-known/`:**
   ```bash
   ls -la out/.well-known/
   ```

2. **Verifica que se haya desplegado en Vercel:**
   - Ve al dashboard de Vercel
   - Verifica que el último deployment esté activo

3. **Verifica la URL:**
   - Asegúrate de usar el dominio correcto: `getgo-page-h84g.vercel.app`
   - Verifica que no haya typos en la URL

### Si retorna Content-Type incorrecto

1. **Verifica `vercel.json`:**
   ```json
   {
     "headers": [
       {
         "source": "/.well-known/(.*)",
         "headers": [
           {
             "key": "Content-Type",
             "value": "application/json"
           }
         ]
       }
     ]
   }
   ```

2. **Vuelve a desplegar en Vercel**

### Si Android no verifica el dominio

1. **Verifica el SHA256 fingerprint:**
   ```bash
   # Debug
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep SHA256
   
   # Release
   keytool -list -v -keystore /ruta/a/tu/keystore.jks -alias tu-alias | grep SHA256
   ```

2. **Verifica que coincida con `assetlinks.json`**

3. **Fuerza re-verificación:**
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

### Si iOS no abre la app

1. **Verifica Associated Domains en Xcode:**
   - Debe tener: `applinks:getgo-page-h84g.vercel.app`

2. **Verifica el Team ID en `apple-app-site-association`**

3. **Reinstala la app** (los Universal Links se verifican al instalar)

## 🎯 Comandos Rápidos de Prueba

```bash
# Prueba rápida completa
echo "=== Testing assetlinks.json ===" && \
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json && \
echo "" && \
echo "=== Testing apple-app-site-association ===" && \
curl -I https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association && \
echo "" && \
echo "=== Content of assetlinks.json ===" && \
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json | python3 -m json.tool
```

## ✅ Resultado Final Esperado

Cuando todo funciona correctamente:

1. **Desde terminal:**
   ```bash
   $ curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
   HTTP/2 200
   content-type: application/json
   server: Vercel
   ```

2. **Desde navegador:**
   - Muestra el JSON formateado
   - Status 200

3. **Desde Android:**
   - App se abre automáticamente
   - Sin diálogo de selección

4. **Desde iOS:**
   - App se abre automáticamente
   - Sin opción de abrir en Safari



