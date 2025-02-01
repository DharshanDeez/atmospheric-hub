import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import { fetchWeather, fetchForecast, WeatherData, ForecastData } from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [city, setCity] = useState(() => localStorage.getItem("lastCity") || "London");
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const { data: weatherData, isLoading: isLoadingWeather } = useQuery({
    queryKey: ["weather", city, units],
    queryFn: () => fetchWeather(city, units),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: forecastData, isLoading: isLoadingForecast } = useQuery({
    queryKey: ["forecast", city, units],
    queryFn: () => fetchForecast(city, units),
    refetchInterval: 30000,
  });

  useEffect(() => {
    localStorage.setItem("lastCity", city);
  }, [city]);

  const getBackgroundClass = (weather?: string) => {
    switch (weather?.toLowerCase()) {
      case "clear":
        return "from-weather-clear to-blue-400";
      case "clouds":
        return "from-weather-clouds to-gray-400";
      case "rain":
        return "from-weather-rain to-gray-800";
      case "snow":
        return "from-weather-snow to-gray-100";
      case "thunderstorm":
        return "from-weather-thunder to-gray-900";
      default:
        return "from-weather-clear to-blue-400";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${getBackgroundClass(weatherData?.weather[0].main)}`}>
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <SearchBar onSearch={setCity} />
          <div className="flex items-center space-x-2">
            <Switch
              id="units"
              checked={units === 'imperial'}
              onCheckedChange={(checked) => setUnits(checked ? 'imperial' : 'metric')}
            />
            <Label htmlFor="units" className="text-white">
              {units === 'metric' ? '°C' : '°F'}
            </Label>
          </div>
        </div>
        <WeatherCard 
          data={weatherData as WeatherData} 
          isLoading={isLoadingWeather} 
          units={units}
        />
        <ForecastCard 
          data={forecastData as ForecastData} 
          isLoading={isLoadingForecast}
          units={units}
        />
      </div>
    </div>
  );
};

export default Index;