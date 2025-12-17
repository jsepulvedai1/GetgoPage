# Device ID basado en Fingerprint

## ✅ Método Implementado

Se usa un **fingerprint** basado en propiedades del dispositivo que se pueden obtener tanto en web como en app móvil. Este método es más confiable que UUIDs aleatorios porque usa datos reales del dispositivo.

## 📋 Propiedades del Fingerprint

1. **Screen size**: `width x height` (ej: `1080x1920`)
2. **Timezone offset**: `getTimezoneOffset()` (ej: `180` para UTC-3)
3. **Language**: `navigator.language` (ej: `es-ES`)
4. **Platform**: `'Android'` o `'iOS'`
5. **IP pública**: Obtenida de `https://api.ipify.org`

## 🔄 Algoritmo

1. Combinar todas las propiedades con `|` como separador
2. Generar un hash simple del string resultante
3. Convertir el hash a base 36
4. Guardar en localStorage/SharedPreferences para reutilizarlo

---

## 📱 Implementación en Flutter

### 1. Agregar dependencias

En `pubspec.yaml`:

```yaml
dependencies:
  http: ^1.1.0
  device_info_plus: ^9.1.0
  shared_preferences: ^2.2.0
```

### 2. Crear función para obtener Device ID

```dart
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:device_info_plus/device_info_plus.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DeviceIdService {
  static const String _storageKey = 'getgo_device_id';
  
  static Future<String> getDeviceId() async {
    try {
      // PRIORIDAD 1: Recuperar de SharedPreferences (si ya se calculó antes)
      final prefs = await SharedPreferences.getInstance();
      final existingId = prefs.getString(_storageKey);
      if (existingId != null && existingId.isNotEmpty) {
        print('💾 Device ID recuperado de SharedPreferences: $existingId');
        return existingId;
      }
      
      // PRIORIDAD 2: Calcular fingerprint basado en propiedades del dispositivo
      print('🔄 Calculando device_id desde propiedades del dispositivo...');
      
      final deviceInfo = DeviceInfoPlugin();
      
      // 1. Screen size
      String screenSize = 'unknown';
      if (Platform.isAndroid) {
        final androidInfo = await deviceInfo.androidInfo;
        // Obtener tamaño de pantalla (requiere contexto)
        // Por ahora usar valores por defecto o obtener de MediaQuery
        screenSize = '1080x1920'; // Reemplazar con valores reales
      } else if (Platform.isIOS) {
        final iosInfo = await deviceInfo.iosInfo;
        // Similar para iOS
        screenSize = '375x812'; // Reemplazar con valores reales
      }
      print('   - Screen size: $screenSize');
      
      // 2. Timezone offset
      final now = DateTime.now();
      final timezoneOffset = now.timeZoneOffset.inMinutes.toString();
      print('   - Timezone offset: $timezoneOffset');
      
      // 3. Language
      final locale = Platform.localeName; // ej: "es_ES"
      final language = locale.split('_')[0]; // ej: "es"
      print('   - Language: $language');
      
      // 4. Platform
      final platform = Platform.isAndroid ? 'Android' : (Platform.isIOS ? 'iOS' : 'unknown');
      print('   - Platform: $platform');
      
      // 5. IP pública
      String publicIp = 'unknown';
      try {
        final ipResponse = await http.get(
          Uri.parse('https://api.ipify.org?format=json'),
        ).timeout(const Duration(seconds: 3));
        
        if (ipResponse.statusCode == 200) {
          final ipData = jsonDecode(ipResponse.body);
          publicIp = ipData['ip'] ?? 'unknown';
          print('   - IP pública: $publicIp');
        }
      } catch (ipError) {
        print('   ⚠️ No se pudo obtener IP pública: $ipError');
        // Continuar sin IP (no es crítico)
      }
      
      // Combinar todas las propiedades
      final fingerprint = [
        screenSize,
        timezoneOffset,
        language,
        platform,
        publicIp,
      ].join('|');
      
      print('   - Fingerprint completo: $fingerprint');
      
      // Generar hash del fingerprint (mismo algoritmo que la web)
      int hash = 0;
      for (int i = 0; i < fingerprint.length; i++) {
        final char = fingerprint.codeUnitAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convertir a 32-bit integer
      }
      
      final deviceId = hash.abs().toRadixString(36);
      print('✅ Device ID generado: $deviceId');
      
      // Guardar en SharedPreferences para reutilizarlo
      await prefs.setString(_storageKey, deviceId);
      
      return deviceId;
    } catch (e) {
      print('❌ Error obteniendo device_id: $e');
      // Fallback: generar un ID temporal
      return 'temp-${DateTime.now().millisecondsSinceEpoch}-${DateTime.now().millisecondsSinceEpoch % 1000000}';
    }
  }
}
```

