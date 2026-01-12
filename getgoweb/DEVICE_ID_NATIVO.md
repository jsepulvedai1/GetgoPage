# Device ID usando Identificadores Nativos

## ✅ Solución Final: Identificadores Nativos del Dispositivo

En lugar de usar fingerprinting complejo, usamos **identificadores nativos** que la app móvil puede obtener y pasar a la web vía deeplink.

### Ventajas:
- ✅ **Único por dispositivo**: Android ID e iOS IDFV son únicos
- ✅ **Estable**: No cambian (a menos que se haga factory reset)
- ✅ **Confiable**: Mismo ID siempre en el mismo dispositivo
- ✅ **Simple**: No requiere cálculos complejos

---

## 📱 Implementación en Flutter

### 1. Agregar dependencias

En `pubspec.yaml`:

```yaml
dependencies:
  device_info_plus: ^9.1.0
  shared_preferences: ^2.2.0
```

### 2. Crear servicio para obtener Device ID

```dart
import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DeviceIdService {
  static const String _storageKey = 'getgo_device_id';
  
  /// Obtiene el device_id nativo del dispositivo (Android ID o iOS IDFV)
  /// Lo guarda en SharedPreferences para reutilizarlo
  static Future<String> getDeviceId() async {
    try {
      // PRIORIDAD 1: Recuperar de SharedPreferences (si ya se obtuvo antes)
      final prefs = await SharedPreferences.getInstance();
      final existingId = prefs.getString(_storageKey);
      if (existingId != null && existingId.isNotEmpty && existingId != 'unknown') {
        print('💾 Device ID recuperado de SharedPreferences: $existingId');
        return existingId;
      }
      
      // PRIORIDAD 2: Obtener identificador nativo del dispositivo
      final deviceInfo = DeviceInfoPlugin();
      String? nativeId;
      
      if (Platform.isAndroid) {
        // Android: usar ANDROID_ID
        final androidInfo = await deviceInfo.androidInfo;
        nativeId = androidInfo.id; // ANDROID_ID (64-bit hex string)
        print('📱 Android ID obtenido: $nativeId');
      } else if (Platform.isIOS) {
        // iOS: usar identifierForVendor (IDFV)
        final iosInfo = await deviceInfo.iosInfo;
        nativeId = iosInfo.identifierForVendor; // IDFV (UUID)
        print('📱 iOS IDFV obtenido: $nativeId');
      }
      
      // Validar que se obtuvo un ID válido
      if (nativeId == null || nativeId.isEmpty || nativeId == 'unknown') {
        throw Exception('No se pudo obtener device_id nativo');
      }
      
      // Guardar en SharedPreferences para reutilizarlo
      await prefs.setString(_storageKey, nativeId);
      print('✅ Device ID guardado: $nativeId');
      
      return nativeId;
    } catch (e) {
      print('❌ Error obteniendo device_id: $e');
      // Fallback: generar UUID temporal
      final fallbackId = 'temp-${DateTime.now().millisecondsSinceEpoch}';
      return fallbackId;
    }
  }
}
```

### 3. Pasar device_id en el Deeplink

Cuando la app recibe o genera un deeplink, debe incluir el `device_id`:

```dart
import 'package:url_launcher/url_launcher.dart';

Future<void> openReferralPage(String referralCode) async {
  // 1. Obtener device_id
  final deviceId = await DeviceIdService.getDeviceId();
  
  // 2. Construir URL con code y device_id
  final webUrl = Uri.parse(
    'https://getgo-page-h84g.vercel.app/refer?code=$referralCode&device_id=$deviceId'
  );
  
  // 3. Abrir en WebView o navegador
  if (await canLaunchUrl(webUrl)) {
    await launchUrl(webUrl, mode: LaunchMode.externalApplication);
  }
}
```

### 4. Ejemplo completo: Manejar deeplink recibido

```dart
// Cuando la app recibe un deeplink
Future<void> handleDeepLink(String deepLinkUrl) async {
  try {
    final uri = Uri.parse(deepLinkUrl);
    final referralCode = uri.queryParameters['code'];
    
    if (referralCode == null || referralCode.isEmpty) {
      print('⚠️ No se encontró código de referido en el deeplink');
      return;
    }
    
    // Obtener device_id
    final deviceId = await DeviceIdService.getDeviceId();
    
    // Construir URL completa con device_id
    final webUrl = Uri.parse(
      'https://getgo-page-h84g.vercel.app/refer?code=$referralCode&device_id=$deviceId'
    );
    
    // Abrir en WebView o navegador
    // (depende de cómo estés manejando la navegación)
    await openWebView(webUrl.toString());
    
  } catch (e) {
    print('❌ Error manejando deeplink: $e');
  }
}
```

