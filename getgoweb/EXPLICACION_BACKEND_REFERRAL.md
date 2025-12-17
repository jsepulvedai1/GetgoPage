# 📚 Explicación: saveCodeToBackend y API save-referral-code

## 🔍 Resumen General

El sistema guarda el código de referido en **dos lugares**:
1. **localStorage** (navegador) - Fallback rápido
2. **Backend API** (servidor) - Persistencia más robusta

Esto asegura que el código no se pierda incluso si:
- El usuario borra el cache del navegador
- Cambia de dispositivo
- El localStorage falla

---

## 📱 Función: `saveCodeToBackend`

### Ubicación
`src/app/refer/page.tsx`

### ¿Qué hace?

Esta función guarda el código de referido en el backend usando el fingerprint del dispositivo.

### Código Completo

```typescript
const saveCodeToBackend = useCallback(async (code: string): Promise<void> => {
  try {
    // 1. Obtener el fingerprint único del dispositivo
    const deviceId = getDeviceFingerprint();
    
    // 2. Enviar el código al backend
    const response = await fetch("https://getgo-page-h84g.vercel.app/api/save-referral-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,                    // Código de referido (ej: "ABC123")
        device_id: deviceId,     // Fingerprint único del dispositivo
        timestamp: Date.now(),   // Fecha/hora actual
      }),
    });

    if (response.ok) {
      console.log("✅ Código guardado en backend");
    } else {
      console.warn("⚠️ Error guardando en backend:", response.status);
    }
  } catch (error) {
    console.error("❌ Error guardando en backend:", error);
    // No lanzar error, solo loguear (localStorage es el fallback)
  }
}, [getDeviceFingerprint]);
```

### Paso a Paso

1. **Obtiene el fingerprint del dispositivo:**
   ```typescript
   const deviceId = getDeviceFingerprint();
   ```
   - Genera un ID único basado en características del dispositivo
   - Mismo dispositivo = mismo fingerprint

2. **Hace una petición POST al backend:**
   ```typescript
   fetch("https://getgo-page-h84g.vercel.app/api/save-referral-code", {
     method: "POST",
     body: JSON.stringify({ code, device_id, timestamp })
   })
   ```

3. **Maneja la respuesta:**
   - Si es exitosa: log de éxito
   - Si falla: log de error (pero no rompe el flujo)

### ¿Cuándo se llama?

Se llama en **3 momentos**:

1. **Cuando hay código en la URL:**
   ```typescript
   if (code !== "N/A") {
     saveCodeToBackend(code);
   }
   ```

2. **Antes de esperar que la app se abra:**
   ```typescript
   // Guardar preventivamente
   saveCodeToBackend(referralCode);
   ```

3. **Antes de redirigir a la tienda:**
   ```typescript
   // Guardar antes de redirigir
   saveCodeToBackend(referralCode);
   ```

---

## 🖥️ API Endpoint: `/api/save-referral-code`

### Ubicación
`src/app/api/save-referral-code/route.ts`

### ¿Qué hace?

Este endpoint recibe y almacena códigos de referido asociados a un dispositivo.

### Configuración

```typescript
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
```

**¿Por qué?**
- `output: "export"` genera archivos estáticos
- Pero en Vercel, las rutas API funcionan como serverless functions
- `force-dynamic` le dice a Next.js que esta ruta es dinámica

### Almacenamiento Actual

```typescript
const referralCodes: Map<string, { code: string; timestamp: number }> = new Map();
```

**⚠️ Importante:** Esto es en memoria, se pierde al reiniciar el servidor.

**En producción deberías usar:**
- Base de datos (PostgreSQL, MongoDB, etc.)
- Redis (cache rápido)
- Firebase Firestore
- Vercel KV (Key-Value store)

---

## 📥 Método POST: Guardar Código

### Request

```json
POST /api/save-referral-code
Content-Type: application/json

{
  "code": "ABC123",
  "device_id": "a1b2c3d4",
  "timestamp": 1703123456789
}
```

### Proceso

