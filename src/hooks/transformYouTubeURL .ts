export const transformYouTubeURL = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.substring(1)}${urlObj.search}`;
    } else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/watch') {
      return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}?${urlObj.searchParams.toString()}`;
    } else {
      return url;
    }
  } catch (e) {
    console.error('Invalid URL:', e);
    return url;
  }
};
