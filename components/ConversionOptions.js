const ConversionOptions = ({ options, onOptionsChange, pageCount }) => {
  const handleQualityChange = (e) => {
    const value = parseFloat(e.target.value);
    onOptionsChange({ quality: value });
  };

  const handleFormatChange = (e) => {
    onOptionsChange({ format: e.target.value });
  };

  const handleDpiChange = (e) => {
    const value = parseInt(e.target.value);
    onOptionsChange({ dpi: value });
  };

  const handlePageSelectChange = (e) => {
    onOptionsChange({ selectedPages: e.target.value });
  };

  const handleCustomPagesChange = (e) => {
    onOptionsChange({ selectedPages: e.target.value });
  };

  // Function to check if custom pages input is valid
  const isValidPageSelection = (input) => {
    if (input === 'all') return true;

    const pagePattern = /^(\d+)(?:-(\d+))?$/;

    // Split by commas and check each part
    return input.split(',').every((part) => {
      part = part.trim();
      const match = part.match(pagePattern);

      if (!match) return false;

      // If it's a single page
      if (!match[2]) {
        const page = parseInt(match[1]);
        return page >= 1 && page <= pageCount;
      }

      // If it's a range
      const start = parseInt(match[1]);
      const end = parseInt(match[2]);

      return start >= 1 && end <= pageCount && start <= end;
    });
  };

  return (
    <div className="space-y-4" data-id="6nqqhzv34" data-path="components/ConversionOptions.js">
      <div data-id="a7depd7xb" data-path="components/ConversionOptions.js">
        <label className="block text-sm font-medium text-gray-700 mb-1" data-id="5jtb4her5" data-path="components/ConversionOptions.js">
          Image Format
        </label>
        <select
          value={options.format}
          onChange={handleFormatChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" data-id="gza9cmpw5" data-path="components/ConversionOptions.js">

          <option value="png" data-id="idkp7rvqa" data-path="components/ConversionOptions.js">PNG (High Quality, Larger Size)</option>
          <option value="jpeg" data-id="5t1dx7rv1" data-path="components/ConversionOptions.js">JPEG (Smaller Size, Lossy)</option>
          <option value="webp" data-id="2ujrncoel" data-path="components/ConversionOptions.js">WebP (Modern Format, Good Compression)</option>
        </select>
      </div>
      
      <div data-id="x5o2scg95" data-path="components/ConversionOptions.js">
        <div className="flex justify-between items-center mb-1" data-id="f0hdcsglb" data-path="components/ConversionOptions.js">
          <label className="block text-sm font-medium text-gray-700" data-id="g4tf6qzb6" data-path="components/ConversionOptions.js">
            Quality
          </label>
          <span className="text-sm text-gray-500" data-id="howyvl2t2" data-path="components/ConversionOptions.js">
            {options.format === 'png' ? 'Lossless' : Math.round(options.quality * 100) + '%'}
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={options.quality}
          onChange={handleQualityChange}
          disabled={options.format === 'png'}
          className="custom-range w-full" data-id="gz3axz416" data-path="components/ConversionOptions.js" />

      </div>
      
      <div data-id="m7agnxvw2" data-path="components/ConversionOptions.js">
        <div className="flex justify-between items-center mb-1" data-id="tugreygq6" data-path="components/ConversionOptions.js">
          <label className="block text-sm font-medium text-gray-700" data-id="em33txg5h" data-path="components/ConversionOptions.js">
            Resolution (DPI)
          </label>
          <span className="text-sm text-gray-500" data-id="wtqxnyud6" data-path="components/ConversionOptions.js">{options.dpi} DPI</span>
        </div>
        <input
          type="range"
          min="72"
          max="600"
          step="1"
          value={options.dpi}
          onChange={handleDpiChange}
          className="custom-range w-full" data-id="azax6cvzy" data-path="components/ConversionOptions.js" />

      </div>
      
      <div data-id="jnzbplosa" data-path="components/ConversionOptions.js">
        <label className="block text-sm font-medium text-gray-700 mb-1" data-id="qav3cu58n" data-path="components/ConversionOptions.js">
          Pages to Convert
        </label>
        <select
          value={options.selectedPages === 'all' || /^\d/.test(options.selectedPages) ? options.selectedPages : 'custom'}
          onChange={handlePageSelectChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2" data-id="0ht0o1eal" data-path="components/ConversionOptions.js">

          <option value="all" data-id="gqgjlecfo" data-path="components/ConversionOptions.js">All Pages ({pageCount} pages)</option>
          <option value="1" data-id="a2w5hojrj" data-path="components/ConversionOptions.js">First Page Only</option>
          {pageCount > 1 && <option value={`${pageCount}`} data-id="nictglj4v" data-path="components/ConversionOptions.js">Last Page Only</option>}
          {pageCount > 2 &&
          <>
              <option value="1-3" data-id="y2gdk3z38" data-path="components/ConversionOptions.js">First 3 Pages</option>
              <option value={`1-${pageCount}`} data-id="b3htz3ut7" data-path="components/ConversionOptions.js">All Pages (1-{pageCount})</option>
              <option value="custom" data-id="08t20rnm8" data-path="components/ConversionOptions.js">Custom Selection</option>
            </>
          }
        </select>
        
        {options.selectedPages !== 'all' && !/^\d+(-\d+)?$/.test(options.selectedPages) &&
        <div data-id="4ye28rcnx" data-path="components/ConversionOptions.js">
            <input
            type="text"
            placeholder="e.g. 1,3,5-7,10"
            value={options.selectedPages === 'custom' ? '' : options.selectedPages}
            onChange={handleCustomPagesChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            options.selectedPages !== 'custom' && !isValidPageSelection(options.selectedPages) ?
            'border-red-300' :
            'border-gray-300'}`
            } data-id="xe7za83mn" data-path="components/ConversionOptions.js" />

            <p className="text-xs text-gray-500 mt-1" data-id="n4204egtw" data-path="components/ConversionOptions.js">
              Enter page numbers separated by commas. Ranges like 1-3 are supported.
            </p>
            {options.selectedPages !== 'custom' && !isValidPageSelection(options.selectedPages) &&
          <p className="text-xs text-red-500 mt-1" data-id="tlok251gu" data-path="components/ConversionOptions.js">
                Invalid page selection. Please use valid page numbers (1-{pageCount}).
              </p>
          }
          </div>
        }
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200" data-id="nhhzus9c9" data-path="components/ConversionOptions.js">
        <h3 className="text-sm font-medium text-gray-700 mb-2" data-id="d2d8kykm7" data-path="components/ConversionOptions.js">Output Information</h3>
        <ul className="text-xs text-gray-600 space-y-1" data-id="61ohjwada" data-path="components/ConversionOptions.js">
          <li className="flex items-center" data-id="y4citbqf5" data-path="components/ConversionOptions.js">
            <i className="fas fa-info-circle text-blue-500 mr-2" data-id="4c3xjliw6" data-path="components/ConversionOptions.js"></i>
            <span data-id="8qrva13ne" data-path="components/ConversionOptions.js">Format: {options.format.toUpperCase()}</span>
          </li>
          <li className="flex items-center" data-id="2hivhye0c" data-path="components/ConversionOptions.js">
            <i className="fas fa-info-circle text-blue-500 mr-2" data-id="75xefynje" data-path="components/ConversionOptions.js"></i>
            <span data-id="hv8viuxl2" data-path="components/ConversionOptions.js">Resolution: {options.dpi} DPI</span>
          </li>
          <li className="flex items-center" data-id="omp9hsq8l" data-path="components/ConversionOptions.js">
            <i className="fas fa-info-circle text-blue-500 mr-2" data-id="2nbr3dh2h" data-path="components/ConversionOptions.js"></i>
            <span data-id="qfvarxtiz" data-path="components/ConversionOptions.js">
              Pages: {options.selectedPages === 'all' ?
              `All ${pageCount} pages` :
              options.selectedPages}
            </span>
          </li>
        </ul>
      </div>
    </div>);

};