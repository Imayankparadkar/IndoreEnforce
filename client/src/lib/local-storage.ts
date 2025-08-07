// Local storage utilities for images and files
const STORAGE_KEYS = {
  EVIDENCE_FILES: 'prahaar_evidence_files',
  UPLOADED_IMAGES: 'prahaar_uploaded_images'
};

// Store image files locally
export function saveImageToLocal(file: File, reportId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const imageId = `${reportId}_${Date.now()}_${file.name}`;
        
        // Get existing images
        const existingImages = getStoredImages();
        existingImages[imageId] = {
          data: result,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          reportId: reportId,
          uploadedAt: new Date().toISOString()
        };
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.UPLOADED_IMAGES, JSON.stringify(existingImages));
        
        console.log('✅ Image saved to local storage:', imageId);
        resolve(imageId);
      } catch (error) {
        console.error('❌ Error saving image to local storage:', error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
}

// Get stored images
export function getStoredImages(): Record<string, any> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.UPLOADED_IMAGES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading stored images:', error);
    return {};
  }
}

// Get image by ID
export function getImageById(imageId: string): any | null {
  const images = getStoredImages();
  return images[imageId] || null;
}

// Get images for a specific report
export function getImagesForReport(reportId: string): any[] {
  const images = getStoredImages();
  return Object.values(images).filter((img: any) => img.reportId === reportId);
}

// Store evidence file references
export function storeEvidenceFileReference(reportId: string, files: File[]): string[] {
  try {
    const fileReferences: string[] = [];
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        // For images, store locally and save reference
        saveImageToLocal(file, reportId).then(imageId => {
          fileReferences.push(`local_image:${imageId}`);
        });
      } else {
        // For other files, create reference (can be extended for other storage)
        const fileRef = `local_file:${reportId}_${Date.now()}_${file.name}`;
        fileReferences.push(fileRef);
        
        // Store file metadata
        const metadata = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          reportId: reportId,
          uploadedAt: new Date().toISOString()
        };
        
        localStorage.setItem(`prahaar_file_${fileRef}`, JSON.stringify(metadata));
      }
    });
    
    return fileReferences;
  } catch (error) {
    console.error('Error storing evidence file references:', error);
    return [];
  }
}

// Clean up old files (optional - can be called periodically)
export function cleanupOldFiles(daysOld: number = 30) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const images = getStoredImages();
    const updatedImages: Record<string, any> = {};
    
    Object.entries(images).forEach(([imageId, imageData]: [string, any]) => {
      const uploadedAt = new Date(imageData.uploadedAt);
      if (uploadedAt > cutoffDate) {
        updatedImages[imageId] = imageData;
      }
    });
    
    localStorage.setItem(STORAGE_KEYS.UPLOADED_IMAGES, JSON.stringify(updatedImages));
    
    console.log('✅ Cleaned up old files');
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
}