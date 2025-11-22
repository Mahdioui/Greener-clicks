"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonLoader() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-20 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-20 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-20 w-full animate-pulse rounded bg-gray-200"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="h-6 w-48 animate-pulse rounded bg-gray-200"></div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full animate-pulse rounded bg-gray-200"></div>
        </CardContent>
      </Card>
    </div>
  );
}

