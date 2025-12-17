# 🔧 Corrección Final: AndroidManifest.xml

## ⚠️ Problema Identificado

Tu `AndroidManifest.xml` tiene el `intent-filter` con `autoVerify` **ANTES** del `LAUNCHER`. Esto puede causar problemas.

**Orden actual (INCORRECTO):**
```xml
<intent-filter android:autoVerify="true">
    <!-- App Links -->
</intent-filter>

<intent-filter>
    <!-- LAUNCHER -->
</intent-filter>
```

## ✅ Solución: Orden Correcto

El `LAUNCHER` **DEBE ir PRIMERO**, luego los App Links.

**Orden correcto:**
```xml
<intent-filter>
    <!-- LAUNCHER (PRIMERO) -->
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

<intent-filter android:autoVerify="true">
    <!-- App Links (DESPUÉS) -->
</intent-filter>
```

## 📝 Cambios Necesarios

### 1. Mover el LAUNCHER al principio

**Busca esta sección:**
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

<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>
```

**Y cámbiala por esta:**
```xml
<!-- ✅ LAUNCHER PRIMERO -->
<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

<!-- ✅ APP LINKS DESPUÉS -->
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

### 2. (Opcional) Comentar otros intent-filters sin autoVerify

Los otros `intent-filter` sin `autoVerify` pueden interferir. Puedes comentarlos:

```xml
<!--
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="https"
        android:host="www.getgo.cl"
        android:pathPrefix="/refer" />
</intent-filter>
-->
```

## 🚀 Pasos Después de Corregir

### 1. Recompilar la App

```bash
./gradlew clean
./gradlew assembleRelease  # o assembleDebug
```

### 2. Desinstalar Versión Anterior

```bash
adb uninstall com.getgoapp.pasajero
```

### 3. Instalar Nueva Versión

```bash
adb install -r app/build/outputs/apk/release/app-release.apk
```

### 4. Forzar Verificación

```bash
# Limpiar estado anterior
adb shell pm set-app-links --package com.getgoapp.pasajero 0 all

# Forzar verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero

# Esperar 10-30 segundos

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

### 5. Probar Deeplink

```bash
adb shell am start -a android.intent.action.VIEW \
  -d "https://getgo-page-h84g.vercel.app/refer?code=TEST123" \
  com.getgoapp.pasajero
```

**Si funciona:**
- ✅ App se abre automáticamente
- ✅ NO muestra diálogo
- ✅ Recibe el código `TEST123`

## ⚠️ Notas Importantes

1. **El orden importa:** LAUNCHER debe ir primero
2. **Solo necesitas UN intent-filter con autoVerify** para el dominio principal
3. **Los otros intent-filter sin autoVerify** pueden quedarse comentados
4. **Android puede tardar hasta 20 horas** en verificar automáticamente
5. **Puedes forzar verificación** con `pm verify-app-links --re-verify`

## 📋 Checklist Final

- [ ] `LAUNCHER` está PRIMERO
- [ ] `intent-filter` con `autoVerify` está DESPUÉS del LAUNCHER
- [ ] `android:host` es `getgo-page-h84g.vercel.app`
- [ ] `android:pathPrefix` es `/refer`
- [ ] Otros intent-filter sin autoVerify comentados (opcional)
- [ ] App recompilada
- [ ] App reinstalada
- [ ] Verificación forzada
- [ ] `pm get-app-links` muestra `verified`
- [ ] Deeplink abre app automáticamente

## 🔗 Archivo de Referencia

He creado `ANDROID_MANIFEST_CORREGIDO.xml` con la versión completa corregida. Úsalo como referencia.

