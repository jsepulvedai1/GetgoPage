# Forzar Verificación de App Links

## ✅ Estado Actual

- ✅ El archivo `assetlinks.json` está desplegado correctamente
- ✅ El SHA256 es correcto: `71:E0:56:5B:E0:B4:83:05:...`
- ⏳ Android aún no ha verificado el cambio (código `1024`)

## 🔧 Solución: Forzar Verificación

Android necesita que le digas explícitamente que verifique de nuevo. Ejecuta estos comandos:

### Paso 1: Limpiar cache de verificación

```bash
adb shell pm clear --cache-only com.getgoapp.pasajero
```

### Paso 2: Forzar verificación

```bash
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
```

### Paso 3: Verificar el estado

```bash
adb shell pm get-app-links com.getgoapp.pasajero
```

**Resultado esperado**: Debería cambiar de `1024` a `200`

## 🔄 Si sigue en `1024`

### Opción 1: Desinstalar y reinstalar la app

```bash
# Desinstalar
adb uninstall com.getgoapp.pasajero

# Reinstalar la app (desde tu IDE o con adb install)
# Luego verificar de nuevo
adb shell pm get-app-links com.getgoapp.pasajero
```

### Opción 2: Reiniciar el dispositivo

A veces Android necesita un reinicio para aplicar los cambios:

```bash
adb reboot
# Esperar a que reinicie, luego verificar
adb shell pm get-app-links com.getgoapp.pasajero
```

### Opción 3: Verificar manualmente el archivo

Asegúrate de que Android pueda acceder al archivo:

```bash
# Desde el dispositivo Android (con navegador o adb)
adb shell "curl -s https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json"
```

Debería mostrar el JSON con el SHA256 correcto.

## ⚠️ Verificaciones Adicionales

### 1. Verificar AndroidManifest.xml

Asegúrate de que tu `AndroidManifest.xml` tenga:

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

**Importante**: 
- Debe tener `android:autoVerify="true"`
- El `host` debe ser exactamente `getgo-page-h84g.vercel.app`
- El `pathPrefix` debe ser `/refer` o `/refer*`

### 2. Verificar que la app esté firmada correctamente

El SHA256 que muestra `adb shell pm get-app-links` debe coincidir exactamente con el que está en `assetlinks.json`.

## 📝 Comandos Completos (Copia y Pega)

```bash
# 1. Limpiar cache
adb shell pm clear --cache-only com.getgoapp.pasajero

# 2. Forzar verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# 3. Esperar unos segundos (Android necesita procesar)
sleep 5

# 4. Verificar estado
adb shell pm get-app-links com.getgoapp.pasajero
```

Si después de estos pasos sigue mostrando `1024`, comparte el resultado completo de `adb shell pm get-app-links` y revisamos el `AndroidManifest.xml`.



