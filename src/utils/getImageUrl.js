export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) {
    const baseUrl = import.meta.env.VITE_API_URL || 'https://h-backend-8tc0.onrender.com';
    return `${baseUrl}${url}`;
  }
  return url;
};
