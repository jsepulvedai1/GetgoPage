# 🔧 Instrucciones: Corregir AndroidManifest.xml

## 📋 Problema Identificado

Tu `AndroidManifest.xml` tiene:
- ❌ Intent-filters **SIN** `android:autoVerify="true"` (no verificados)
- ❌ El intent-filter **CON** `autoVerify` está **comentado**
- ❌ El dominio en el intent-filter comentado es `getgoapp.cl`, no `getgo-page-h84g.vercel.app`

## ✅ Solución

### Cambio Principal

**Reemplaza esta sección:**

```xml
<!-- Dominio Vercel -->
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="https"
        android:host="getgo-page-h84g.vercel.app"
        android:pathPrefix="/refer" />
</intent-filter>
```

**Por esta (con autoVerify):**

```xml
<!-- ✅ App Links con autoVerify para getgo-page-h84g.vercel.app -->
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

### Cambio Completo en la Activity

Reemplaza toda la sección de `<activity>` con esta:

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTop"
    android:theme="@style/LaunchTheme"
    android:configChanges="orientation|screenSize|smallestScreenSize|keyboard|keyboardHidden|locale|layoutDirection|fontScale|density|uiMode"
    android:windowSoftInputMode="adjustResize">

    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    
    <!-- ✅ APP LINKS CON autoVerify (PRODUCCIÓN) -->
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="https"
            android:host="getgo-page-h84g.vercel.app"
            android:pathPrefix="/refer" />
    </intent-filter>

    <!-- ⚠️ OPCIONAL: Comentar los otros intent-filter sin autoVerify -->
    <!-- (Puedes descomentarlos si necesitas soportar otros dominios sin verificación) -->
    
    <meta-data
        android:name="io.flutter.embedding.android.SplashScreenDrawable"
        android:resource="@drawable/launch_background" />
</activity>
```

## 📝 Pasos a Seguir

### 1. Editar AndroidManifest.xml

Abre tu `AndroidManifest.xml` y:
- Busca el intent-filter de `getgo-page-h84g.vercel.app`
- Agrega `android:autoVerify="true"` al intent-filter
- (Opcional) Comenta los otros intent-filter sin autoVerify

### 2. Recompilar la App

```bash
# Limpiar build anterior
./gradlew clean

# Recompilar
./gradlew assembleRelease  # o assembleDebug para desarrollo
```

### 3. Desinstalar Versión Anterior

```bash
adb uninstall com.getgoapp.pasajero
```

### 4. Instalar Nueva Versión

```bash
# Para Release
adb install -r app/build/outputs/apk/release/app-release.apk

# O para Debug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### 5. Forzar Verificación de App Links

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

### 6. Probar Deeplink

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

## ⚠️ Notas Importantes

1. **Solo necesitas UN intent-filter con autoVerify** para el dominio principal
2. **Los otros intent-filter sin autoVerify** pueden quedarse comentados o eliminarse
3. **Android puede tardar hasta 20 horas** en verificar automáticamente
4. **Puedes forzar verificación** con `pm verify-app-links --re-verify`
5. **La verificación se hace al instalar** la app si `autoVerify="true"` está presente

## 📋 Checklist

- [ ] `android:autoVerify="true"` agregado al intent-filter de `getgo-page-h84g.vercel.app`
- [ ] App recompilada
- [ ] App reinstalada
- [ ] Verificación forzada (`pm verify-app-links --re-verify`)
- [ ] `pm get-app-links` muestra `verified`
- [ ] Deeplink abre app automáticamente (sin diálogo)

## 🔗 Archivos de Referencia

He creado dos archivos de referencia:
- `ANDROID_MANIFEST_FIX.xml` - Solo la sección corregida
- `ANDROID_MANIFEST_COMPLETE.xml` - Versión completa corregida

Puedes usar estos como referencia para hacer los cambios.

