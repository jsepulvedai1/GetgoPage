import { NextResponse } from "next/server";

// Configuración para que funcione en Vercel con output: "export"
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// En producción, esto debería conectarse a una base de datos
// Por ahora, solo retornamos éxito (puedes agregar lógica de almacenamiento después)
const referralCodes: Map<string, { code: string; timestamp: number }> = new Map();

export async function POST(request: Request) {
  try {
    const { code, device_id, timestamp } = await request.json();

    // Validar datos
    if (!code || !device_id || !timestamp) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Guardar en memoria (en producción, usar base de datos)
    const key = `${device_id}_${code}`;
    referralCodes.set(key, {
      code,
      timestamp,
    });

    // Limpiar códigos antiguos (más de 7 días)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    for (const [k, v] of referralCodes.entries()) {
      if (v.timestamp < sevenDaysAgo) {
        referralCodes.delete(k);
      }
    }

    console.log(`✅ Código guardado: ${code} para dispositivo ${device_id}`);

    return NextResponse.json({
      success: true,
      message: "Código guardado exitosamente",
    });
  } catch (error) {
    console.error("Error guardando código:", error);
    return NextResponse.json(
      { error: "Error al guardar el código" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deviceId = searchParams.get("device_id");

    if (!deviceId) {
      return NextResponse.json(
        { error: "Missing device_id parameter" },
        { status: 400 }
      );
    }

    // Buscar código más reciente para este dispositivo
    let latestCode: { code: string; timestamp: number } | null = null;
    for (const [key, value] of referralCodes.entries()) {
      if (key.startsWith(deviceId + "_")) {
        if (!latestCode || value.timestamp > latestCode.timestamp) {
          latestCode = value;
        }
      }
    }

    if (!latestCode) {
      return NextResponse.json({ code: null });
    }

    // Verificar que no esté expirado (7 días)
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (latestCode.timestamp < sevenDaysAgo) {
      return NextResponse.json({ code: null });
    }

    return NextResponse.json({ code: latestCode.code });
  } catch (error) {
    console.error("Error obteniendo código:", error);
    return NextResponse.json(
      { error: "Error al obtener el código" },
      { status: 500 }
    );
  }
}

