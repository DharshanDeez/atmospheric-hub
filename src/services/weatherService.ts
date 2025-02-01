import { toast } from "sonner";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

export const fetchWeather = async (
  city: string,
  units: "metric" | "imperial" = "metric"
): Promise<WeatherData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      return null; // Return null instead of throwing an error
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchForecast = async (
  city: string,
  units: "metric" | "imperial" = "metric"
): Promise<ForecastData | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=${units}&appid=${API_KEY}`
    );

    if (!response.ok) {
      return null; // Return null instead of throwing an error
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
