import { WeatherData } from "@/services/weatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Sun, Cloud, CloudRain } from "lucide-react";

interface WeatherCardProps {
  data: WeatherData;
  isLoading?: boolean;
  units?: "metric" | "imperial";
}

export const WeatherCard = ({
  data,
  isLoading,
  units = "metric",
}: WeatherCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-6 bg-transparent border-none">
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4 bg-white/20" />
          <Skeleton className="h-16 w-1/2 bg-white/20" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-8 bg-white/20" />
            <Skeleton className="h-8 bg-white/20" />
          </div>
        </div>
      </Card>
    );
  }

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case "clouds":
        return <Cloud className="w-16 h-16 text-white" />;
      case "rain":
        return <CloudRain className="w-16 h-16 text-gray-500" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  return (
    <Card className="w-full max-w-md p-6 bg-transparent border-none text-white animate-fade-in">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-light">{data.name}</h2>
          <div className="text-right">
            <p className="text-lg">{format(new Date(), "HH:mm a")}</p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-8xl font-light">
            {Math.round(data.main.temp)}°
          </div>
          <div className="flex flex-col items-start gap-2">
            {getWeatherIcon(data.weather[0].main)}
            <p className="text-lg">
              {data.wind.speed} {units === "metric" ? "m/s" : "mph"} /{" "}
              {Math.round(data.main.humidity)}%
            </p>
          </div>
        </div>

        <div className="text-xl font-light">
          {format(new Date(), "EEEE do")}
        </div>
      </div>
    </Card>
  );
};
