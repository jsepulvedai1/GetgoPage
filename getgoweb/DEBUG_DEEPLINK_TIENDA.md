# 🐛 Debug: Deeplink Envía a Tienda (App Instalada)

## 📋 Problema

Tienes la app instalada pero el deeplink te envía a la tienda en lugar de abrir la app.

## 🔍 Causas Posibles

### 1. App Links No Verificados (Más Común)

**Síntoma:** Android muestra un diálogo para elegir entre navegador y app, pero la página redirige a la tienda antes de que elijas.

**Causa:** `android:autoVerify="true"` no está configurado o los App Links no están verificados.

**Solución:**
1. Verifica que `AndroidManifest.xml` tenga `android:autoVerify="true"`
2. Verifica que `assetlinks.json` sea accesible
3. Fuerza re-verificación:
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

### 2. Timeout Muy Corto

**Síntoma:** La app se abre pero la página ya redirigió a la tienda.

**Causa:** El timeout (3.5-4 segundos) es muy corto, especialmente si hay un diálogo.

**Solución:** Ya aumentamos el timeout a 5-6 segundos y agregamos verificación periódica.

### 3. Detección No Funciona

**Síntoma:** La app se abre pero la página no lo detecta.

**Causa:** Los eventos de detección no se disparan correctamente.

**Solución:** Agregamos verificación periódica cada 500ms usando `document.hidden` y `document.hasFocus()`.

## ✅ Mejoras Implementadas

### 1. Timeout Aumentado
- Android: 3.5s → **6 segundos**
- iOS: 4s → **5 segundos**

### 2. Verificación Periódica
- Verifica cada 500ms si la página perdió el foco
- Usa `document.hidden` y `document.hasFocus()`
- Más confiable que eventos individuales

### 3. Logs Mejorados
- Muestra mensajes claros sobre qué está pasando
- Indica si hay un diálogo
- Muestra cuándo se guarda el código

## 🧪 Cómo Probar

### Test 1: Con App Instalada

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
2. Abre la consola del navegador (F12)
3. Observa los logs:
   ```
   📍 Already on getgo-page-h84g.vercel.app domain
   ⏳ Waiting for app to open (App Links should handle this automatically)
   💡 If you see a dialog, choose "Open with GetGo"
   ⏳ Esperando 6000ms para ver si la app se abre...
   ```

4. **Si ves un diálogo:**
   - Elige "Abrir con GetGo"
   - La app debería abrirse
   - La página NO debería redirigir a la tienda

5. **Si NO ves diálogo y la app se abre automáticamente:**
   - ✅ App Links están verificados correctamente
   - La página debería detectar que la app se abrió

### Test 2: Verificar App Links

```bash
# Verificar estado de App Links
adb shell pm get-app-links com.getgoapp.pasajero
```

**Si muestra `verified`:**
- ✅ App Links están configurados correctamente
- La app debería abrirse automáticamente

**Si muestra `not verified` o `1024`:**
- ❌ App Links no están verificados
- Necesitas agregar `android:autoVerify="true"` y recompilar

### Test 3: Verificar Archivos .well-known

```bash
# Verificar que el archivo sea accesible
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# Debe retornar: HTTP/2 200
```

## 🔧 Solución Paso a Paso

### Si App Links NO están verificados:

1. **Agregar `android:autoVerify="true"` en AndroidManifest.xml**
   ```xml
   <intent-filter android:autoVerify="true">
       <action android:name="android.intent.action.VIEW" />
       <category android:name="android.intent.category.DEFAULT" />
       <category android:name="android.intent.category.BROWSABLE" />
       <data
           android:scheme="https"
           android:host="getgo-page-h84g.vercel.app"
           android:pathPrefix="/refer" />
   </intent-filter>
   ```

2. **Recompilar y reinstalar la app**
   ```bash
   ./gradlew clean assembleRelease
   adb uninstall com.getgoapp.pasajero
   adb install -r app/build/outputs/apk/release/app-release.apk
   ```

3. **Forzar verificación**
   ```bash
   adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
   ```

4. **Verificar estado**
   ```bash
   adb shell pm get-app-links com.getgoapp.pasajero
   ```

### Si App Links SÍ están verificados pero aún redirige:

1. **Verifica los logs en consola**
   - ¿Se detecta que la app se abrió?
   - ¿Cuánto tiempo tarda en redirigir?

2. **Aumenta el timeout si es necesario**
   - Actualmente es 6 segundos para Android
   - Puedes aumentarlo más si es necesario

3. **Verifica que la detección funcione**
   - Los logs deberían mostrar: `✅ App detected as opened`
   - Si no aparece, la detección no está funcionando

## 📊 Tabla de Diagnóstico

| Situación | App Links | Resultado Esperado | Si Redirige a Tienda |
|-----------|-----------|-------------------|---------------------|
| ✅ Verificados | Sí | App se abre automáticamente | ❌ Problema de detección |
| ⚠️ No verificados | No | Muestra diálogo | ⚠️ Normal si timeout se cumple |
| ❌ No configurados | No | Redirige a tienda | ✅ Comportamiento esperado |

## 💡 Consejos

1. **Siempre revisa la consola del navegador** para ver qué está pasando
2. **Si ves un diálogo, elige la app rápidamente** (tienes 6 segundos)
3. **El código se guarda en localStorage** incluso si redirige a la tienda
4. **La app puede recuperar el código** desde `/get-referral-code`

## 🔗 Referencias

- Ver `FIX_APP_LINKS.md` para configurar App Links
- Ver `DEBUG_APP_DETECTION.md` para más detalles de detección
- Ver `ANDROID_APP_LINKS_DIAGNOSTIC.md` para comandos de diagnóstico

