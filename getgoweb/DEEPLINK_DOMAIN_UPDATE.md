# ✅ Actualización: Dominio de Deeplinks

## 🔄 Cambio Realizado

Se actualizó el código para usar **`getgo-page-h84g.vercel.app`** como dominio para los deeplinks en lugar de `getgoapp.cl`.

## 📝 Cambios en el Código

### Archivo Modificado: `src/app/refer/page.tsx`

**Antes:**
```typescript
if (currentHost === "getgoapp.cl" || currentHost.includes("getgoapp.cl")) {
  // ...
}
const deepLinkUrl = `https://getgoapp.cl/refer?code=${encodedCode}`;
```

**Después:**
```typescript
const deeplinkDomain = "getgo-page-h84g.vercel.app";
if (currentHost === deeplinkDomain || currentHost.includes(deeplinkDomain)) {
  // ...
}
const deepLinkUrl = `https://${deeplinkDomain}/refer?code=${encodedCode}`;
```

## ✅ Ventajas

1. **Los archivos `.well-known` ya funcionan** en Vercel:
   - ✅ `https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json` → 200 OK
   - ✅ `https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association` → 200 OK

2. **No necesitas configurar DNS** adicional
3. **No necesitas subir archivos a Apache**
4. **Los deeplinks funcionarán inmediatamente** después del despliegue

## 🔗 URLs de Deeplink

Ahora los deeplinks usarán:
```
https://getgo-page-h84g.vercel.app/refer?code=ABC123
```

## 📱 Configuración en las Apps

### Android (App Links)

Asegúrate de que en tu `AndroidManifest.xml` los `intent-filter` tengan:

```xml
<data android:scheme="https" 
      android:host="getgo-page-h84g.vercel.app" 
      android:pathPrefix="/refer" />
```

### iOS (Universal Links)

Asegúrate de que en Xcode, en **Associated Domains**, tengas:
```
applinks:getgo-page-h84g.vercel.app
```

## ✅ Verificación

Después de desplegar, verifica:

```bash
# Verificar que los archivos .well-known funcionen
curl -I https://getgo-page-h84g.vercel.app/.well-known/assetlinks.json
curl -I https://getgo-page-h84g.vercel.app/.well-known/apple-app-site-association

# Probar un deeplink
curl -I https://getgo-page-h84g.vercel.app/refer?code=TEST123
```

## 🚀 Próximos Pasos

1. ✅ Código actualizado
2. ✅ Build completado
3. ⏳ **Desplegar en Vercel** (si usas GitHub, se desplegará automáticamente)
4. ⏳ **Actualizar configuración en las apps móviles** (AndroidManifest.xml y Xcode)
5. ⏳ **Probar deeplinks** desde dispositivos reales

## 📝 Nota

Los archivos `.well-known` en `public/.well-known/` **NO necesitan cambios** porque no especifican el dominio - solo especifican los paths y la configuración de la app. Los deeplinks funcionarán con cualquier dominio siempre que los archivos `.well-known` estén accesibles en ese dominio.

