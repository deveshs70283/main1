/**
 * Converts a download URL to a blob URL that can be displayed in the browser
 */
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