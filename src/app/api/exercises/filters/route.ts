import { NextResponse } from "next/server";
import {
  getBodyPartList,
  getTargetList,
  getEquipmentList,
} from "@/lib/exercisedb/client";

export async function GET() {
  const [bodyParts, targets, equipment] = await Promise.all([
    getBodyPartList(),
    getTargetList(),
    getEquipmentList(),
  ]);

  return NextResponse.json({ bodyParts, targets, equipment });
}
