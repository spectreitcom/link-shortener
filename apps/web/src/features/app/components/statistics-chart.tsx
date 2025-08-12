"use client";

import { GetUrlStatisticsResponse } from "@/features/app/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";

type Props = {
  visits: GetUrlStatisticsResponse["visits"];
};

export function StatisticsChart({ visits }: Props) {
  if (!visits || visits.length === 0) return <NoData />;
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Visits Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value) => [value, "Visits"]}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function NoData() {
  return (
    <Card className="mt-6">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <BarChart3 className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Statistics Available</h3>
        <p className="text-sm text-gray-500 text-center max-w-md">
          There&apos;s no visit data for this link yet. Statistics will appear once people start visiting your shortened URL.
        </p>
      </CardContent>
    </Card>
  );
}