---

## 🌐 Implementación en la Página Web

La página web ya está configurada para:

1. **Priorizar** el `device_id` que viene en la URL (de la app)
2. **Guardar** el `device_id` en `localStorage` para futuras visitas
3. **Usar** el mismo `device_id` para todas las operaciones

**Código actual:**
```typescript
// PRIORIDAD 1: Obtener desde URL (si viene de la app móvil)
const urlParams = new URLSearchParams(window.location.search);
const deviceIdFromUrl = urlParams.get("device_id");
if (deviceIdFromUrl) {
  localStorage.setItem("getgo_device_id", deviceIdFromUrl);
  return deviceIdFromUrl;
}

// PRIORIDAD 2: Recuperar de localStorage
const existingId = localStorage.getItem("getgo_device_id");
if (existingId) {
  return existingId;
}
```

---

## 📋 Formato de los IDs

### Android ID
- **Formato**: String hexadecimal de 64 bits
- **Ejemplo**: `9774d56d682e549c`
- **Características**:
  - Único por dispositivo
  - No cambia (a menos que se haga factory reset)
  - Puede ser `9774d56d682e549c` (común en emuladores) o un valor único en dispositivos reales

### iOS IDFV (Identifier for Vendor)
- **Formato**: UUID (36 caracteres)
- **Ejemplo**: `550e8400-e29b-41d4-a716-446655440000`
- **Características**:
  - Único por vendor (todas las apps del mismo desarrollador tienen el mismo IDFV)
  - No cambia (a menos que se desinstalen todas las apps del vendor)
  - Puede ser `null` en algunos casos (iOS < 6.0)

---

## 🔄 Flujo Completo

1. **Usuario hace clic en link de referido**
   ```
   https://getgo-page-h84g.vercel.app/refer?code=ABC123
   ```

2. **App móvil intercepta el deeplink**
   - Obtiene el código: `ABC123`
   - Obtiene el device_id: `9774d56d682e549c` (Android) o `550e8400-...` (iOS)

3. **App abre la página web con device_id**
   ```
   https://getgo-page-h84g.vercel.app/refer?code=ABC123&device_id=9774d56d682e549c
   ```

4. **Página web**
   - Detecta `device_id` en la URL
   - Lo guarda en `localStorage`
   - Lo usa para enviar al backend

5. **Backend recibe**
   ```json
   {
     "code": "ABC123",
     "device_id": "9774d56d682e549c",
     "timestamp": 1234567890
   }
   ```

6. **Resultado**: Mismo `device_id` en web y app ✅

---

## ✅ Ventajas de este Método

1. **Confiable**: Usa identificadores nativos del sistema
2. **Estable**: No cambian (a menos que se haga factory reset)
3. **Simple**: No requiere cálculos complejos
4. **Único**: Cada dispositivo tiene su propio ID
5. **Consistente**: Mismo ID siempre en el mismo dispositivo

---

## ⚠️ Consideraciones

### Android ID
- Puede ser `9774d56d682e549c` en emuladores (todos los emuladores tienen el mismo)
- En dispositivos reales, cada uno tiene un ID único
- Cambia solo si se hace factory reset

### iOS IDFV
- Puede ser `null` en iOS < 6.0 (muy raro hoy en día)
- Es el mismo para todas las apps del mismo desarrollador
- Cambia si se desinstalan todas las apps del vendor

### Fallback
- Si no se puede obtener el ID nativo, se genera un UUID temporal
- El backend puede manejar estos IDs temporales de forma especial si es necesario

---

## 🧪 Testing

### Probar en Android
```dart
final deviceId = await DeviceIdService.getDeviceId();
print('Device ID: $deviceId');
// Debería mostrar algo como: 9774d56d682e549c (emulador) o un ID único (dispositivo real)
```

### Probar en iOS
```dart
final deviceId = await DeviceIdService.getDeviceId();
print('Device ID: $deviceId');
// Debería mostrar un UUID como: 550e8400-e29b-41d4-a716-446655440000
```

### Verificar en la web
1. Abre la consola del navegador
2. Busca el log: `📱 Device ID recibido de la app: ...`
3. Verifica que el ID coincida con el de la app

---

## 📝 Notas Finales

- **Siempre** pasa el `device_id` en el deeplink cuando la app abre la página web
- El `device_id` se guarda automáticamente en `localStorage` (web) y `SharedPreferences` (app)
- Ambos usarán el mismo ID para el mismo dispositivo
- Si el usuario abre el link directamente en el navegador (sin app), se generará un UUID temporal



