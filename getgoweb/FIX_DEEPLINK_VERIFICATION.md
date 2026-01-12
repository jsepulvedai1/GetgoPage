# Fix: Verificación de App Links

## ✅ Problema Identificado

El dominio `getgo-page-h84g.vercel.app` muestra código `1024` = **NO VERIFICADO**

**Causa**: El SHA256 en `assetlinks.json` no coincidía con el certificado de la app instalada.

## ✅ Solución Aplicada

He actualizado `assetlinks.json` con el SHA256 correcto:
- **SHA256 anterior**: `C8:7B:33:92:78:CF:B3:EA:...`
- **SHA256 correcto**: `71:E0:56:5B:E0:B4:83:05:7F:22:C0:70:78:AE:1A:9B:52:0D:F8:F1:AF:20:23:56:55:B4:F8:84:4D:0A:F0:D6`

## 📋 Pasos para Verificar

### 1. Desplegar el cambio

El archivo `assetlinks.json` ya está actualizado. Necesitas desplegar a Vercel:

```bash
git add public/.well-known/assetlinks.json
git commit -m "Fix: Actualizar SHA256 en assetlinks.json"
git push
```

### 2. Verificar que el archivo esté actualizado en producción

```bash
curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
```

Debería mostrar el nuevo SHA256: `71:E0:56:5B:E0:B4:83:05:...`

### 3. Forzar verificación en Android

```bash
# Forzar verificación inmediata
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Verificar el estado
adb shell pm get-app-links com.getgoapp.pasajero
```

**Resultado esperado**: Debería cambiar de `1024` (no verificado) a `200` (verificado)

### 4. Si no funciona inmediatamente

Android puede tardar hasta 20 horas en verificar automáticamente. Para forzar la verificación:

```bash
# Opción 1: Forzar verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Opción 2: Limpiar cache y forzar
adb shell pm clear --cache-only com.getgoapp.pasajero
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Opción 3: Desinstalar y reinstalar la app (último recurso)
adb uninstall com.getgoapp.pasajero
# Luego reinstalar la app
```

### 5. Verificar que funcione

Una vez verificado (código `200`), prueba el deeplink:

```
https://getgo-page-h84g.vercel.app/refer?code=TEST123
```

**Comportamiento esperado**:
- ✅ La app se abre automáticamente (sin diálogo)
- ✅ El código `TEST123` está disponible en la app

## ⚠️ Notas Importantes

1. **SHA256 debe coincidir**: El SHA256 en `assetlinks.json` debe ser exactamente el mismo que el certificado con el que está firmada la app instalada.

2. **Diferentes certificados**: 
   - Si usas un certificado diferente para debug vs release, necesitas ambos SHA256 en `assetlinks.json`
   - O usar solo el de producción si solo quieres que funcione en producción

3. **Tiempo de verificación**: 
   - Puede tardar hasta 20 horas en verificarse automáticamente
   - Con `--re-verify` debería funcionar inmediatamente

4. **Verificar en múltiples dispositivos**: 
   - Cada dispositivo verifica independientemente
   - Puede que funcione en uno pero no en otro si tienen diferentes versiones de Android

## 🔍 Troubleshooting

### Si sigue mostrando `1024`:

1. Verifica que el archivo esté desplegado correctamente:
   ```bash
   curl https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
   ```

2. Verifica que el formato JSON sea correcto (sin errores de sintaxis)

3. Verifica que el `package_name` sea exactamente `com.getgoapp.pasajero`

4. Verifica que el SHA256 tenga el formato correcto (con dos puntos `:`)

5. Intenta desinstalar y reinstalar la app

### Si muestra `200` pero no funciona:

1. Verifica que el `AndroidManifest.xml` tenga `android:autoVerify="true"`

2. Verifica que el dominio en `AndroidManifest.xml` sea exactamente `getgo-page-h84g.vercel.app`

3. Verifica que el `pathPrefix` sea `/refer` o `/refer*`

## 📝 Estado Actual

- ✅ `assetlinks.json` actualizado con SHA256 correcto
- ⏳ Esperando despliegue a Vercel
- ⏳ Esperando verificación en Android (usar `--re-verify` para forzar)



