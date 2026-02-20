import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from "@/src/components/common/card";
import { cn } from "@/src/utils/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    description?: string;
    loading?: boolean;
}

export const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    description,
    loading
}: StatCardProps) => {
    if (loading) {
        return (
            <Card className="overflow-hidden border-slate-200 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
                    </div>
                    <div className="mt-4 h-8 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-48 animate-pulse rounded bg-slate-100" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden border-slate-200 transition-all hover:shadow-md">
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                        <Icon size={20} />
                    </div>
                </div>
                <div className="mt-2">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">{value}</h2>
                    <div className="mt-1 flex items-center gap-2">
                        {trend && (
                            <span className={cn(
                                "flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full",
                                trend.isPositive ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                            )}>
                                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                            </span>
                        )}
                        <p className="text-xs text-slate-400">
                            {description || 'vs. mes anterior'}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};