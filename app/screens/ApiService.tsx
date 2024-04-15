export const fetchServices = async () => {
  const response = await fetch('https://adamix.net/defensa_civil/def/servicios.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchNews = async () => {
  const response = await fetch('https://adamix.net/defensa_civil/def/noticias.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchSpecificNews = async () => {
  const response = await fetch('https://adamix.net/defensa_civil/def/noticias_especificas.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchVideos = async () => {
  const response = await fetch('https://adamix.net/defensa_civil/def/videos.php');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
