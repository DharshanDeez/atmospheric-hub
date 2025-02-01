import { ForecastData } from "@/services/weatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Sun, Cloud, CloudRain } from "lucide-react";

interface ForecastCardProps {
  data: ForecastData;
  isLoading?: boolean;
  units: 'metric' | 'imperial';
}

export const ForecastCard = ({ data, isLoading, units }: ForecastCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-6 bg-transparent border-none">
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-24 bg-white/20" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case 'clear':
        return <Sun className="w-8 h-8 text-white" />;
      case 'clouds':
        return <Cloud className="w-8 h-8 text-white" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-white" />;
      default:
        return <Sun className="w-8 h-8 text-white" />;
    }
  };

  // Get one forecast per day (at noon)
  const dailyForecasts = data.list.filter(item => 
    item.dt_txt.includes("12:00:00")
  ).slice(0, 6);

  return (
    <Card className="w-full max-w-md p-6 bg-transparent border-none text-white">
      <div className="grid grid-cols-6 gap-8">
        {dailyForecasts.map((forecast) => (
          <div key={forecast.dt} className="text-center space-y-2">
            <p className="text-sm font-light">
              {format(new Date(forecast.dt_txt), 'EEE')}
            </p>
            {getWeatherIcon(forecast.weather[0].main)}
            <p className="text-lg font-light">
              {Math.round(forecast.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};