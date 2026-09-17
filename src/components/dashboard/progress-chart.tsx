"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import type { ProgressRecord } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { useLocale } from "@/lib/i18n/context";

export function ProgressChart({ records }: { records: ProgressRecord[] }) {
  const { t, locale } = useLocale();

  const data = records
    .filter((r) => r.weight_kg !== null)
    .map((r) => ({
      date: formatDate(r.recorded_at, locale),
      weight: r.weight_kg,
    }));

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted">
        {t("progressPage.noWeightData")}
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid stroke="#ffffff12" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#9c9c98"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9c9c98"
          tick={{ fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          domain={["dataMin - 3", "dataMax + 3"]}
        />
        <Tooltip
          contentStyle={{
            background: "#1c1c1c",
            border: "1px solid #ffffff17",
            borderRadius: 12,
            fontSize: 12,
          }}
          labelStyle={{ color: "#9c9c98" }}
        />
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#ff5a1f"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#ff5a1f" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
