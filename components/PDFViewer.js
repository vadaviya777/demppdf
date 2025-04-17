const PDFViewer = ({ file, pageCount }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(true);
  const canvasRef = React.useRef(null);
  const [scale, setScale] = React.useState(1.0);

  React.useEffect(() => {
    if (!file) return;

    let isMounted = true;
    setIsLoading(true);

    const renderPage = async () => {
      try {
        const fileReader = new FileReader();

        fileReader.onload = async (event) => {
          const typedArray = new Uint8Array(event.target.result);
          const loadingTask = pdfjsLib.getDocument({ data: typedArray });

          try {
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(currentPage);

            if (!isMounted) return;

            const viewport = page.getViewport({ scale });
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            };

            await page.render(renderContext).promise;
            setIsLoading(false);
          } catch (err) {
            console.error('Error rendering PDF:', err);
            setIsLoading(false);
          }
        };

        fileReader.readAsArrayBuffer(file);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setIsLoading(false);
      }
    };

    renderPage();

    return () => {
      isMounted = false;
    };
  }, [file, currentPage, scale]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3.0));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  };

  if (!file) {
    return (
      <div className="flex items-center justify-center h-40 bg-gray-100 rounded-lg" data-id="w5c7de1gc" data-path="components/PDFViewer.js">
        <p className="text-gray-500" data-id="kyfqlga6j" data-path="components/PDFViewer.js">Upload a PDF to preview</p>
      </div>);

  }

  return (
    <div className="w-full" data-id="rl5c1z4a7" data-path="components/PDFViewer.js">
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" data-id="2itx0r6aw" data-path="components/PDFViewer.js">
        {isLoading &&
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10" data-id="9swacogk6" data-path="components/PDFViewer.js">
            <div className="flex items-center" data-id="faxey9aac" data-path="components/PDFViewer.js">
              <i className="fas fa-circle-notch text-blue-600 text-xl loading-spinner mr-2" data-id="jolrwxq1h" data-path="components/PDFViewer.js"></i>
              <span data-id="z3jssh0zc" data-path="components/PDFViewer.js">Loading...</span>
            </div>
          </div>
        }
        
        <div className="flex justify-center p-4" data-id="btfsazzj2" data-path="components/PDFViewer.js">
          <canvas ref={canvasRef} className="pdf-canvas" data-id="a06vvv731" data-path="components/PDFViewer.js"></canvas>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3" data-id="0af33sfb7" data-path="components/PDFViewer.js">
        <div className="flex space-x-2" data-id="sz3pqdl8o" data-path="components/PDFViewer.js">
          <button
            onClick={handleZoomOut}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={scale <= 0.5} data-id="1im7zo95v" data-path="components/PDFViewer.js">

            <i className="fas fa-search-minus" data-id="d3jzelsxx" data-path="components/PDFViewer.js"></i>
          </button>
          <button
            onClick={handleZoomIn}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            disabled={scale >= 3.0} data-id="42npflwmq" data-path="components/PDFViewer.js">

            <i className="fas fa-search-plus" data-id="gyw2lnhve" data-path="components/PDFViewer.js"></i>
          </button>
        </div>
        
        <div className="flex items-center space-x-3" data-id="lt1cwt5a8" data-path="components/PDFViewer.js">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" data-id="fthc555kq" data-path="components/PDFViewer.js">

            <i className="fas fa-chevron-left" data-id="u8zcfxzjr" data-path="components/PDFViewer.js"></i>
          </button>
          
          <span className="text-sm" data-id="qxua2an6s" data-path="components/PDFViewer.js">
            Page {currentPage} of {pageCount}
          </span>
          
          <button
            onClick={handleNextPage}
            disabled={currentPage >= pageCount}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50" data-id="i6fikzm83" data-path="components/PDFViewer.js">

            <i className="fas fa-chevron-right" data-id="vja01i21t" data-path="components/PDFViewer.js"></i>
          </button>
        </div>
      </div>
    </div>);

};