1. **Valida los datos:**
   ```typescript
   if (!code || !device_id || !timestamp) {
     return error 400
   }
   ```

2. **Guarda el código:**
   ```typescript
   const key = `${device_id}_${code}`;
   referralCodes.set(key, { code, timestamp });
   ```

3. **Limpia códigos antiguos:**
   ```typescript
   // Elimina códigos de más de 7 días
   const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
   ```

4. **Retorna éxito:**
   ```json
   {
     "success": true,
     "message": "Código guardado exitosamente"
   }
   ```

### Response

**Éxito (200):**
```json
{
  "success": true,
  "message": "Código guardado exitosamente"
}
```

**Error (400):**
```json
{
  "error": "Missing required fields"
}
```

**Error (500):**
```json
{
  "error": "Error al guardar el código"
}
```

---

## 📤 Método GET: Obtener Código

### Request

```
GET /api/save-referral-code?device_id=a1b2c3d4
```

### Proceso

1. **Obtiene el device_id de los parámetros:**
   ```typescript
   const deviceId = searchParams.get("device_id");
   ```

2. **Busca el código más reciente para ese dispositivo:**
   ```typescript
   // Busca en el Map todos los códigos que empiezan con device_id_
   for (const [key, value] of referralCodes.entries()) {
     if (key.startsWith(deviceId + "_")) {
       // Encuentra el más reciente
     }
   }
   ```

3. **Verifica que no esté expirado:**
   ```typescript
   // Solo retorna si tiene menos de 7 días
   if (latestCode.timestamp < sevenDaysAgo) {
     return { code: null };
   }
   ```

4. **Retorna el código:**
   ```json
   {
     "code": "ABC123"
   }
   ```

### Response

**Código encontrado (200):**
```json
{
  "code": "ABC123"
}
```

**No encontrado o expirado (200):**
```json
{
  "code": null
}
```

---

## 🔐 Función: `getDeviceFingerprint`

### ¿Qué hace?

Genera un ID único para cada dispositivo basado en sus características.

### Código

```typescript
const getDeviceFingerprint = (): string => {
  // 1. Crea un canvas y dibuja texto
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Device fingerprint", 2, 2);

  // 2. Combina características del dispositivo
  const fingerprint = [
    navigator.userAgent,           // Navegador y OS
    navigator.language,            // Idioma
    screen.width + "x" + screen.height,  // Resolución
    new Date().getTimezoneOffset().toString(),  // Zona horaria
    canvas.toDataURL(),            // Renderizado del canvas (único por GPU/driver)
    navigator.hardwareConcurrency?.toString() || "",  // CPUs
  ].join("|");

  // 3. Genera un hash del fingerprint
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  // 4. Retorna el hash en base 36 (más corto)
  return Math.abs(hash).toString(36);
};
```

### Características que usa

1. **User Agent:** Navegador, OS, versión
2. **Idioma:** Configuración de idioma
3. **Resolución:** Ancho x Alto de la pantalla
4. **Zona horaria:** Offset de UTC
5. **Canvas fingerprint:** Renderizado único (GPU, drivers)
6. **Hardware:** Número de CPUs

### Ejemplo de Output

```
Input: "Mozilla/5.0...|es-ES|1920x1080|-180|data:image...|8"
Output: "a1b2c3d4e5f6"
```

**Mismo dispositivo = mismo fingerprint** (mientras no cambien las características)

---

## 🔄 Flujo Completo

### Escenario 1: Usuario hace clic en link

```
1. Usuario hace clic: https://getgo-page-h84g.vercel.app/refer?code=ABC123
2. Página carga
3. Código detectado: "ABC123"
4. Se guarda en localStorage: ✅
5. Se guarda en backend: ✅ (saveCodeToBackend)
6. Backend almacena: { device_id: "a1b2c3", code: "ABC123", timestamp: 1234567890 }
```

### Escenario 2: Usuario instala app y la abre

```
1. App se abre por primera vez
2. App genera fingerprint del dispositivo: "a1b2c3"
3. App consulta backend: GET /api/save-referral-code?device_id=a1b2c3
4. Backend retorna: { code: "ABC123" }
5. App procesa el código de referido
```

