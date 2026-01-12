# Explicación: Device ID - ¿Mismo UUID o Diferente?

## 🤔 El Problema

Tienes dos opciones para el `device_id`:

### Opción 1: UUIDs Diferentes (Actual)
- **Web**: Genera un UUID y lo guarda en `localStorage`
- **App móvil**: Genera su propio UUID y lo guarda en `SharedPreferences`
- **Resultado**: Son UUIDs **diferentes** porque son almacenamientos separados

**Problema**: Si el usuario abre el link en la web y luego en la app, tendrán `device_id` diferentes.

### Opción 2: Mismo UUID (Recomendado)
- **Web**: Genera un UUID y lo guarda
- **App móvil**: Intenta obtener el UUID de la web, o genera uno y lo comparte
- **Resultado**: Ambos usan el **mismo UUID** para el mismo dispositivo

**Ventaja**: El backend puede asociar el código de referido correctamente.

---

## ✅ Solución Recomendada: Compartir el UUID

### Método 1: Pasar UUID en el Deeplink (Más Simple)

Cuando la app móvil abre la página web (vía deeplink o WebView), puede pasar su UUID:

```
https://getgo-page-h84g.vercel.app/refer?code=ABC123&device_id=550e8400-e29b-41d4-a716-446655440000
```

**En la página web:**
```typescript
const getDeviceId = (): string => {
  // 1. Intentar obtener desde la URL (si viene de la app)
  const urlParams = new URLSearchParams(window.location.search);
  const deviceIdFromUrl = urlParams.get("device_id");
  if (deviceIdFromUrl) {
    // Guardar en localStorage para futuras visitas
    localStorage.setItem("getgo_device_id", deviceIdFromUrl);
    return deviceIdFromUrl;
  }
  
  // 2. Intentar recuperar de localStorage
  const existingId = localStorage.getItem("getgo_device_id");
  if (existingId) {
    return existingId;
  }
  
  // 3. Generar nuevo UUID solo si no hay ninguno
  const newId = generateUUID();
  localStorage.setItem("getgo_device_id", newId);
  return newId;
};
```

**En Flutter (al abrir deeplink):**
```dart
// Cuando la app recibe un deeplink
final uri = Uri.parse(deepLinkUrl);
final referralCode = uri.queryParameters['code'];

// Obtener o generar device_id
final deviceId = await DeviceIdService.getDeviceId();

// Abrir la página web con el device_id
final webUrl = 'https://getgo-page-h84g.vercel.app/refer?code=$referralCode&device_id=$deviceId';
// Abrir en WebView o navegador
```

---

### Método 2: Usar Identificador Nativo del Dispositivo (Más Confiable)

En lugar de UUID aleatorio, usar identificadores nativos que ambos pueden obtener:

**Android**: `Settings.Secure.ANDROID_ID`
**iOS**: `identifierForVendor`

**En Flutter:**
```dart
import 'package:device_info_plus/device_info_plus.dart';

Future<String> getDeviceId() async {
  final deviceInfo = DeviceInfoPlugin();
  
  if (Platform.isAndroid) {
    final androidInfo = await deviceInfo.androidInfo;
    return androidInfo.id; // ANDROID_ID (único por dispositivo)
  } else if (Platform.isIOS) {
    final iosInfo = await deviceInfo.iosInfo;
    return iosInfo.identifierForVendor ?? 'unknown'; // IDFV
  }
  
  return 'unknown';
}
```

**En la página web:**
```typescript
// La web NO puede obtener Android ID directamente
// Pero puede recibirlo desde la app vía deeplink o WebView
const getDeviceId = (): string => {
  // Intentar obtener desde URL (si viene de la app)
  const urlParams = new URLSearchParams(window.location.search);
  const deviceIdFromUrl = urlParams.get("device_id");
  if (deviceIdFromUrl) {
    localStorage.setItem("getgo_device_id", deviceIdFromUrl);
    return deviceIdFromUrl;
  }
  
  // Si no viene de la app, generar UUID temporal
  // (pero idealmente siempre debería venir de la app)
  const existingId = localStorage.getItem("getgo_device_id");
  if (existingId) return existingId;
  
  const newId = generateUUID();
  localStorage.setItem("getgo_device_id", newId);
  return newId;
};
```

---

## 🎯 Recomendación Final

**Mejor opción**: Método 1 (UUID compartido vía deeplink)

1. **App móvil genera el UUID** (o usa Android ID/iOS IDFV)
2. **App pasa el UUID a la web** vía deeplink: `?code=ABC123&device_id=xxx`
3. **Web guarda el UUID** en localStorage
4. **Ambos usan el mismo UUID** para el mismo dispositivo

**Ventajas:**
- ✅ Simple de implementar
- ✅ Mismo UUID en web y app
- ✅ Funciona incluso si el usuario abre el link en navegador primero

---

## 📝 Implementación Paso a Paso

### 1. Modificar la página web para aceptar device_id en URL

```typescript
const getDeviceId = (): string => {
  const STORAGE_KEY = "getgo_device_id";
  
  // PRIORIDAD 1: Obtener desde URL (si viene de la app)
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const deviceIdFromUrl = urlParams.get("device_id");
    if (deviceIdFromUrl) {
      localStorage.setItem(STORAGE_KEY, deviceIdFromUrl);
      console.log("📱 Device ID recibido de la app:", deviceIdFromUrl);
      return deviceIdFromUrl;
    }
  }
  
  // PRIORIDAD 2: Recuperar de localStorage
  try {
    const existingId = localStorage.getItem(STORAGE_KEY);
    if (existingId) {
      return existingId;
    }
  } catch (error) {
    console.error("Error leyendo localStorage:", error);
  }
  
  // PRIORIDAD 3: Generar nuevo UUID (solo si no hay ninguno)
  const generateUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  
  const newId = generateUUID();
  localStorage.setItem(STORAGE_KEY, newId);
  console.log("🆔 Nuevo device_id generado:", newId);
  
  return newId;
};
```

### 2. En Flutter, pasar device_id en el deeplink

```dart
// Cuando la app detecta un deeplink
Future<void> handleDeepLink(String url) async {
  final uri = Uri.parse(url);
  final referralCode = uri.queryParameters['code'];
  
  // Obtener device_id (generar o recuperar)
  final deviceId = await DeviceIdService.getDeviceId();
  
  // Construir URL con device_id
  final webUrl = 'https://getgo-page-h84g.vercel.app/refer?code=$referralCode&device_id=$deviceId';
  
  // Abrir en WebView o navegador
  // ...
}
```

---

## ❓ Pregunta para Decidir

**¿Cómo quieres que funcione?**

1. **UUIDs diferentes** (más simple, pero no coinciden)
   - Web genera su UUID
   - App genera su UUID
   - No coinciden, pero cada uno es único

2. **Mismo UUID compartido** (recomendado)
   - App genera UUID y lo pasa a la web
   - Ambos usan el mismo UUID
   - Coinciden perfectamente

¿Cuál prefieres?



