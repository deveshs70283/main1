export async function loadImageWithRetry(url: string, maxRetries = 3): Promise<HTMLImageElement> {
  const proxyUrl = (originalUrl: string) => 
    `https://api.allorigins.win/raw?url=${encodeURIComponent(originalUrl)}`;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    let retries = 0;
    let useProxy = false;

    const tryLoad = () => {
      img.onload = () => resolve(img);
      img.onerror = () => {
        retries++;
        if (retries < maxRetries) {
          if (!useProxy) {
            // Try with proxy on first retry
            useProxy = true;
            img.src = proxyUrl(url);
          } else {
            // Add cache buster on subsequent retries
            const cacheBuster = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;
            img.src = proxyUrl(cacheBuster);
          }
        } else {
          reject(new Error('Failed to load image after multiple attempts'));
        }
      };
      img.src = useProxy ? proxyUrl(url) : url;
    };

    tryLoad();
  });
}

export async function convertDownloadUrlToDisplayUrl(downloadUrl: string): Promise<string> {
  try {
    const response = await fetch(downloadUrl);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error converting image URL:', error);
    throw new Error('Failed to process image');
  }
}