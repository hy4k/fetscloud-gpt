import { NextResponse } from "next/server";
import { extractQuestions } from "@/lib/extractor";
import { embedAndStore } from "@/lib/vector-updater";

export async function POST(req: Request) {
    const form = await req.formData();
    const file = form.get("file") as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = buffer.toString("utf-8");

    const extracted = await extractQuestions(text);

    await embedAndStore(extracted);

    return NextResponse.json({
        ok: true,
        message: `Processed ${extracted.length} questions successfully.`,
    });
}
