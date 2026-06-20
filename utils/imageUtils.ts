// Image compression utility
export const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Scale down to 50% to reduce size
        canvas.width = img.width * 0.5;
        canvas.height = img.height * 0.5;
        
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to WebP for smaller size, fallback to JPEG
        const compressed = canvas.toDataURL('image/webp', 0.7) || canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressed);
      };
      img.onerror = () => reject(new Error('Failed to compress image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

// Check if image is base64 (not URL)
export const isBase64Image = (str: string): boolean => {
  return str.startsWith('data:image');
};
