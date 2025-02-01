import { WeatherData } from "@/services/weatherService";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WeatherCardProps {
  data: WeatherData;
  isLoading?: boolean;
  units?: 'metric' | 'imperial';
}

export const WeatherCard = ({ data, isLoading, units = 'metric' }: WeatherCardProps) => {
  if (isLoading) {
    return (
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border-white/20">
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

  return (
    <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border-white/20 text-white animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {data.name}, {data.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            className="w-16 h-16"
          />
        </div>
        
        <div className="text-5xl font-bold">
          {Math.round(data.main.temp)}°{units === 'metric' ? 'C' : 'F'}
        </div>
        
        <div className="text-lg capitalize">
          {data.weather[0].description}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/60">Humidity</p>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>
          <div>
            <p className="text-white/60">Wind Speed</p>
            <p className="font-semibold">{data.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</p>
          </div>
          <div>
            <p className="text-white/60">Feels Like</p>
            <p className="font-semibold">{Math.round(data.main.feels_like)}°{units === 'metric' ? 'C' : 'F'}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};