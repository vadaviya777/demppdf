// Download utility functions
const downloadAllImages = async (images, baseName) => {
  if (!images || images.length === 0) return;

  try {
    // Create a new JSZip instance
    const zip = new JSZip();

    // Add each image to the zip
    images.forEach((image) => {
      // Convert data URL to binary
      const binary = atob(image.dataUrl.split(',')[1]);
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      const blob = new Uint8Array(array);

      // Add file to zip
      zip.file(image.filename, blob);
    });

    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: 'blob' });

    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipContent);
    link.download = `${baseName}_images.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup the object URL
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 100);

  } catch (error) {
    console.error('Error creating zip file:', error);
    alert('Failed to create zip file. Please try downloading images individually.');
  }
};