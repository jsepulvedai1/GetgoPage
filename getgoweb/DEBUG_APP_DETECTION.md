# 🔍 Debug: ¿Por qué me redirige a la tienda?

## 📋 Significado

Si al hacer clic en un link de referido te redirige a la tienda, puede significar:

### ✅ Escenario Normal (App NO instalada)
- La app **NO está instalada** en el dispositivo
- El sistema intentó abrir la app pero no la encontró
- Después del timeout (2.5-3 segundos), redirige a la tienda
- **Esto es el comportamiento esperado** ✅

### ❌ Escenario Problemático (App SÍ instalada)
- La app **SÍ está instalada** pero no se detecta correctamente
- Los App Links / Universal Links no están configurados correctamente
- La app no se abre automáticamente
- Redirige a la tienda incorrectamente ❌

## 🔍 Cómo Diagnosticar

### Paso 1: Verificar en la Consola del Navegador

1. Abre el link en el navegador (Chrome/Safari)
2. Presiona `F12` o abre las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca estos mensajes:

**Si la app NO está instalada:**
```
Already on getgo-page-h84g.vercel.app domain, waiting for app to open or redirecting to store
⏱️ Timeout reached, app did not open, redirecting to store...
```

**Si la app SÍ está instalada pero no se detecta:**
```
Already on getgo-page-h84g.vercel.app domain, waiting for app to open or redirecting to store
📱 Blur event detected
✅ App detected as opened
✅ App opened successfully, not redirecting to store
```

### Paso 2: Verificar si la App Está Instalada

**Android:**
```bash
# Conecta el dispositivo por USB
adb shell pm list packages | grep getgo
# Debe mostrar: package:com.getgoapp.pasajero
```

**iOS:**
- Busca la app GetGo en el home screen
- O verifica en Settings → General → iPhone Storage

### Paso 3: Verificar App Links / Universal Links

**Android - Verificar App Links:**
```bash
adb shell pm get-app-links com.getgoapp.pasajero
```

**Resultado esperado si está configurado:**
```
com.getgoapp.pasajero:
  Domain verification state:
    getgo-page-h84g.vercel.app: verified
```

**Si muestra `1024` o `not verified`:**
- ❌ Los archivos `.well-known/assetlinks.json` no están configurados correctamente
- ❌ El SHA256 fingerprint no coincide
- ❌ El dominio no está verificado

**iOS - Verificar Universal Links:**
1. Abre Safari
2. Visita: `https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association`
3. Debe mostrar el JSON correctamente

## 🐛 Problemas Comunes y Soluciones

### Problema 1: App instalada pero redirige a tienda

**Causa:** App Links / Universal Links no están verificados

**Solución Android:**
1. Verifica que `assetlinks.json` sea accesible:
   ```bash
   curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
   ```
2. Verifica el SHA256 fingerprint en `assetlinks.json`
3. Fuerza re-verificación:
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

**Solución iOS:**
1. Verifica que `apple-app-site-association` sea accesible
2. Verifica Associated Domains en Xcode
3. Reinstala la app (los Universal Links se verifican al instalar)

### Problema 2: La app se abre pero luego redirige a tienda

**Causa:** El timeout es muy corto o la detección falla

**Solución:**
- Aumenta el timeout en el código (ya está en 2.5-3 segundos)
- Verifica los logs en consola para ver qué eventos se disparan

### Problema 3: La app nunca se abre automáticamente

**Causa:** App Links / Universal Links no configurados en la app

**Solución:**
- **Android:** Verifica `AndroidManifest.xml` tiene `android:autoVerify="true"`
- **iOS:** Verifica Associated Domains en Xcode

## 🧪 Pruebas Paso a Paso

### Test 1: Verificar que los archivos .well-known funcionen

```bash
# Debe retornar 200 OK
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
curl -I https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association
```

### Test 2: Probar deeplink manualmente (Android)

```bash
# Con app instalada, debe abrirse automáticamente
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgo-page-h84g.vercel.app/refer?code=TEST123" \
  com.getgoapp.pasajero
```

**Si muestra diálogo para elegir navegador:**
- ❌ App Links no están verificados

**Si abre la app directamente:**
- ✅ App Links funcionan correctamente

### Test 3: Probar desde navegador

1. **Con app instalada:**
   - Abre Chrome/Safari
   - Visita: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
   - **Resultado esperado:** App se abre automáticamente

2. **Sin app instalada:**
   - Abre Chrome/Safari
   - Visita: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
   - **Resultado esperado:** Después de 2.5-3s redirige a tienda

## 📊 Tabla de Diagnóstico

| Situación | App Instalada | App Links Configurados | Resultado |
|-----------|---------------|----------------------|-----------|
| ✅ Ideal | Sí | Sí | App se abre automáticamente |
| ⚠️ Parcial | Sí | No | Muestra diálogo, luego abre app |
| ❌ Problema | Sí | No | Redirige a tienda (incorrecto) |
| ✅ Normal | No | N/A | Redirige a tienda (correcto) |

## 🔧 Comandos Útiles de Debug

```bash
# Ver logs en tiempo real (Android)
adb logcat | grep -i "getgo\|deeplink\|applink"

# Verificar estado de App Links (Android)
adb shell pm get-app-links com.getgoapp.pasajero

# Forzar re-verificación (Android)
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Verificar archivos .well-known
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json | jq .
curl https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association | jq .
```

## ✅ Checklist de Verificación

- [ ] App está instalada en el dispositivo
- [ ] Archivos `.well-known` son accesibles (200 OK)
- [ ] SHA256 fingerprint correcto en `assetlinks.json`
- [ ] Team ID correcto en `apple-app-site-association`
- [ ] Android: App Links verificados (`pm get-app-links` muestra `verified`)
- [ ] iOS: Associated Domains configurado en Xcode
- [ ] Android: `android:autoVerify="true"` en AndroidManifest.xml
- [ ] Consola del navegador muestra eventos de detección
- [ ] Timeout es suficiente (2.5-3 segundos)

## 🎯 Resumen

**Si te redirige a la tienda:**

1. **Primero verifica:** ¿La app está instalada?
   - Si NO → ✅ Comportamiento normal
   - Si SÍ → ❌ Problema de configuración

2. **Si la app SÍ está instalada:**
   - Verifica App Links / Universal Links
   - Verifica archivos `.well-known`
   - Revisa los logs en consola
   - Fuerza re-verificación

3. **Si todo está configurado pero no funciona:**
   - Puede tardar hasta 20 horas para que Android verifique
   - iOS verifica al instalar la app
   - Reinstala la app si es necesario

