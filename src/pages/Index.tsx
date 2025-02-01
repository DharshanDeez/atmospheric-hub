import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { fetchWeather, WeatherData } from "@/services/weatherService";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [city, setCity] = useState(() => localStorage.getItem("lastCity") || "London");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    refetchInterval: 30000, // Refetch every 30 seconds
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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br ${getBackgroundClass(data?.weather[0].main)}`}>
      <div className="w-full max-w-md space-y-8">
        <SearchBar onSearch={setCity} />
        <WeatherCard data={data as WeatherData} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;