### Escenario 3: Usuario vuelve después de 7 días

```
1. App consulta backend
2. Backend verifica timestamp
3. Código expirado (> 7 días)
4. Backend retorna: { code: null }
5. App no procesa código
```

---

## ⚠️ Limitaciones Actuales

### 1. Almacenamiento en Memoria

```typescript
const referralCodes: Map<string, { code: string; timestamp: number }> = new Map();
```

**Problema:**
- Se pierde al reiniciar el servidor
- No persiste entre deployments
- No funciona con múltiples instancias del servidor

**Solución en Producción:**
- Usar base de datos (PostgreSQL, MongoDB)
- Usar Redis para cache rápido
- Usar Vercel KV

### 2. Fingerprint Puede Cambiar

**Si el usuario:**
- Cambia de navegador
- Cambia resolución de pantalla
- Actualiza el OS
- El fingerprint puede cambiar

**Solución:**
- Combinar con otros métodos (cookies, localStorage)
- Usar múltiples fuentes de identificación

---

## 🚀 Mejoras Recomendadas para Producción

### 1. Usar Base de Datos

```typescript
// Ejemplo con PostgreSQL
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  const { code, device_id, timestamp } = await request.json();
  
  await pool.query(
    'INSERT INTO referral_codes (code, device_id, timestamp) VALUES ($1, $2, $3)',
    [code, device_id, timestamp]
  );
}
```

### 2. Agregar Validación

```typescript
// Validar formato del código
if (!/^[A-Z0-9]{6}$/.test(code)) {
  return NextResponse.json({ error: "Invalid code format" }, { status: 400 });
}
```

### 3. Agregar Rate Limiting

```typescript
// Prevenir spam
const rateLimit = new Map();
const maxRequests = 10;
const windowMs = 60000; // 1 minuto
```

### 4. Agregar Logging

```typescript
// Log para analytics
console.log(`Referral code saved: ${code} for device: ${device_id} at ${new Date(timestamp)}`);
```

---

## 📊 Comparación: localStorage vs Backend

| Característica | localStorage | Backend API |
|----------------|--------------|-------------|
| **Persistencia** | Solo en ese navegador | En el servidor |
| **Acceso desde app** | Requiere WebView | Directo vía API |
| **Funciona si cambia navegador** | ❌ No | ✅ Sí |
| **Funciona si cambia dispositivo** | ❌ No | ✅ Sí (mismo fingerprint) |
| **Velocidad** | ⚡ Instantáneo | 🐢 Requiere red |
| **Confiabilidad** | ⚠️ Puede borrarse | ✅ Más confiable |

---

## 🧪 Cómo Probar

### Test 1: Guardar Código

```bash
curl -X POST https://getgo-page-h84g.vercel.app/api/save-referral-code \
  -H "Content-Type: application/json" \
  -d '{
    "code": "TEST123",
    "device_id": "test-device-123",
    "timestamp": 1703123456789
  }'
```

**Response esperado:**
```json
{
  "success": true,
  "message": "Código guardado exitosamente"
}
```

### Test 2: Obtener Código

```bash
curl "https://getgo-page-h84g.vercel.app/api/save-referral-code?device_id=test-device-123"
```

**Response esperado:**
```json
{
  "code": "TEST123"
}
```

### Test 3: Desde la Página Web

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
2. Abre la consola (F12)
3. Debes ver: `✅ Código guardado en backend`
4. Verifica en Network tab que la petición POST se hizo correctamente

---

## 📝 Resumen

- **`saveCodeToBackend`**: Función que envía el código al servidor
- **`getDeviceFingerprint`**: Genera un ID único del dispositivo
- **`/api/save-referral-code`**: Endpoint que guarda y recupera códigos
- **POST**: Guarda un código asociado a un dispositivo
- **GET**: Recupera el código más reciente de un dispositivo

**Ventaja principal:** El código persiste incluso si el usuario cambia de navegador o borra el cache, siempre que el fingerprint del dispositivo sea el mismo.