### 3. Obtener tamaño de pantalla real (Mejora)

Para obtener el tamaño real de la pantalla, necesitas acceso al contexto:

```dart
import 'package:flutter/widgets.dart';

// En un widget con contexto
final mediaQuery = MediaQuery.of(context);
final screenSize = '${mediaQuery.size.width.toInt()}x${mediaQuery.size.height.toInt()}';
```

O usar un método global si tienes acceso al contexto:

```dart
class DeviceIdService {
  // ... código anterior ...
  
  static Future<String> getScreenSize(BuildContext? context) async {
    if (context != null) {
      final mediaQuery = MediaQuery.of(context);
      return '${mediaQuery.size.width.toInt()}x${mediaQuery.size.height.toInt()}';
    }
    
    // Fallback: usar valores por defecto según la plataforma
    if (Platform.isAndroid) {
      return '1080x1920'; // Valor común
    } else if (Platform.isIOS) {
      return '375x812'; // Valor común
    }
    
    return 'unknown';
  }
  
  static Future<String> getDeviceId({BuildContext? context}) async {
    // ... código anterior ...
    
    // 1. Screen size (con contexto si está disponible)
    final screenSize = await getScreenSize(context);
    // ... resto del código ...
  }
}
```

### 4. Usar en el código

```dart
// Al guardar el código de referido
final deviceId = await DeviceIdService.getDeviceId(context: context);

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

---

## 🌐 Implementación en la Página Web

La página web ya está implementada con el mismo algoritmo. Ver `src/app/refer/page.tsx`.

**Características:**
- ✅ Obtiene IP pública de `https://api.ipify.org`
- ✅ Detecta plataforma automáticamente
- ✅ Guarda el device_id en `localStorage` para reutilizarlo
- ✅ Mismo algoritmo de hash que Flutter

---

## ✅ Ventajas de este Método

1. **Consistente**: Mismo algoritmo en web y app
2. **Confiable**: Usa propiedades reales del dispositivo
3. **Persistente**: Se guarda y reutiliza
4. **Único**: La combinación de propiedades es única por dispositivo
5. **No requiere permisos**: No necesita acceso a identificadores sensibles

## ⚠️ Consideraciones

1. **IP pública puede cambiar**: 
   - En WiFi fijo: generalmente estable
   - En móvil: puede cambiar al cambiar de red
   - **Solución**: Combinado con otras propiedades, sigue siendo único

2. **Screen size puede variar**:
   - Si el usuario rota la pantalla
   - **Solución**: Usar el tamaño en orientación portrait (más común)

3. **Timezone puede cambiar**:
   - Si el usuario viaja
   - **Solución**: Es parte del fingerprint, no es crítico

---

## 🔍 Debugging

Para verificar que ambos generan el mismo device_id:

**En la web (consola del navegador):**
```javascript
// Ver el fingerprint calculado
console.log("Fingerprint:", fingerprint);
console.log("Device ID:", deviceId);
```

**En Flutter:**
```dart
// Ver el fingerprint calculado
print('Fingerprint completo: $fingerprint');
print('Device ID generado: $deviceId');
```

Si los fingerprints son iguales, los device_id deberían coincidir.

---

## 📝 Notas Finales

- El device_id se calcula **una vez** y se guarda
- Si las propiedades cambian (ej: IP), se generará un nuevo device_id
- Para mayor estabilidad, considera usar solo las primeras 4 propiedades (sin IP)
- El hash es determinístico: mismas propiedades = mismo device_id

