# 💾 Persistencia del Código de Referido

## 📋 Problema

Cuando un usuario hace clic en un link de referido y la app **NO está instalada**:
1. La página web intenta abrir la app (falla porque no está instalada)
2. Después de 2 segundos, redirige a la tienda (Play Store / App Store)
3. El usuario instala la app desde la tienda
4. **El código de referido se pierde** porque el deeplink original ya no está disponible

## ✅ Solución Implementada

Se implementó un sistema de persistencia usando **localStorage** del navegador:

### 1. Guardar Código en localStorage

Cuando la página detecta un código de referido:
- ✅ Lo guarda en `localStorage` con la clave `getgo_referral_code`
- ✅ Guarda un timestamp para expiración (`getgo_referral_timestamp`)
- ✅ Esto sucede **ANTES** de redirigir a la tienda

### 2. Recuperar Código desde localStorage

Cuando el usuario vuelve a la página (después de instalar la app):
- ✅ La página intenta leer el código desde `localStorage`
- ✅ Solo usa el código si tiene menos de **7 días** de antigüedad
- ✅ Si está expirado, lo limpia automáticamente

## 🔧 Cómo Funciona en el Código

### Guardado Automático

```typescript
// Cuando hay código en la URL
localStorage.setItem("getgo_referral_code", code);
localStorage.setItem("getgo_referral_timestamp", Date.now().toString());

// ANTES de redirigir a la tienda
localStorage.setItem("getgo_referral_code", referralCode);
```

### Recuperación Automática

```typescript
// Si no hay código en la URL, intentar recuperarlo
const storedCode = localStorage.getItem("getgo_referral_code");
const storedTimestamp = localStorage.getItem("getgo_referral_timestamp");

// Validar que no esté expirado (7 días)
if (storedCode && storedTimestamp) {
  const age = Date.now() - parseInt(storedTimestamp, 10);
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 días
  
  if (age < maxAge) {
    code = storedCode; // Usar el código guardado
  }
}
```

## 📱 Cómo la App Puede Leer el Código

### Opción 1: WebView (Recomendado)

Si tu app tiene un WebView, puede ejecutar JavaScript para leer el código:

**Android (Kotlin/Java):**
```kotlin
webView.evaluateJavascript("localStorage.getItem('getgo_referral_code')") { result ->
    val code = result.replace("\"", "")
    // Usar el código
}
```

**iOS (Swift):**
```swift
webView.evaluateJavaScript("localStorage.getItem('getgo_referral_code')") { result, error in
    if let code = result as? String {
        // Usar el código
    }
}
```

### Opción 2: API Endpoint

Crear un endpoint en tu backend que lea el código desde una cookie o sesión:

1. La página web guarda el código en el servidor (cookie/sesión)
2. La app hace una petición al servidor para obtener el código
3. El servidor retorna el código guardado

### Opción 3: URL de Retorno

Cuando el usuario instala la app desde la tienda:
1. La app se abre automáticamente
2. La app abre un WebView a: `https://getgo-page-h84g.vercel.app/refer?code=RECUPERAR`
3. El WebView ejecuta JavaScript para leer `localStorage.getItem('getgo_referral_code')`
4. La app recibe el código y lo procesa

## 🧪 Pruebas

### Prueba 1: Guardado y Recuperación

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123`
2. Abre la consola del navegador (F12)
3. Debes ver: `Código guardado en localStorage desde URL: TEST123`
4. Verifica en localStorage:
   ```javascript
   localStorage.getItem('getgo_referral_code') // Debe retornar "TEST123"
   ```

### Prueba 2: Persistencia después de Redirección

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123` (sin app instalada)
2. Espera a que redirija a la tienda
3. Antes de que redirija, verifica localStorage:
   ```javascript
   localStorage.getItem('getgo_referral_code') // Debe tener "TEST123"
   ```

### Prueba 3: Recuperación después de Instalación

1. Abre: `https://getgo-page-h84g.vercel.app/refer?code=TEST123` (sin app)
2. Instala la app desde la tienda
3. Abre la app
4. La app debe abrir un WebView a la misma URL
5. El código debe recuperarse desde localStorage

### Prueba 4: Expiración

1. Simula un código expirado:
   ```javascript
   localStorage.setItem('getgo_referral_code', 'TEST123');
   localStorage.setItem('getgo_referral_timestamp', (Date.now() - 8 * 24 * 60 * 60 * 1000).toString());
   ```
2. Abre: `https://getgo-page-h84g.vercel.app/refer`
3. El código debe limpiarse automáticamente

## ⚠️ Limitaciones Importantes

### 1. localStorage es del Navegador

- ✅ Funciona si la app usa un **WebView** del mismo dominio
- ❌ La app nativa **NO puede acceder directamente** al localStorage del navegador
- ✅ Necesitas un WebView o un servicio intermedio

### 2. Dominios Diferentes

- ✅ localStorage funciona en el mismo dominio
- ❌ Si la app abre un WebView a otro dominio, no tendrá acceso
- ✅ Usa el mismo dominio: `getgo-page-h84g.vercel.app`

### 3. Privacidad del Navegador

- ✅ localStorage persiste entre sesiones
- ⚠️ Se limpia si el usuario borra datos del navegador
- ⚠️ No funciona en modo incógnito en algunos navegadores

## 🎯 Flujo Completo Recomendado

### Escenario: Usuario sin App Instalada

1. **Usuario hace clic en link:** `https://getgo-page-h84g.vercel.app/refer?code=ABC123`
2. **Página web:**
   - Guarda código en localStorage: `ABC123`
   - Intenta abrir app (falla)
   - Redirige a tienda después de 2s
3. **Usuario instala app desde tienda**
4. **App se abre:**
   - Abre WebView a: `https://getgo-page-h84g.vercel.app/refer?code=RECUPERAR`
   - WebView ejecuta: `localStorage.getItem('getgo_referral_code')`
   - Recibe: `ABC123`
   - Procesa el código de referido
5. **App limpia localStorage** (opcional, después de usar)

## 📝 Checklist de Implementación en la App

- [ ] Configurar WebView en la app (Android/iOS)
- [ ] WebView debe apuntar a: `https://getgo-page-h84g.vercel.app/refer?code=RECUPERAR`
- [ ] Implementar JavaScript injection para leer localStorage
- [ ] Procesar el código recibido
- [ ] Limpiar localStorage después de usar (opcional)
- [ ] Manejar casos de error (código no encontrado, expirado, etc.)

## 🔗 Referencias

- [Android WebView - JavaScript Interface](https://developer.android.com/develop/ui/views/layout/webview)
- [iOS WKWebView - JavaScript Evaluation](https://developer.apple.com/documentation/webkit/wkwebview)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)



