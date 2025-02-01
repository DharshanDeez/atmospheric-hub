import { ForecastData } from "@/services/weatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface ForecastCardProps {
  data: ForecastData;
  isLoading?: boolean;
  units: 'metric' | 'imperial';
}

export const ForecastCard = ({ data, isLoading, units }: ForecastCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border-white/20">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 bg-white/20" />
          <div className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-24 bg-white/20" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  // Get one forecast per day (at noon)
  const dailyForecasts = data.list.filter(item => 
    item.dt_txt.includes("12:00:00")
  ).slice(0, 5);

  return (
    <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white mt-4">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-5 gap-4">
        {dailyForecasts.map((forecast) => (
          <div key={forecast.dt} className="text-center">
            <p className="text-sm font-medium">
              {format(new Date(forecast.dt_txt), 'EEE')}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt={forecast.weather[0].description}
              className="w-12 h-12 mx-auto"
            />
            <p className="text-sm font-bold">
              {Math.round(forecast.main.temp)}°{units === 'metric' ? 'C' : 'F'}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};