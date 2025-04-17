const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  if (images.length === 0) {
    return null;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = (image, event) => {
    event.stopPropagation();

    const link = document.createElement('a');
    link.href = image.dataUrl;
    link.download = image.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div data-id="bnbz5azx3" data-path="components/ImageGallery.js">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-id="xv2xzn0mq" data-path="components/ImageGallery.js">
        {images.map((image) =>
        <div
          key={image.page}
          className="relative group gallery-image rounded-lg overflow-hidden border border-gray-200 bg-white"
          onClick={() => handleImageClick(image)} data-id="7hrj8ojk4" data-path="components/ImageGallery.js">

            <img
            src={image.dataUrl}
            alt={`Page ${image.page}`}
            className="w-full h-48 object-contain p-2 bg-gray-50" data-id="120apjaz6" data-path="components/ImageGallery.js" />

            
            <div className="p-3 border-t border-gray-100" data-id="1tckkkfrn" data-path="components/ImageGallery.js">
              <div className="flex justify-between items-start" data-id="0xwbyl0v4" data-path="components/ImageGallery.js">
                <div data-id="qmcjsdrqt" data-path="components/ImageGallery.js">
                  <h3 className="font-medium text-gray-800" data-id="n1chp5tfz" data-path="components/ImageGallery.js">Page {image.page}</h3>
                  <p className="text-xs text-gray-500" data-id="35sh4zhe3" data-path="components/ImageGallery.js">{image.filename}</p>
                </div>
                
                <button
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                onClick={(e) => handleDownload(image, e)} data-id="bh12wz6i2" data-path="components/ImageGallery.js">

                  <i className="fas fa-download" data-id="g1b5zxsiq" data-path="components/ImageGallery.js"></i>
                </button>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" data-id="w8wb3k0va" data-path="components/ImageGallery.js">
              <div className="flex space-x-2" data-id="qt6socyxo" data-path="components/ImageGallery.js">
                <button
                className="bg-white text-gray-800 py-1 px-3 rounded-lg text-sm font-medium"
                onClick={() => handleImageClick(image)} data-id="np7aqo72i" data-path="components/ImageGallery.js">

                  <i className="fas fa-eye mr-1" data-id="jo9z15cv2" data-path="components/ImageGallery.js"></i> View
                </button>
                <button
                className="bg-blue-600 text-white py-1 px-3 rounded-lg text-sm font-medium"
                onClick={(e) => handleDownload(image, e)} data-id="6di8ac3jb" data-path="components/ImageGallery.js">

                  <i className="fas fa-download mr-1" data-id="5gpc87fqe" data-path="components/ImageGallery.js"></i> Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      {selectedImage &&
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" data-id="bx0dyz7ef" data-path="components/ImageGallery.js">
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden relative" data-id="9poez7dsu" data-path="components/ImageGallery.js">
            <div className="flex justify-between items-center p-4 border-b" data-id="awtzabs7a" data-path="components/ImageGallery.js">
              <h3 className="font-medium" data-id="veo4au6lk" data-path="components/ImageGallery.js">
                Page {selectedImage.page} • {selectedImage.filename}
              </h3>
              <button
              className="text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal} data-id="8p8utfedg" data-path="components/ImageGallery.js">

                <i className="fas fa-times" data-id="kcpmwy4io" data-path="components/ImageGallery.js"></i>
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 flex justify-center" style={{ maxHeight: '80vh', overflowY: 'auto' }} data-id="0xg40wxsj" data-path="components/ImageGallery.js">
              <img
              src={selectedImage.dataUrl}
              alt={`Page ${selectedImage.page}`}
              className="max-w-full" data-id="xc75263b7" data-path="components/ImageGallery.js" />

            </div>
            
            <div className="p-4 border-t flex justify-end" data-id="6dscuc008" data-path="components/ImageGallery.js">
              <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium"
              onClick={(e) => handleDownload(selectedImage, e)} data-id="mulbolf45" data-path="components/ImageGallery.js">

                <i className="fas fa-download mr-1" data-id="a44vf9hdz" data-path="components/ImageGallery.js"></i> Download Image
              </button>
            </div>
          </div>
        </div>
      }
    </div>);

};