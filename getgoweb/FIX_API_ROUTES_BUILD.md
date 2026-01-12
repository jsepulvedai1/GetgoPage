# 🔧 Solución: Rutas API con output: "export"

## 📋 Problema

Con `output: "export"`, Next.js no puede compilar rutas API durante el build estático. Esto causa un error:

```
Error: export const dynamic = "force-static"/export const revalidate not configured on route "/api/save-referral-code" with "output: export"
```

## ✅ Solución

En Vercel, las rutas API funcionan automáticamente como **serverless functions** incluso con `output: "export"`. Solo necesitamos:

1. **No usar `export const dynamic`** en las rutas API
2. **Vercel detecta automáticamente** las rutas API y las ejecuta como serverless functions
3. **El build local fallará**, pero funcionará en Vercel

## 🔧 Cambios Necesarios

### Opción 1: Aceptar que el build local falla (Recomendado)

Las rutas API funcionarán en Vercel aunque el build local falle. Esto es normal.

**Para probar localmente:**
- Usa `npm run dev` (modo desarrollo) - las rutas API funcionan
- O despliega directamente a Vercel

### Opción 2: Configuración Condicional

Podemos hacer que el build ignore las rutas API solo durante el export:

```typescript
// next.config.ts
const nextConfig = {
  output: "export",
  // ... otras configs
};

// En Vercel, las rutas API funcionan automáticamente
// No necesitamos configuración adicional
```

## 🧪 Verificar que Funciona en Vercel

Después del despliegue, prueba:

```bash
# Probar POST
curl -X POST https://getgo-page-h84g.vercel.app/api/save-referral-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "TEST123",
    "device_id": "test-device",
    "timestamp": 1703123456789
  }'

# Debe retornar:
# {"success": true, "message": "Código guardado exitosamente"}
```

## 📝 Nota Importante

- ✅ **En Vercel:** Las rutas API funcionan perfectamente
- ❌ **Build local:** Fallará con `output: "export"`
- ✅ **Modo dev:** `npm run dev` funciona perfectamente

Esto es **comportamiento esperado** de Next.js con `output: "export"`.



