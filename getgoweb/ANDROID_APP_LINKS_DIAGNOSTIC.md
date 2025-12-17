# 🔍 Diagnóstico de App Links en Android

## 📋 Comandos de Diagnóstico

### 1. Verificar que el dispositivo esté conectado

```bash
adb devices
```

**Resultado esperado:**
```
List of devices attached
ABC123XYZ    device
```

Si muestra `unauthorized` o `offline`, necesitas:
- Activar "Depuración USB" en el teléfono
- Aceptar el diálogo de autorización en el teléfono

### 2. Verificar que la app esté instalada

```bash
adb shell pm list packages | grep getgo
```

**Resultado esperado:**
```
package:com.getgoapp.pasajero
```

Si no muestra nada, la app no está instalada.

### 3. Verificar estado de App Links (comando completo)

```bash
adb shell pm get-app-links com.getgoapp.pasajero
```

**Si no muestra nada:**
- La app no tiene App Links configurados en `AndroidManifest.xml`
- O la app no está instalada

**Resultado esperado si está configurado:**
```
com.getgoapp.pasajero:
  ID: 1234567890abcdef
  Signatures: [C8:7B:33:92:...]
  Domain verification state:
    getgo-page-h84g.vercel.app: verified
```

**Si muestra `not verified` o `1024`:**
- Los archivos `.well-known/assetlinks.json` no están configurados
- El SHA256 fingerprint no coincide
- El dominio no está verificado

### 4. Verificar configuración en AndroidManifest.xml

La app debe tener esto en `AndroidManifest.xml`:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="getgo-page-h84g.vercel.app"
            android:pathPrefix="/refer" />
    </intent-filter>
</activity>
```

**Puntos importantes:**
- ✅ `android:autoVerify="true"` debe estar presente
- ✅ El `host` debe coincidir con tu dominio
- ✅ El `pathPrefix` debe coincidir con tus rutas

### 5. Verificar SHA256 Fingerprint

```bash
# Para debug keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep SHA256

# Para release keystore (reemplaza con tu ruta)
keytool -list -v -keystore /ruta/a/tu/keystore.jks -alias tu-alias | grep SHA256
```

**El SHA256 debe coincidir con el de `assetlinks.json`**

### 6. Forzar re-verificación

```bash
# Limpiar estado de verificación
adb shell pm set-app-links --package com.getgoapp.pasajero 0 all

# Forzar re-verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Esperar unos segundos y verificar nuevamente
adb shell pm get-app-links com.getgoapp.pasajero
```

### 7. Verificar archivos .well-known

```bash
# Verificar que el archivo sea accesible
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# Verificar el contenido
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json | jq .
```

**Debe mostrar:**
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.getgoapp.pasajero",
      "sha256_cert_fingerprints": [
        "C8:7B:33:92:78:CF:B3:EA:ED:88:92:B2:C5:00:F8:EA:D0:37:26:28:90:30:CA:1A:43:04:FF:56:DD:12:87:57"
      ]
    }
  }
]
```

## 🐛 Problemas Comunes

### Problema 1: Comando no retorna nada

**Causas posibles:**
1. La app no está instalada
2. La app no tiene App Links configurados en `AndroidManifest.xml`
3. El dispositivo no está conectado correctamente

**Solución:**
```bash
# Verificar que la app esté instalada
adb shell pm list packages | grep getgo

# Si no está instalada, instálala
adb install -r /ruta/a/tu/app.apk

# Verificar AndroidManifest.xml tiene autoVerify="true"
```

### Problema 2: Muestra "not verified" o "1024"

**Causas:**
1. Archivo `assetlinks.json` no accesible
2. SHA256 fingerprint no coincide
3. Dominio no configurado correctamente

**Solución:**
1. Verifica que `assetlinks.json` sea accesible
2. Verifica que el SHA256 coincida
3. Fuerza re-verificación

### Problema 3: Muestra diálogo para elegir navegador

**Causa:** App Links no están verificados

**Solución:**
- Verifica que `assetlinks.json` esté configurado
- Fuerza re-verificación
- Espera hasta 20 horas (Android puede tardar)

## ✅ Checklist de Verificación

- [ ] Dispositivo conectado (`adb devices`)
- [ ] App instalada (`pm list packages | grep getgo`)
- [ ] AndroidManifest.xml tiene `autoVerify="true"`
- [ ] `assetlinks.json` accesible (200 OK)
- [ ] SHA256 fingerprint coincide
- [ ] App Links verificados (`pm get-app-links` muestra `verified`)
- [ ] Deeplink abre app automáticamente (sin diálogo)

## 🧪 Prueba Completa

```bash
# 1. Verificar dispositivo
adb devices

# 2. Verificar app instalada
adb shell pm list packages | grep getgo

# 3. Verificar App Links
adb shell pm get-app-links com.getgoapp.pasajero

# 4. Verificar archivo .well-known
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# 5. Probar deeplink manualmente
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgo-page-h84g.vercel.app/refer?code=TEST123" \
  com.getgoapp.pasajero
```

## 📝 Notas Importantes

- **Android puede tardar hasta 20 horas** en verificar App Links después de configurar `assetlinks.json`
- **La verificación se hace automáticamente** cuando instalas la app
- **Puedes forzar re-verificación** con `pm verify-app-links --re-verify`
- **El SHA256 debe coincidir exactamente** (sin espacios, con dos puntos)

