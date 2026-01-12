# 🎨 Configuración de Favicon

## ✅ Configuración Actual

He configurado el favicon para usar tu logo de GetGo. El archivo `layout.tsx` ahora incluye:

```typescript
icons: {
  icon: [
    { url: "/GetGo_Logo.png", type: "image/png" },
    { url: "/favicon.ico", type: "image/x-icon" },
  ],
  apple: [
    { url: "/GetGo_Logo.png", type: "image/png" },
  ],
}
```

## 📝 Opciones para Mejorar el Favicon

### Opción 1: Crear favicon.ico desde el logo (Recomendado)

1. **Usa una herramienta online:**
   - https://favicon.io/favicon-converter/
   - https://realfavicongenerator.net/
   - Sube tu `GetGo_Logo.png`
   - Genera el `favicon.ico`

2. **Reemplaza el archivo:**
   - Coloca el nuevo `favicon.ico` en `public/favicon.ico`
   - O en `src/app/favicon.ico` (Next.js lo detectará automáticamente)

### Opción 2: Usar el logo PNG directamente

Ya está configurado. El navegador usará `/GetGo_Logo.png` como favicon.

### Opción 3: Crear múltiples tamaños (Mejor práctica)

Para mejor compatibilidad, crea estos archivos:

```
public/
├── favicon.ico (16x16, 32x32, 48x48)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
└── android-chrome-192x192.png
└── android-chrome-512x512.png
```

Luego actualiza `layout.tsx`:

```typescript
icons: {
  icon: [
    { url: "/favicon.ico", sizes: "any" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  other: [
    {
      rel: "android-chrome",
      url: "/android-chrome-192x192.png",
    },
  ],
}
```

## 🚀 Herramientas Recomendadas

### 1. RealFaviconGenerator (Más completo)
https://realfavicongenerator.net/

- Sube tu logo
- Genera todos los tamaños necesarios
- Incluye instrucciones de instalación

### 2. Favicon.io (Más simple)
https://favicon.io/favicon-converter/

- Convierte PNG a ICO
- Genera múltiples formatos

## 📍 Ubicación de Archivos en Next.js

Next.js busca favicons en estos lugares (en orden de prioridad):

1. `src/app/favicon.ico` (más común)
2. `public/favicon.ico`
3. Configuración en `metadata.icons` (lo que acabamos de hacer)

## ✅ Verificación

Después de agregar el favicon:

1. **Limpia la caché del navegador:**
   - Chrome: Ctrl+Shift+Delete (o Cmd+Shift+Delete en Mac)
   - O abre en modo incógnito

2. **Verifica que se vea:**
   - Abre `https://getgoapp.cl`
   - Revisa la pestaña del navegador
   - Deberías ver el logo de GetGo

3. **Verifica en diferentes dispositivos:**
   - Desktop
   - Móvil
   - Tableta

## 🔧 Solución Rápida

Si quieres usar el logo actual mientras creas un favicon.ico:

1. El código ya está configurado para usar `/GetGo_Logo.png`
2. Solo necesitas redesplegar
3. El favicon debería aparecer automáticamente

## 📝 Nota

El favicon de Vercel aparece porque:
- Next.js usa un favicon por defecto si no encuentra uno
- O el navegador está usando una versión en caché

Después de actualizar y redesplegar, deberías ver tu logo.




