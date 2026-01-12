# 🔧 Configurar DNS para Vercel - Solución para .well-known

## 📋 Situación Actual

- ✅ Vercel tiene los archivos `.well-known` funcionando: `getgo-page-h84g.vercel.app`
- ❌ Tu dominio `getgoapp.cl` apunta a Apache (donde no están los archivos)
- ❌ Los deeplinks usan `getgoapp.cl`, por lo que necesitan los archivos ahí

## ✅ Solución: Apuntar DNS a Vercel

### Paso 1: Configurar Dominio Personalizado en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto (`getgo-page-h84g` o similar)
3. Ve a **Settings** → **Domains**
4. Agrega tu dominio: `getgoapp.cl`
5. Vercel te mostrará las instrucciones de DNS

### Paso 2: Configurar DNS en tu Proveedor

Vercel te dará instrucciones específicas, pero generalmente necesitas:

**Opción A: CNAME (Recomendado para subdominios)**
```
Tipo: CNAME
Nombre: @ (o www)
Valor: cname.vercel-dns.com
```

**Opción B: A Record (Para dominio raíz)**
```
Tipo: A
Nombre: @
Valor: 76.76.21.21 (IP de Vercel - verifica en el dashboard)
```

**Opción C: ALIAS/ANAME (Si tu proveedor lo soporta)**
```
Tipo: ALIAS
Nombre: @
Valor: cname.vercel-dns.com
```

### Paso 3: Verificar en Vercel

Después de configurar el DNS:
1. Vercel verificará automáticamente el dominio
2. Puede tardar unos minutos hasta que el DNS se propague
3. Verifica el estado en el dashboard de Vercel

### Paso 4: Verificar que Funcione

Una vez que el DNS esté configurado y Vercel haya verificado el dominio:

```bash
# Debe retornar 200 OK desde Vercel
curl -I https://getgoapp.cl/.well-known/assetlinks.json
curl -I https://getgoapp.cl/.well-known/apple-app-site-association
```

**Debe mostrar:**
- `server: Vercel` (no Apache)
- `content-type: application/json`
- `HTTP/2 200`

## 🔄 Alternativa: Si No Puedes Cambiar el DNS

Si por alguna razón no puedes apuntar el DNS a Vercel, entonces:

### Opción 2: Subir Archivos a Apache

1. Sube los archivos de `out/.well-known/` a tu servidor Apache
2. Sube el archivo `out/.htaccess` a la raíz de Apache
3. Verifica permisos (ver `APACHE_DEPLOY.md`)

**Pero esto significa:**
- Tienes que mantener dos despliegues (Vercel + Apache)
- Los archivos `.well-known` deben estar en Apache
- El resto puede estar en Vercel (pero necesitarías configurar proxy/redirect)

## ⚠️ Importante

**Los deeplinks necesitan que los archivos `.well-known` estén accesibles en el dominio que usas en los deeplinks.**

Si tus deeplinks usan `getgoapp.cl`, entonces:
- Los archivos `.well-known` DEBEN estar accesibles en `https://getgoapp.cl/.well-known/`
- No importa si el resto del sitio está en Vercel o Apache
- Lo importante es que `getgoapp.cl` pueda servir esos archivos

## 🎯 Recomendación

**La mejor solución es apuntar todo el DNS a Vercel:**
- ✅ Vercel ya tiene los archivos funcionando
- ✅ No necesitas mantener dos servidores
- ✅ Vercel maneja automáticamente los headers correctos
- ✅ Más fácil de mantener

## 📝 Checklist

- [ ] Agregar `getgoapp.cl` como dominio personalizado en Vercel
- [ ] Configurar DNS según las instrucciones de Vercel
- [ ] Esperar verificación de Vercel (puede tardar minutos/horas)
- [ ] Verificar que `curl https://getgoapp.cl/.well-known/assetlinks.json` retorne 200
- [ ] Verificar que el servidor sea Vercel (no Apache)
- [ ] Probar deeplinks desde `getgoapp.cl`

## 🔗 Referencias

- [Vercel - Adding a Custom Domain](https://vercel.com/docs/concepts/projects/domains/add-a-domain)
- [Vercel - DNS Configuration](https://vercel.com/docs/concepts/projects/domains/dns-records)



