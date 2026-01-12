# 🔧 Solución: App Links No Configurados

## 📋 Diagnóstico

Tu app **SÍ está instalada** (`com.getgoapp.pasajero`), pero el comando `pm get-app-links` no retorna nada.

**Esto significa:**
- ❌ La app **NO tiene App Links configurados** en `AndroidManifest.xml`
- ❌ O los App Links no tienen `android:autoVerify="true"`
- ❌ El sistema nunca ha intentado verificar los App Links

## ✅ Solución: Configurar App Links en AndroidManifest.xml

### Paso 1: Verificar AndroidManifest.xml

Tu `AndroidManifest.xml` debe tener esto:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true">
    
    <!-- App Links con autoVerify -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <!-- Dominio y ruta para deeplinks -->
        <data
            android:scheme="https"
            android:host="getgo-page-h84g.vercel.app"
            android:pathPrefix="/refer" />
    </intent-filter>
    
    <!-- Si tienes otras rutas, agrega más intent-filter -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="getgo-page-h84g.vercel.app"
            android:pathPrefix="/legal" />
    </intent-filter>
</activity>
```

**Puntos críticos:**
- ✅ `android:autoVerify="true"` **DEBE estar presente**
- ✅ `android:exported="true"` en la Activity
- ✅ `android:host` debe coincidir con tu dominio
- ✅ `android:pathPrefix` debe coincidir con tus rutas

### Paso 2: Verificar SHA256 Fingerprint

El SHA256 en `assetlinks.json` debe coincidir con el de tu keystore:

**Para Debug:**
```bash
keytool -list -v -keystore ~/.android/debug.keystore \
  -alias androiddebugkey \
  -storepass android \
  -keypass android | grep SHA256
```

**Para Release:**
```bash
keytool -list -v -keystore /ruta/a/tu/keystore.jks \
  -alias tu-alias | grep SHA256
```

**El SHA256 debe estar en `public/.well-known/assetlinks.json`:**

```json
{
  "sha256_cert_fingerprints": [
    "C8:7B:33:92:78:CF:B3:EA:ED:88:92:B2:C5:00:F8:EA:D0:37:26:28:90:30:CA:1A:43:04:FF:56:DD:12:87:57"
  ]
}
```

### Paso 3: Verificar que assetlinks.json sea accesible

```bash
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
```

**Debe retornar:**
- Status: `200 OK`
- Content-Type: `application/json`
- El JSON con tu package_name y SHA256

### Paso 4: Recompilar y Reinstalar la App

Después de agregar `android:autoVerify="true"`:

```bash
# Limpiar build anterior
./gradlew clean

# Recompilar
./gradlew assembleDebug  # o assembleRelease

# Desinstalar versión anterior (opcional, pero recomendado)
adb uninstall com.getgoapp.pasajero

# Instalar nueva versión
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### Paso 5: Forzar Verificación de App Links

```bash
# Limpiar estado anterior
adb shell pm set-app-links --package com.getgoapp.pasajero 0 all

# Forzar verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Esperar 10-30 segundos para que Android verifique

# Verificar estado
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

## 🧪 Probar Deeplink

Después de configurar todo:

```bash
# Probar deeplink manualmente
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgo-page-h84g.vercel.app/refer?code=TEST123" \
  com.getgoapp.pasajero
```

**Si funciona correctamente:**
- ✅ La app se abre automáticamente
- ✅ NO muestra diálogo para elegir navegador
- ✅ La app recibe el código `TEST123`

**Si muestra diálogo:**
- ❌ App Links aún no están verificados
- ⏳ Puede tardar hasta 20 horas
- 🔄 Intenta forzar re-verificación nuevamente

## 📝 Checklist Completo

- [ ] `AndroidManifest.xml` tiene `android:autoVerify="true"`
- [ ] `android:host` es `getgo-page-h84g.vercel.app`
- [ ] `android:pathPrefix` coincide con tus rutas (`/refer`, etc.)
- [ ] `assetlinks.json` accesible (200 OK)
- [ ] SHA256 fingerprint coincide
- [ ] App recompilada e instalada
- [ ] Verificación forzada (`pm verify-app-links --re-verify`)
- [ ] `pm get-app-links` muestra `verified`
- [ ] Deeplink abre app automáticamente

## ⚠️ Notas Importantes

1. **Android puede tardar hasta 20 horas** en verificar App Links automáticamente
2. **Puedes forzar verificación** con `pm verify-app-links --re-verify`
3. **La verificación se hace al instalar la app** si `autoVerify="true"` está presente
4. **El SHA256 debe coincidir exactamente** (con dos puntos, sin espacios)
5. **Cada ruta necesita su propio `intent-filter`** si quieres soportar múltiples rutas

## 🔗 Referencias

- [Android App Links Documentation](https://developer.android.com/training/app-links)
- [Verify Android App Links](https://developer.android.com/training/app-links/verify-site-associations)



