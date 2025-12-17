# 🔍 Guía para Verificar Deeplinks

## ✅ Verificación Paso a Paso

### 1. Verificar que los archivos sean accesibles

#### Desde navegador o terminal:

```bash
# Verificar assetlinks.json (Android)
curl https://getgoapp.cl/.well-known/assetlinks.json

# Verificar apple-app-site-association (iOS)
curl https://getgoapp.cl/.well-known/apple-app-site-association
```

**Debe retornar:**
- ✅ Status: `200 OK`
- ✅ Content-Type: `application/json`
- ✅ El contenido del archivo JSON

**Si falla:**
- ❌ Verifica que los archivos estén desplegados
- ❌ Verifica que el servidor sirva archivos `.well-known/`
- ❌ Verifica que no haya redirecciones

---

## 🤖 Android - Verificación

### Opción 1: Verificar estado de App Links

```bash
# Conecta tu dispositivo Android por USB
# Activa "Depuración USB" en el teléfono

# Verificar estado de verificación
adb shell pm get-app-links com.getgoapp.pasajero
```

**Resultado esperado:**
```
com.getgoapp.pasajero:
  ID: 1234567890abcdef
  Signatures: [C8:7B:33:92:...]
  Domain verification state:
    getgoapp.cl: verified
```

**Si muestra `1024` o `not verified`:**
- El archivo `assetlinks.json` no está configurado correctamente
- El SHA256 fingerprint no coincide
- El dominio no está verificado

### Opción 2: Forzar re-verificación

```bash
# Forzar re-verificación (útil después de cambios)
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Verificar nuevamente
adb shell pm get-app-links com.getgoapp.pasajero
```

### Opción 3: Probar deeplink manualmente

```bash
# Abrir deeplink desde terminal
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgoapp.cl/refer?code=TEST123" \
  com.getgoapp.pasajero
```

**Resultado esperado:**
- ✅ La app se abre automáticamente
- ✅ La app recibe el código `TEST123`

### Opción 4: Probar desde navegador

1. Abre Chrome en tu Android
2. Visita: `https://getgoapp.cl/refer?code=TEST123`
3. **Si la app está instalada:**
   - ✅ Debe abrirse automáticamente (sin diálogo)
   - ✅ No debe mostrar opción de elegir navegador
4. **Si la app NO está instalada:**
   - ✅ Después de 2 segundos debe redirigir a Play Store

---

## 🍎 iOS - Verificación

### Opción 1: Verificar Universal Links

1. **En el iPhone:**
   - Abre Safari
   - Visita: `https://getgoapp.cl/refer?code=TEST123`

2. **Comportamiento esperado:**
   - ✅ Si la app está instalada: Se abre automáticamente
   - ✅ Si la app NO está instalada: Muestra la página web, luego redirige a App Store

### Opción 2: Verificar archivo desde iOS

1. Abre Safari en iPhone
2. Visita: `https://getgoapp.cl/.well-known/apple-app-site-association`
3. Debe mostrar el contenido JSON

### Opción 3: Probar desde Notes (método recomendado)

1. Abre la app Notes en iPhone
2. Escribe: `https://getgoapp.cl/refer?code=TEST123`
3. Mantén presionado el link
4. Debe mostrar opción "Abrir en GetGo" (si la app está instalada)

### Opción 4: Verificar en Xcode

1. Abre tu proyecto en Xcode
2. Ve a **Signing & Capabilities**
3. Verifica que **Associated Domains** tenga:
   - `applinks:getgoapp.cl`
4. Verifica que el Team ID coincida con el del archivo

---

## 🌐 Verificación desde la Web

### 1. Verificar archivos JSON

```bash
# Verificar formato JSON
curl https://getgoapp.cl/.well-known/assetlinks.json | jq .

# Verificar formato JSON (iOS)
curl https://getgoapp.cl/.well-known/apple-app-site-association | jq .
```

### 2. Herramientas online de verificación

#### Para Android:
- **App Links Validator**: https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://getgoapp.cl&relation=delegate_permission/common.handle_all_urls

#### Para iOS:
- **Branch.io Universal Links Validator**: https://branch.io/resources/aasa-validator/
- **yURL Validator**: https://yurl.chayev.com/

### 3. Verificar desde la página web

1. Abre la consola del navegador (F12)
2. Visita: `https://getgoapp.cl/refer?code=TEST123`
3. Debes ver estos logs:
   ```
   URL completa: https://getgoapp.cl/refer?code=TEST123
   Código obtenido de URL: TEST123
   Platform: android (o ios)
   Current URL: https://getgoapp.cl/refer?code=TEST123
   Already on getgoapp.cl domain, waiting for app to open...
   ```

