# Método Simple para Device ID: UUID Persistente

## ✅ Solución Implementada

Se cambió de un método complejo de fingerprinting a un **UUID único persistente** que es:
- ✅ **Simple**: Genera un UUID una vez y lo reutiliza
- ✅ **Confiable**: No depende de propiedades del navegador/dispositivo
- ✅ **Consistente**: Mismo método en web y app móvil
- ✅ **Persistente**: Se guarda y se reutiliza siempre

## 📱 Implementación en la Página Web

La página web ahora usa:

```typescript
const getDeviceId = (): string => {
  const STORAGE_KEY = "getgo_device_id";
  
  // Intentar recuperar el ID existente
  const existingId = localStorage.getItem(STORAGE_KEY);
  if (existingId) {
    return existingId;
  }
  
  // Generar un nuevo UUID v4
  const newId = generateUUID();
  localStorage.setItem(STORAGE_KEY, newId);
  
  return newId;
};
```

**Características:**
- Genera un UUID v4 (formato: `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`)
- Lo guarda en `localStorage` con la clave `getgo_device_id`
- Reutiliza el mismo ID en todas las visitas

## 📲 Implementación en Flutter

### 1. Agregar dependencias

En `pubspec.yaml`:

```yaml
dependencies:
  uuid: ^4.0.0
  shared_preferences: ^2.2.0
```

### 2. Crear función para obtener Device ID

```dart
import 'package:uuid/uuid.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DeviceIdService {
  static const String _storageKey = 'getgo_device_id';
  
  static Future<String> getDeviceId() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      
      // Intentar recuperar el ID existente
      final existingId = prefs.getString(_storageKey);
      if (existingId != null && existingId.isNotEmpty) {
        return existingId;
      }
      
      // Generar un nuevo UUID v4
      const uuid = Uuid();
      final newId = uuid.v4();
      
      // Guardar en SharedPreferences
      await prefs.setString(_storageKey, newId);
      
      print('🆔 Nuevo device_id generado: $newId');
      
      return newId;
    } catch (e) {
      print('❌ Error obteniendo device_id: $e');
      // Fallback: generar un ID temporal
      return 'temp-${DateTime.now().millisecondsSinceEpoch}-${Random().nextInt(1000000)}';
    }
  }
}
```

### 3. Usar en el código

```dart
// Al guardar el código de referido
final deviceId = await DeviceIdService.getDeviceId();

// Enviar al backend
await http.post(
  Uri.parse('https://prod.getgoapp.com/api/v1/save-referral-code/'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'code': referralCode,
    'device_id': deviceId,
    'timestamp': DateTime.now().millisecondsSinceEpoch,
  }),
);
```

## 🔄 Flujo Completo

1. **Primera vez (Web o App):**
   - Genera un UUID único
   - Lo guarda en `localStorage` (web) o `SharedPreferences` (app)
   - Lo envía al backend

2. **Siguientes veces:**
   - Recupera el UUID guardado
   - Lo reutiliza para todas las operaciones
   - **Mismo ID siempre** = mismo dispositivo

## ✅ Ventajas de este Método

1. **Simplicidad**: No requiere cálculos complejos
2. **Confiabilidad**: No depende de propiedades que pueden cambiar
3. **Consistencia**: Mismo formato UUID en web y app
4. **Persistencia**: El ID se mantiene entre sesiones
5. **Único**: Cada dispositivo tiene su propio UUID

## ⚠️ Notas Importantes

- El UUID se genera **una vez por dispositivo/navegador**
- Si el usuario limpia `localStorage` (web) o `SharedPreferences` (app), se generará un nuevo UUID
- El UUID es **único** pero no es **permanente** (depende del almacenamiento local)
- Para hacerlo más permanente, podrías combinarlo con un identificador nativo del dispositivo (Android ID, iOS IDFV)

## 🔧 Opción Avanzada (Opcional)

Si quieres hacer el ID más permanente, puedes combinarlo con identificadores nativos:

```dart
// En Flutter
import 'package:device_info_plus/device_info_plus.dart';

Future<String> getDeviceId() async {
  final prefs = await SharedPreferences.getInstance();
  final existingId = prefs.getString('getgo_device_id');
  if (existingId != null) return existingId;
  
  // Obtener identificador nativo
  final deviceInfo = DeviceInfoPlugin();
  String? nativeId;
  
  if (Platform.isAndroid) {
    final androidInfo = await deviceInfo.androidInfo;
    nativeId = androidInfo.id; // Android ID
  } else if (Platform.isIOS) {
    final iosInfo = await deviceInfo.iosInfo;
    nativeId = iosInfo.identifierForVendor; // IDFV
  }
  
  // Combinar con UUID para mayor unicidad
  final uuid = Uuid().v4();
  final deviceId = nativeId != null ? '$nativeId-$uuid' : uuid;
  
  await prefs.setString('getgo_device_id', deviceId);
  return deviceId;
}
```

Pero para la mayoría de casos, el UUID simple es suficiente y más confiable.

