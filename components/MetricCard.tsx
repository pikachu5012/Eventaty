import { TrendingUp } from "lucide-react";

interface MetricCardProps {
  icon: any;
  title: string;
  value: string;
  trend?: string;
  iconBg?: string;
  iconColor?: string;
}

const MetricCard = ({
  icon: Icon,
  title,
  value,
  trend,
  iconBg = "bg-secondary/20",
  iconColor = "text-secondary",
}: MetricCardProps) => (
  <div className="bg-card p-6 rounded-2xl shadow-sm border border-eventaty-gold/50 flex flex-col gap-4 relative overflow-hidden group hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div className={`${iconBg} ${iconColor} p-3 rounded-xl`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-primary mt-1">{value}</h3>
    </div>
  </div>
);

export default MetricCard;
