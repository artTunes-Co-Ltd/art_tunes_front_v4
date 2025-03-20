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

    return new Response(JSON.stringify(jsonResponse), {
        status: 200,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Content-Disposition": "inline",
        },
    });
}