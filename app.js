const App = () => {
  const [pdfFile, setPdfFile] = React.useState(null);
  const [pdfName, setPdfName] = React.useState('');
  const [pdfPageCount, setPdfPageCount] = React.useState(0);
  const [convertedImages, setConvertedImages] = React.useState([]);
  const [isConverting, setIsConverting] = React.useState(false);
  const [conversionProgress, setConversionProgress] = React.useState(0);
  const [conversionOptions, setConversionOptions] = React.useState({
    quality: 1.0,
    format: 'png',
    dpi: 300,
    selectedPages: 'all'
  });
  const [error, setError] = React.useState(null);

  const handleFileChange = (file) => {
    if (file) {
      setPdfFile(file);
      setPdfName(file.name);
      setConvertedImages([]);
      setError(null);

      // Get page count using PDF.js
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);
          const loadingTask = pdfjsLib.getDocument({ data: typedArray });
          const pdf = await loadingTask.promise;
          setPdfPageCount(pdf.numPages);
        } catch (err) {
          console.error('Error analyzing PDF:', err);
          setError('Failed to read the PDF file. Make sure it is a valid PDF document.');
        }
      };
      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      setError('Please upload a PDF file first');
      return;
    }

    try {
      setIsConverting(true);
      setConversionProgress(0);
      setError(null);

      const pages = conversionOptions.selectedPages === 'all' ?
      Array.from({ length: pdfPageCount }, (_, i) => i + 1) :
      conversionOptions.selectedPages.split(',').map((page) => parseInt(page.trim()));

      const result = await convertPdfToImages(
        pdfFile,
        pages,
        conversionOptions,
        (progress) => setConversionProgress(progress)
      );

      setConvertedImages(result);
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Error converting PDF to images. Please try again with a different file.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleOptionsChange = (newOptions) => {
    setConversionOptions({ ...conversionOptions, ...newOptions });
  };

  const handleDownloadAll = () => {
    if (convertedImages.length === 0) return;
    downloadAllImages(convertedImages, pdfName.replace('.pdf', ''));
  };

  return (
    <div className="min-h-screen flex flex-col" data-id="qjvsnr87b" data-path="app.js">
      <Navbar data-id="6p3uvs363" data-path="app.js" />
      
      <main className="flex-grow container mx-auto px-4 py-8" data-id="8yxmrz47y" data-path="app.js">
        <div className="max-w-6xl mx-auto" data-id="5w2f129q3" data-path="app.js">
          <h1 className="text-3xl font-bold text-center mb-8" data-id="vfaxm6g21" data-path="app.js">Convert PDF to Images</h1>
          
          {error &&
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert" data-id="600vxw3c9" data-path="app.js">
              <p data-id="iveut2arw" data-path="app.js">{error}</p>
            </div>
          }
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-id="0oxp6j3i2" data-path="app.js">
            <FileUpload onFileChange={handleFileChange} currentFile={pdfFile} data-id="yb0vyiwil" data-path="app.js" />
          </div>
          
          {pdfFile &&
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="8nmyvzep9" data-path="app.js">
              <div className="lg:col-span-1" data-id="bwj5m1yfh" data-path="app.js">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6" data-id="vyy4jx3xk" data-path="app.js">
                  <h2 className="text-xl font-semibold mb-4" data-id="8kfdqu862" data-path="app.js">PDF Preview</h2>
                  <PDFViewer file={pdfFile} pageCount={pdfPageCount} data-id="54ffzci1g" data-path="app.js" />
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6" data-id="evfjqsv3z" data-path="app.js">
                  <h2 className="text-xl font-semibold mb-4" data-id="e3bdzolzg" data-path="app.js">Conversion Options</h2>
                  <ConversionOptions
                  options={conversionOptions}
                  pageCount={pdfPageCount}
                  onOptionsChange={handleOptionsChange} data-id="g1dinzcqb" data-path="app.js" />

                  
                  <button
                  onClick={handleConvert}
                  disabled={isConverting || !pdfFile}
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white ${
                  isConverting || !pdfFile ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`
                  } data-id="dly39g09c" data-path="app.js">

                    {isConverting ?
                  <span className="flex items-center justify-center" data-id="sa1zw4gnb" data-path="app.js">
                        <i className="fas fa-circle-notch loading-spinner mr-2" data-id="jro1w7gvm" data-path="app.js"></i>
                        Converting... {Math.round(conversionProgress * 100)}%
                      </span> :
                  'Convert PDF to Images'}
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-2" data-id="6uy8o0l8i" data-path="app.js">
                <div className="bg-white rounded-lg shadow-md p-6" data-id="ww5dyzwpu" data-path="app.js">
                  <div className="flex justify-between items-center mb-4" data-id="d7nte3rn7" data-path="app.js">
                    <h2 className="text-xl font-semibold" data-id="9e3m7c9l7" data-path="app.js">Converted Images</h2>
                    {convertedImages.length > 0 &&
                  <button
                    onClick={handleDownloadAll}
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center" data-id="ctt4w59it" data-path="app.js">

                        <i className="fas fa-download mr-2" data-id="uewzf67y" data-path="app.js"></i> Download All
                      </button>
                  }
                  </div>
                  
                  <ImageGallery images={convertedImages} data-id="pv2f7ibe3" data-path="app.js" />
                  
                  {convertedImages.length === 0 && !isConverting &&
                <div className="text-center py-12 text-gray-500" data-id="v23qay03h" data-path="app.js">
                      <i className="fas fa-images text-5xl mb-4" data-id="zndh28tw3" data-path="app.js"></i>
                      <p data-id="rm5ar2p6g" data-path="app.js">Converted images will appear here</p>
                    </div>
                }
                </div>
              </div>
            </div>
          }
        </div>
      </main>
      
      <Footer data-id="qsjvf2sdd" data-path="app.js" />
    </div>);

};

ReactDOM.render(
  <App data-id="osec02lsx" data-path="app.js" />,
  document.getElementById('root')
);