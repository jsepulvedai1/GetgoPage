# 🐛 Debug: POST No Se Envía al Backend

## 🔍 Cómo Verificar

### 1. Abre la Consola del Navegador

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Busca estos logs:

**Si funciona correctamente:**
```
✅ Código guardado en localStorage desde URL: TEST123
🔄 Intentando guardar código en backend: TEST123
📱 Device ID generado: a1b2c3d4
📤 Enviando POST a /api/save-referral-code con: {code: "TEST123", device_id: "a1b2c3d4", timestamp: 1234567890}
📥 Response status: 200 OK
✅ Código guardado en backend exitosamente: {success: true, message: "..."}
```

**Si hay error:**
```
❌ Error guardando en backend: [error details]
```

### 2. Verifica en la Pestaña Network

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Filtra por "save-referral-code"
4. Deberías ver una petición POST

**Si la petición aparece:**
- ✅ Click en ella para ver detalles
- Verifica:
  - **Status:** Debe ser `200` o `201`
  - **Request Payload:** Debe tener `code`, `device_id`, `timestamp`
  - **Response:** Debe tener `{"success": true}`

**Si la petición NO aparece:**
- ❌ La función `saveCodeToBackend` no se está llamando
- Verifica los logs en Console

### 3. Verifica que la Función Se Llame

En la consola, busca:
```
🔄 Intentando guardar código en backend: [código]
```

**Si NO aparece este log:**
- La función no se está llamando
- Verifica que el código no sea "N/A"
- Verifica que `saveCodeToBackend` esté en las dependencias del useEffect

## 🔧 Problemas Comunes

### Problema 1: La función no se llama

**Causa:** `saveCodeToBackend` no está en las dependencias del `useEffect`

**Solución:** Ya está corregido, pero verifica que el código tenga:
```typescript
}, [saveCodeToBackend]);
```

### Problema 2: Error de CORS

**Síntoma:** Error en consola sobre CORS

**Solución:** Ya está configurado en `vercel.json` con headers CORS

### Problema 3: Error 404

**Síntoma:** Response status: 404

**Causa:** La ruta API no existe o no está desplegada

**Solución:** 
- Verifica que el archivo existe: `src/app/api/save-referral-code/route.ts`
- Verifica que esté desplegado en Vercel
- Prueba manualmente: `curl -X POST https://getgo-page-h84g.vercel.app/api/save-referral-code ...`

### Problema 4: Error 500

**Síntoma:** Response status: 500

**Causa:** Error en el servidor (probablemente el Map en memoria)

**Solución:** Normal en desarrollo, en producción usar base de datos

## 🧪 Prueba Manual del Endpoint

```bash
# Probar POST
curl -X POST https://getgo-page-h84g.vercel.app/api/save-referral-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "TEST123",
    "device_id": "test-device-123",
    "timestamp": 1703123456789
  }'

# Debe retornar:
# {"success": true, "message": "Código guardado exitosamente"}
```

## 📊 Checklist de Verificación

- [ ] La consola muestra: `🔄 Intentando guardar código en backend`
- [ ] La consola muestra: `📱 Device ID generado`
- [ ] La consola muestra: `📤 Enviando POST a /api/save-referral-code`
- [ ] Network tab muestra la petición POST
- [ ] Response status es `200` o `201`
- [ ] Response body tiene `{"success": true}`
- [ ] No hay errores de CORS
- [ ] No hay errores de red

## 🔍 Logs Detallados Agregados

He agregado logs detallados en `saveCodeToBackend`:

1. **Antes de enviar:**
   - `🔄 Intentando guardar código en backend: [código]`
   - `📱 Device ID generado: [device_id]`
   - `📤 Enviando POST con: [payload]`

2. **Después de recibir respuesta:**
   - `📥 Response status: [status] [statusText]`
   - `✅ Código guardado exitosamente` o `⚠️ Error: [detalles]`

3. **Si hay error:**
   - `❌ Error guardando en backend: [error]`
   - `❌ Error details: [stack trace]`

Estos logs te ayudarán a identificar exactamente dónde está fallando.

