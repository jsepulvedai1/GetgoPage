# Flujo de Deeplink cuando la App NO está Instalada

## ✅ Respuesta Corta

**NO, el deeplink NO se pierde.** El código se guarda automáticamente antes de redirigir a la tienda.

## 🔄 Flujo Completo

### Escenario: Usuario hace clic en link sin tener la app instalada

1. **Usuario hace clic en:**
   ```
   https://getgo-page-h84g.vercel.app/refer?code=ABC123
   ```

2. **La página web se carga** y detecta el código `ABC123`

3. **INMEDIATAMENTE guarda el código** (antes de intentar abrir la app):
   - ✅ En `localStorage` (clave: `getgo_referral_code`)
   - ✅ En el backend (`https://prod.getgoapp.com/api/v1/save-referral-code/`)
   - ✅ Con timestamp para expiración (7 días)

4. **Intenta abrir la app** (espera 5-6 segundos)

5. **Si la app NO se abre** (porque no está instalada):
   - ⏱️ Después del timeout, redirige a la tienda
   - ✅ **El código YA está guardado** (no se pierde)

6. **Usuario instala la app desde la tienda**

7. **Al abrir la app por primera vez:**
   - La app puede recuperar el código desde:
     - `localStorage` (si abre en WebView)
     - Backend API (usando `device_id`)

## 📋 Código Relevante

### Guardado Inmediato (cuando detecta código en URL)

```typescript
// Líneas 135-141: Guarda INMEDIATAMENTE cuando detecta código
if (code !== "N/A") {
  localStorage.setItem("getgo_referral_code", code);
  localStorage.setItem("getgo_referral_timestamp", Date.now().toString());
  saveCodeToBackend(code); // También guarda en backend
}
```

### Guardado Preventivo (antes de redirigir a tienda)

```typescript
// Líneas 277-283: Guarda ANTES de redirigir
if (referralCode !== "N/A") {
  localStorage.setItem("getgo_referral_code", referralCode);
  localStorage.setItem("getgo_referral_timestamp", Date.now().toString());
  saveCodeToBackend(referralCode);
}
// Luego redirige a la tienda
redirectToStore();
```

## 🎯 Cómo la App Recupera el Código

### Opción 1: Desde localStorage (WebView)

Cuando la app se abre por primera vez, puede abrir un WebView a:
```
https://getgo-page-h84g.vercel.app/get-referral-code
```

Esta página lee `localStorage` y devuelve el código.

### Opción 2: Desde Backend API

La app puede hacer un GET request:
```
GET https://prod.getgoapp.com/api/v1/save-referral-code/?device_id=XXX
```

El backend devuelve el código guardado para ese `device_id`.

### Opción 3: Combinado (Recomendado)

1. Intentar desde `localStorage` (más rápido)
2. Si no está, intentar desde backend API
3. Si no está en ninguno, el usuario no tiene código de referido

## ⏰ Expiración

El código se guarda con un timestamp y expira después de **7 días**:

```typescript
const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días
if (age < maxAge) {
  // Código válido
} else {
  // Código expirado, limpiar
  localStorage.removeItem("getgo_referral_code");
}
```

## ✅ Ventajas de este Sistema

1. **No se pierde**: El código se guarda antes de redirigir
2. **Persistente**: Se guarda en backend (sobrevive limpieza de cache)
3. **Múltiples formas de recuperar**: localStorage y backend
4. **Expiración automática**: Se limpia después de 7 días

## 🔍 Verificación

Para verificar que funciona:

1. **Abre el link sin tener la app instalada:**
   ```
   https://getgo-page-h84g.vercel.app/refer?code=TEST123
   ```

2. **Abre la consola del navegador**, deberías ver:
   ```
   ✅ Código guardado en localStorage desde URL: TEST123
   ✅ Código guardado en backend exitosamente
   ```

3. **Verifica localStorage:**
   ```javascript
   localStorage.getItem("getgo_referral_code") // Debería ser "TEST123"
   ```

4. **Instala la app y verifica** que puede recuperar el código

## 📝 Notas Importantes

- El código se guarda **inmediatamente** cuando se detecta en la URL
- Se guarda **nuevamente** antes de redirigir a la tienda (por seguridad)
- Se guarda en **dos lugares**: localStorage (rápido) y backend (persistente)
- La app debe implementar la lógica para recuperar el código al abrir por primera vez



