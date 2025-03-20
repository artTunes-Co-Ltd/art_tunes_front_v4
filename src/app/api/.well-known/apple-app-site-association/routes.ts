import { NextResponse } from "next/server";

export async function GET() {
    const jsonResponse = {
        "applinks": {
            "apps": [],
            "details": [
                {
                    "appID": "7QV8923GHH.net.art-tunes.node.stg",
                    "paths": [ "*" ]
                },
                {
                    "appID": "7QV8923GHH.net.art-tunes.node",
                    "paths": [ "*" ]
                }
            ]
        }
    };

    return new NextResponse(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Content-Disposition": "inline"
        }
    });
}