// Weather service using Open-Meteo (free, no API key required)
export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  city: string;
}

export const getWeatherForMonteVerde = async (): Promise<WeatherData> => {
  try {
    // Monte Verde, MG coordinates: -21.4532, -45.4697
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=-21.4532&longitude=-45.4697&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh&timezone=America/Sao_Paulo'
    );
    
    if (!response.ok) throw new Error('Failed to fetch weather');
    
    const data = await response.json();
    const current = data.current;

    const weatherConditions: Record<number, string> = {
      0: 'Céu Limpo',
      1: 'Parcialmente Nublado',
      2: 'Nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Neblina com Geada',
      51: 'Chuva Leve',
      53: 'Chuva Moderada',
      55: 'Chuva Forte',
      61: 'Chuva',
      63: 'Chuva Forte',
      65: 'Chuva Muito Forte',
      71: 'Neve Leve',
      73: 'Neve Moderada',
      75: 'Neve Forte',
      77: 'Granizo',
      80: 'Pancadas de Chuva',
      81: 'Pancadas Fortes',
      82: 'Pancadas Muito Fortes',
      85: 'Neve com Pancadas',
      86: 'Neve com Pancadas Fortes',
      95: 'Tempestade',
      96: 'Tempestade com Granizo',
      99: 'Tempestade com Granizo Forte',
    };

    return {
      temperature: Math.round(current.temperature_2m),
      condition: weatherConditions[current.weather_code] || 'Variável',
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      city: 'Monte Verde, MG',
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return {
      temperature: 18,
      condition: 'Indisponível',
      humidity: 0,
      windSpeed: 0,
      city: 'Monte Verde, MG',
    };
  }
};
