import { toast } from "sonner";

const API_KEY = "1234567890"; // Replace with your OpenWeather API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
}

export const fetchWeather = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed to fetch weather data");
    throw error;
  }
};

export const fetchForecast = async (city: string, units: 'metric' | 'imperial' = 'metric'): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed to fetch forecast data");
    throw error;
  }
};