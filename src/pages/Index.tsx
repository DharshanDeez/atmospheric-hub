import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { ForecastCard } from "@/components/ForecastCard";
import {
  fetchWeather,
  fetchForecast,
  WeatherData,
  ForecastData,
} from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || "London"
  );
  const [units, setUnits] = useState<"metric" | "imperial">("metric");

  const { data: weatherData, isLoading: isLoadingWeather } = useQuery({
    queryKey: ["weather", city, units],
    queryFn: () => fetchWeather(city, units),
    refetchInterval: 30000,
  });

  const { data: forecastData, isLoading: isLoadingForecast } = useQuery({
    queryKey: ["forecast", city, units],
    queryFn: () => fetchForecast(city, units),
    refetchInterval: 30000,
  });

  useEffect(() => {
    localStorage.setItem("lastCity", city);
  }, [city]);

  const getBackgroundGradient = (weather?: string) => {
    switch (weather?.toLowerCase()) {
      case "clear":
        return "from-blue-600 via-blue-400 to-blue-300";
      case "clouds":
        return "from-gray-700 via-gray-500 to-gray-400";
      case "rain":
        return "from-gray-800 via-gray-600 to-gray-500";
      case "snow":
        return "from-gray-300 via-gray-200 to-gray-100";
      case "thunderstorm":
        return "from-gray-900 via-gray-700 to-gray-600";
      default:
        return "from-blue-600 via-blue-400 to-blue-300";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br ${getBackgroundGradient(
        weatherData?.weather?.[0]?.main
      )} transition-colors duration-500`}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center justify-between">
          <SearchBar onSearch={setCity} />
          <div className="flex items-center space-x-2">
            <Switch
              id="units"
              checked={units === "imperial"}
              onCheckedChange={(checked) =>
                setUnits(checked ? "imperial" : "metric")
              }
              className="bg-white/20 data-[state=checked]:bg-white/40"
            />
            <Label htmlFor="units" className="text-white">
              {units === "metric" ? "°C" : "°F"}
            </Label>
          </div>
        </div>

        {/* Show error message if place is not found */}
        {!isLoadingWeather && !weatherData ? (
          <div className="text-center  text-white text-xl font-semibold">
            Place not found
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
