// PDF to Image conversion utility
const convertPdfToImages = async (pdfFile, pages, options, progressCallback) => {
  try {
    // Default options
    const quality = options.quality || 1.0;
    const format = options.format || 'png';
    const dpi = options.dpi || 300;

    // Calculate scale based on DPI (PDF default is 72 DPI)
    const scale = dpi / 72;

    // Load the PDF file
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const convertedImages = [];

    // Process each requested page
    for (let i = 0; i < pages.length; i++) {
      const pageNumber = pages[i];

      if (pageNumber < 1 || pageNumber > pdf.numPages) {
        console.warn(`Skipping invalid page number: ${pageNumber}`);
        continue;
      }

      // Update progress
      progressCallback(i / pages.length);

      // Get the page
      const page = await pdf.getPage(pageNumber);

      // Set up canvas with appropriate scale for the desired DPI
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render PDF page to canvas
      await page.render({
        canvasContext: context,
        viewport
      }).promise;

      // Convert canvas to image data URL based on format
      let imageDataUrl;
      let filename = pdfFile.name.replace(/\.pdf$/i, '');

      if (format === 'jpeg' || format === 'jpg') {
        imageDataUrl = canvas.toDataURL('image/jpeg', quality);
        filename = `${filename}_page${pageNumber}.jpg`;
      } else if (format === 'webp') {
        imageDataUrl = canvas.toDataURL('image/webp', quality);
        filename = `${filename}_page${pageNumber}.webp`;
      } else {
        // Default to PNG
        imageDataUrl = canvas.toDataURL('image/png');
        filename = `${filename}_page${pageNumber}.png`;
      }

      // Add to results
      convertedImages.push({
        page: pageNumber,
        dataUrl: imageDataUrl,
        width: canvas.width,
        height: canvas.height,
        format,
        filename
      });
    }

    // Final progress update
    progressCallback(1);

    return convertedImages;
  } catch (error) {
    console.error('Error in PDF conversion:', error);
    throw new Error('Failed to convert PDF to images');
  }
};