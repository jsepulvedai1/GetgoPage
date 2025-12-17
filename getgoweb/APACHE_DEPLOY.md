# 🚀 Guía de Despliegue en Apache - Archivos .well-known

## ⚠️ Problema Actual

Los archivos `.well-known/assetlinks.json` y `.well-known/apple-app-site-association` están retornando **404** en `https://getgoapp.cl`, lo que impide que los deeplinks funcionen correctamente.

## ✅ Solución

Se ha creado un archivo `.htaccess` que configura Apache para servir correctamente los archivos `.well-known` con el `Content-Type` correcto.

## 📦 Pasos para Desplegar

### 1. Verificar que el build esté completo

```bash
npm run build
```

Esto debería generar:
- `out/.well-known/assetlinks.json`
- `out/.well-known/apple-app-site-association`
- `out/.htaccess`

### 2. Subir archivos al servidor Apache

**Opción A: FTP/SFTP (cPanel, FileZilla, etc.)**

1. Conéctate a tu servidor
2. Navega a la carpeta raíz del dominio (generalmente `public_html/` o `www/`)
3. **Sube TODOS los archivos de la carpeta `out/`** incluyendo:
   - `index.html`
   - `refer.html`
   - `.well-known/` (directorio completo)
   - `.htaccess` (archivo en la raíz)

**Estructura esperada en el servidor:**
```
public_html/
├── index.html
├── refer.html
├── .htaccess          ← IMPORTANTE: Debe estar en la raíz
├── .well-known/
│   ├── assetlinks.json
│   └── apple-app-site-association
└── ... (otros archivos)
```

**Opción B: SSH/SCP**

```bash
# Desde tu máquina local
cd /Users/javiersepulveda/getgo/GetgoPage/getgoweb

# Subir todo el contenido de out/ al servidor
scp -r out/* usuario@servidor:/ruta/a/public_html/

# O usar rsync (mejor para actualizaciones)
rsync -avz --delete out/ usuario@servidor:/ruta/a/public_html/
```

### 3. Verificar permisos

Los archivos y directorios deben tener los permisos correctos:

```bash
# En el servidor (vía SSH)
chmod 644 public_html/.htaccess
chmod 644 public_html/.well-known/assetlinks.json
chmod 644 public_html/.well-known/apple-app-site-association
chmod 755 public_html/.well-known
```

### 4. Verificar que Apache tenga mod_rewrite y mod_headers habilitados

El archivo `.htaccess` requiere:
- `mod_rewrite`
- `mod_headers`

Si no están habilitados, contacta a tu proveedor de hosting o habilítalos en la configuración de Apache.

### 5. Verificar que funcione

Después de subir los archivos, verifica:

```bash
# Verificar assetlinks.json
curl -I https://getgoapp.cl/.well-known/assetlinks.json

# Debe retornar:
# HTTP/2 200
# content-type: application/json

# Verificar apple-app-site-association
curl -I https://getgoapp.cl/.well-known/apple-app-site-association

# Debe retornar:
# HTTP/2 200
# content-type: application/json
```

### 6. Verificar el contenido

```bash
# Ver contenido de assetlinks.json
curl https://getgoapp.cl/.well-known/assetlinks.json

# Ver contenido de apple-app-site-association
curl https://getgoapp.cl/.well-known/apple-app-site-association
```

## 🔧 Troubleshooting

### Si sigue dando 404

1. **Verifica que los archivos estén en el servidor:**
   ```bash
   # En el servidor
   ls -la public_html/.well-known/
   ls -la public_html/.htaccess
   ```

2. **Verifica que el `.htaccess` esté en la raíz:**
   - Debe estar en `public_html/.htaccess`, NO en `public_html/.well-known/.htaccess`

3. **Verifica permisos:**
   ```bash
   chmod 644 public_html/.htaccess
   chmod 755 public_html/.well-known
   chmod 644 public_html/.well-known/*
   ```

4. **Verifica que Apache permita `.htaccess`:**
   - En la configuración de Apache debe estar: `AllowOverride All`
   - Si no tienes acceso, contacta a tu proveedor de hosting

5. **Verifica que no haya otro `.htaccess` que esté interfiriendo:**
   - Busca otros archivos `.htaccess` en el servidor
   - Verifica que no haya reglas que bloqueen `.well-known`

### Si el Content-Type es incorrecto

Si los archivos se sirven pero con `Content-Type: text/html` en lugar de `application/json`:

1. Verifica que `mod_headers` esté habilitado
2. Verifica que el `.htaccess` tenga las reglas correctas
3. Prueba agregar esto al `.htaccess`:
   ```apache
   <FilesMatch "\.(json|well-known)">
     Header set Content-Type "application/json"
   </FilesMatch>
   ```

## 📝 Notas Importantes

- Los archivos `.well-known/` **deben estar en la raíz del dominio**
- El `.htaccess` **debe estar en la raíz** (mismo nivel que `index.html`)
- Los archivos deben ser accesibles **sin autenticación**
- Deben servirse con **Content-Type: application/json**
- **Requieren HTTPS** para funcionar (ya lo tienes ✅)

## ✅ Checklist de Verificación

- [ ] Build completado (`npm run build`)
- [ ] Archivos `.well-known/` en `out/.well-known/`
- [ ] Archivo `.htaccess` en `out/`
- [ ] Archivos subidos al servidor
- [ ] `.htaccess` en la raíz del servidor
- [ ] Permisos correctos (644 para archivos, 755 para directorios)
- [ ] `curl` retorna 200 OK
- [ ] `Content-Type: application/json` en las respuestas
- [ ] Contenido JSON es válido

## 🎯 Resultado Esperado

Después de seguir estos pasos:

```bash
$ curl -I https://getgoapp.cl/.well-known/assetlinks.json
HTTP/2 200
content-type: application/json
...

$ curl https://getgoapp.cl/.well-known/assetlinks.json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.getgoapp.pasajero",
      "sha256_cert_fingerprints": [
        "C8:7B:33:92:78:CF:B3:EA:ED:88:92:B2:C5:00:F8:EA:D0:37:26:28:90:30:CA:1A:43:04:FF:56:DD:12:87:57"
      ]
    }
  }
]
```

¡Con esto, tus deeplinks deberían funcionar correctamente! 🎉

