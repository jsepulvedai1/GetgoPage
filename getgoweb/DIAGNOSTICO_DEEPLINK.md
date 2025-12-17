# Diagnóstico de Deeplinks

## 🔍 Información Necesaria

Para diagnosticar el problema, necesito:

### 1. Archivos de la App Móvil
- `AndroidManifest.xml` (completo, especialmente la parte de intent-filters)
- Cómo estás manejando los deeplinks en Flutter (código relevante)

### 2. Información del Comportamiento Actual
- ¿Qué pasa cuando haces clic en el link?
  - [ ] Se abre el navegador pero no la app
  - [ ] Muestra un diálogo para elegir entre navegador/app
  - [ ] Redirige directamente a la tienda
  - [ ] La app se abre pero no recibe el código
  - [ ] Otro: _______________

### 3. Verificaciones

#### Verificar archivos .well-known
```bash
# Verificar assetlinks.json (Android)
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json

# Verificar apple-app-site-association (iOS)
curl -I https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association
```

#### Verificar App Links en Android (si tienes acceso a ADB)
```bash
# Ver estado de verificación
adb shell pm get-app-links com.getgoapp.pasajero

# Forzar verificación
adb shell pm verify-app-links --re-verify com.getgoapp.pasajero
```

---

## 📋 Checklist de Configuración

### Android App Links
- [ ] `assetlinks.json` está accesible en `https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json`
- [ ] `assetlinks.json` tiene el SHA256 correcto
- [ ] `assetlinks.json` tiene el `package_name` correcto: `com.getgoapp.pasajero`
- [ ] `AndroidManifest.xml` tiene `android:autoVerify="true"` en el intent-filter
- [ ] `AndroidManifest.xml` tiene el intent-filter con el dominio correcto: `getgo-page-h84g.vercel.app`
- [ ] La app está firmada con el certificado que corresponde al SHA256
- [ ] App Links están verificados (debería mostrar `200` en lugar de `1024`)

### iOS Universal Links
- [ ] `apple-app-site-association` está accesible en `https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association`
- [ ] `apple-app-site-association` tiene el `appID` correcto: `V944V9VPM9.com.getgoapp.pasajero`
- [ ] `apple-app-site-association` tiene los paths correctos: `/refer*`
- [ ] En Xcode, está configurado "Associated Domains" con: `applinks:getgo-page-h84g.vercel.app`
- [ ] La app está instalada y se ha abierto al menos una vez

---

## 🐛 Problemas Comunes

### 1. App Links no verificados (Android)
**Síntoma**: Muestra diálogo para elegir entre navegador/app
**Solución**: 
- Verificar que `assetlinks.json` esté accesible
- Verificar que el SHA256 sea correcto
- Forzar verificación: `adb shell pm verify-app-links --re-verify com.getgoapp.pasajero`
- Puede tardar hasta 20 horas en verificarse automáticamente

### 2. Universal Links no funcionan (iOS)
**Síntoma**: Se abre el navegador en lugar de la app
**Solución**:
- Verificar que `apple-app-site-association` esté accesible
- Verificar que el `appID` sea correcto
- Verificar "Associated Domains" en Xcode
- Borrar la app y reinstalarla

### 3. Redirige a la tienda inmediatamente
**Síntoma**: No intenta abrir la app, va directo a la tienda
**Causa**: El código está redirigiendo antes de que App Links/Universal Links funcionen
**Solución**: Aumentar el timeout o verificar la lógica de detección

### 4. La app se abre pero no recibe el código
**Síntoma**: La app se abre pero el código de referido no está disponible
**Solución**: Verificar cómo la app maneja los deeplinks y extrae el parámetro `code`

---

## 📝 Envíame esta información

1. **AndroidManifest.xml** (la parte de intent-filters)
2. **Código de Flutter** que maneja los deeplinks
3. **Resultado de los comandos curl** para verificar .well-known
4. **Descripción del comportamiento** cuando haces clic en el link
5. **Plataforma** (Android/iOS) donde estás probando