---

## 🧪 Pruebas de Funcionamiento

### Test 1: App Instalada

**Android:**
1. Instala la app en tu dispositivo
2. Abre Chrome
3. Visita: `https://getgoapp.cl/refer?code=ABC123`
4. ✅ **Resultado esperado:** La app se abre automáticamente con el código

**iOS:**
1. Instala la app en tu iPhone
2. Abre Safari
3. Visita: `https://getgoapp.cl/refer?code=ABC123`
4. ✅ **Resultado esperado:** La app se abre automáticamente con el código

### Test 2: App NO Instalada

**Android:**
1. Desinstala la app
2. Abre Chrome
3. Visita: `https://getgoapp.cl/refer?code=ABC123`
4. ✅ **Resultado esperado:** 
   - Muestra la página web con el código
   - Después de 2 segundos redirige a Play Store

**iOS:**
1. Desinstala la app
2. Abre Safari
3. Visita: `https://getgoapp.cl/refer?code=ABC123`
4. ✅ **Resultado esperado:**
   - Muestra la página web con el código
   - Después de 2 segundos redirige a App Store

### Test 3: Desde otro dominio

1. Visita: `https://tu-dominio-vercel.vercel.app/refer?code=ABC123`
2. ✅ **Resultado esperado:**
   - Redirige automáticamente a `https://getgoapp.cl/refer?code=ABC123`
   - Luego intenta abrir la app o redirige a la store

---

## 🔧 Troubleshooting

### Problema: Android muestra diálogo para elegir navegador

**Causa:** `assetlinks.json` no está verificado

**Solución:**
1. Verifica que el archivo sea accesible
2. Verifica que el SHA256 fingerprint sea correcto
3. Fuerza re-verificación:
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

### Problema: iOS no abre la app automáticamente

**Causa:** Universal Links no configurados correctamente

**Solución:**
1. Verifica que `apple-app-site-association` sea accesible
2. Verifica que el Team ID sea correcto
3. Verifica que Associated Domains esté configurado en Xcode
4. Reinstala la app (los Universal Links se verifican al instalar)

### Problema: Loop infinito

**Causa:** El código intenta redirigir a sí mismo

**Solución:** Ya está corregido en el código actual. Verifica que:
- El dominio en el deeplink sea `getgoapp.cl`
- No haya redirecciones múltiples

### Problema: El código no se pasa a la app

**Causa:** La app no está extrayendo el código de la URL

**Solución:** Verifica en tu app móvil que esté leyendo:
- Android: `intent.data?.getQueryParameter("code")`
- iOS: `url.queryParameters["code"]`

---

## ✅ Checklist de Verificación

- [ ] Archivo `assetlinks.json` accesible en `https://getgoapp.cl/.well-known/assetlinks.json`
- [ ] Archivo `apple-app-site-association` accesible en `https://getgoapp.cl/.well-known/apple-app-site-association`
- [ ] SHA256 fingerprint correcto en `assetlinks.json`
- [ ] Team ID correcto en `apple-app-site-association`
- [ ] Android: App Links verificados (`pm get-app-links` muestra `verified`)
- [ ] iOS: Associated Domains configurado en Xcode
- [ ] App instalada: Se abre automáticamente desde link
- [ ] App no instalada: Redirige a store después de 2 segundos
- [ ] El código de referido se pasa correctamente a la app
- [ ] No hay loops infinitos

---

## 📱 Comandos Rápidos de Verificación

```bash
# Verificar archivos
curl https://getgoapp.cl/.well-known/assetlinks.json
curl https://getgoapp.cl/.well-known/apple-app-site-association

# Verificar Android (con dispositivo conectado)
adb shell pm get-app-links com.getgoapp.pasajero
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Probar deeplink manualmente (Android)
adb shell am start -a android.intent.action.VIEW -d "https://getgoapp.cl/refer?code=TEST123" com.getgoapp.pasajero
```

---

## 🎯 Resultado Final Esperado

Cuando todo funciona correctamente:

1. **Usuario hace clic en link:** `https://getgoapp.cl/refer?code=ABC123`
2. **Si app instalada:**
   - ✅ App se abre automáticamente
   - ✅ App recibe código `ABC123`
   - ✅ Sin diálogos, sin navegador
3. **Si app NO instalada:**
   - ✅ Muestra página web con código
   - ✅ Después de 2s redirige a store
   - ✅ Usuario descarga app
   - ✅ Al abrir app, puede usar el código


