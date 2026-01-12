# Configuración de Deep Links y App Links

## 📱 Android App Links

### Estado Actual

El código actual usa **Intent URLs** que funcionan pero muestran un diálogo para elegir entre navegador y app.

### Configuración de `assetlinks.json`

Para que Android abra la app automáticamente sin mostrar diálogo, necesitas configurar el archivo `assetlinks.json`.

#### 1. Obtener el SHA256 Fingerprint

**Para Debug (desarrollo):**
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android | grep SHA256
```

**Para Release (producción):**
```bash
keytool -list -v -keystore /ruta/a/tu/keystore.jks -alias tu-alias | grep SHA256
```

#### 2. Actualizar el archivo

Edita `public/.well-known/assetlinks.json` y reemplaza `REEMPLAZAR_CON_TU_SHA256_FINGERPRINT` con tu fingerprint (sin los dos puntos `:`).

Ejemplo:
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.getgoapp.pasajero",
      "sha256_cert_fingerprints": [
        "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
      ]
    }
  }
]
```

#### 3. Verificar que el archivo sea accesible

Una vez desplegado, verifica que el archivo sea accesible:

```bash
curl https://getgoapp.cl/.well-known/assetlinks.json
```

**Requisitos:**
- ✅ Debe estar accesible vía HTTPS
- ✅ Content-Type: `application/json`
- ✅ Sin redirecciones
- ✅ Accesible sin autenticación

#### 4. Verificar en Android

```bash
# Verificar el estado en Android
adb shell pm get-app-links com.getgoapp.pasajero
```

Debería mostrar `200` (verificado) en lugar de `1024` (no verificado).

Para forzar la verificación:
```bash
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
```

**Nota:** La verificación puede tardar hasta 20 horas después de configurar el archivo.

#### 5. Habilitar autoVerify en AndroidManifest.xml

Una vez que el archivo esté configurado y verificado:

1. Descomenta los `intent-filter` con `android:autoVerify="true"` en `AndroidManifest.xml`
2. Comenta o elimina los `intent-filter` sin `autoVerify`
3. Recompila la app

---

## 🍎 iOS Universal Links

### Configuración de `apple-app-site-association`

Para que iOS abra la app automáticamente, necesitas configurar el archivo `apple-app-site-association`.

#### 1. Crear el archivo

Crea `public/.well-known/apple-app-site-association` (sin extensión `.json`):

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TU_TEAM_ID.com.getgoapp.pasajero",
        "paths": [
          "/refer*",
          "/legal*"
        ]
      }
    ]
  }
}
```

**Reemplaza:**
- `TU_TEAM_ID` con tu Team ID de Apple Developer

#### 2. Verificar que el archivo sea accesible

```bash
curl https://getgoapp.cl/.well-known/apple-app-site-association
```

**Requisitos:**
- ✅ Debe estar accesible vía HTTPS
- ✅ Content-Type: `application/json` (aunque no tenga extensión .json)
- ✅ Sin redirecciones
- ✅ Accesible sin autenticación

#### 3. Configurar en Xcode

1. Abre tu proyecto en Xcode
2. Ve a **Signing & Capabilities**
3. Agrega **Associated Domains**
4. Agrega: `applinks:getgoapp.cl`

---

## 🔄 Flujo Actual de Deep Links

### Android
1. Intenta abrir con Intent URL: `intent://refer?code=ABC123#Intent;scheme=https;package=com.getgoapp.pasajero;end`
2. Si la app está instalada → se abre
3. Si no está instalada → después de 2.5s redirige a Play Store

### iOS
1. Intenta abrir con Universal Link: `https://getgoapp.com/refer?code=ABC123`
2. Si la app está instalada → se abre
3. Si no está instalada → después de 2.5s redirige a App Store

---

## 📝 Notas Importantes

- Los archivos en `public/.well-known/` se servirán automáticamente en `/.well-known/` cuando despliegues
- Next.js sirve archivos estáticos desde `public/` en la raíz del dominio
- Asegúrate de que tu servidor web sirva estos archivos con el Content-Type correcto
- Para testing inmediato, el código actual funciona con Intent URLs (Android) y Universal Links (iOS) sin verificación

---

## 🚀 Próximos Pasos

1. ✅ Obtener SHA256 fingerprint de tu keystore
2. ✅ Actualizar `public/.well-known/assetlinks.json`
3. ✅ Crear `public/.well-known/apple-app-site-association`
4. ✅ Desplegar y verificar que los archivos sean accesibles
5. ✅ Habilitar `autoVerify` en AndroidManifest.xml
6. ✅ Configurar Associated Domains en Xcode




