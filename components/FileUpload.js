const FileUpload = ({ onFileChange, currentFile }) => {
  const [dragActive, setDragActive] = React.useState(false);
  const fileInputRef = React.useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        onFileChange(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        onFileChange(file);
      } else {
        alert("Please upload a PDF file");
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full" data-id="9adsw7iep" data-path="components/FileUpload.js">
      <div
        className={`file-drop-zone w-full p-6 rounded-lg text-center cursor-pointer ${
        dragActive ? 'active' : ''} ${
        currentFile ? 'bg-blue-50' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={currentFile ? null : handleButtonClick} data-id="g00jsb6su" data-path="components/FileUpload.js">

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange} data-id="yz67q6mel" data-path="components/FileUpload.js" />

        
        {currentFile ?
        <div className="flex flex-col items-center" data-id="mln3yf6uu" data-path="components/FileUpload.js">
            <div className="bg-blue-100 rounded-full p-3 mb-3" data-id="pvuea0syj" data-path="components/FileUpload.js">
              <i className="fas fa-file-pdf text-red-600 text-3xl" data-id="xqu45k02u" data-path="components/FileUpload.js"></i>
            </div>
            <p className="text-lg font-medium mb-1 truncate max-w-full" data-id="ss5iw9kdj" data-path="components/FileUpload.js">{currentFile.name}</p>
            <p className="text-sm text-gray-500 mb-3" data-id="iiqopxmod" data-path="components/FileUpload.js">
              {(currentFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm flex items-center"
            onClick={handleRemoveFile} data-id="kfknze7hs" data-path="components/FileUpload.js">

              <i className="fas fa-trash mr-2" data-id="tjhjvpdl2" data-path="components/FileUpload.js"></i> Remove File
            </button>
          </div> :

        <div className="flex flex-col items-center" data-id="7shi32ovs" data-path="components/FileUpload.js">
            <div className="bg-blue-100 rounded-full p-3 mb-3" data-id="waqxtmgzp" data-path="components/FileUpload.js">
              <i className="fas fa-file-upload text-blue-600 text-3xl" data-id="2ey68z1fk" data-path="components/FileUpload.js"></i>
            </div>
            <p className="text-lg font-medium mb-1" data-id="stiazzmm9" data-path="components/FileUpload.js">Drop your PDF file here</p>
            <p className="text-sm text-gray-500 mb-3" data-id="sp1suouel" data-path="components/FileUpload.js">or click to browse</p>
            <p className="text-xs text-gray-400" data-id="dmpwknmy2" data-path="components/FileUpload.js">Maximum file size: 100MB</p>
          </div>
        }
      </div>
    </div>);

};