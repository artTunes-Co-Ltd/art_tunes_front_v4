import { NextResponse } from "next/server";

export async function GET() {
    const jsonResponse = [
        {
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "android_app",
                "package_name": "net.art_tunes.node.stg",
                "sha256_cert_fingerprints":
                ["10:3F:3C:65:9D:66:A0:43:30:6E:05:97:82:54:45:E2:BA:34:1B:A7:35:33:21:FC:B4:6E:C4:DD:9A:24:BA:68", "A1:59:A2:E3:36:00:67:3B:A7:93:65:12:67:04:C3:E2:9C:C3:FD:C3:28:3D:81:B9:08:3D:77:18:D8:06:FD:C2"]
            }
        },
        {
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "android_app",
                "package_name": "net.art_tunes.node",
                "sha256_cert_fingerprints":
                ["10:3F:3C:65:9D:66:A0:43:30:6E:05:97:82:54:45:E2:BA:34:1B:A7:35:33:21:FC:B4:6E:C4:DD:9A:24:BA:68","C3:E0:67:26:77:C4:44:3D:ED:48:9D:B2:5C:56:42:FF:89:17:16:B7:5D:EB:CE:25:1E:96:31:0E:8C:14:32:8A"]
            }
        }
    ];

    return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": "inline",
        },
    });
}