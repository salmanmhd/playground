import { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AddressToPdf() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setAddresses(data);
      } catch (error) {
        alert('Invalid JSON file. Please check the format and try again.');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      { name: '', address: '', pin: '', mobile: '' },
    ]);
  };

  const removeAddress = (index) => {
    const updated = [...addresses];
    updated.splice(index, 1);
    setAddresses(updated);
  };

  const updateAddress = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const generatePDF = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const doc = new jsPDF();
        let x = 10,
          y = 10;
        const boxWidth = 90;
        const boxHeight = 70; // Further increased height
        const marginLeft = 5;
        const lineHeight = 6;

        // Add title to the PDF
        doc.setFontSize(16);
        doc.text('Address Labels', 105, 15, { align: 'center' });
        doc.setFontSize(10);

        // Start the address boxes below the title
        y = 25;

        addresses.forEach((addr, i) => {
          if (i % 3 === 0 && i !== 0) {
            x = 10;
            y += boxHeight + 10;
          }

          if (i % 9 === 0 && i !== 0) {
            doc.addPage();
            doc.setFontSize(16);
            doc.text('Address Labels', 105, 15, { align: 'center' });
            doc.setFontSize(10);
            x = 10;
            y = 25;
          }

          // Draw box with slightly rounded corners
          doc.setDrawColor(100, 100, 100);
          doc.roundedRect(x, y, boxWidth, boxHeight, 2, 2);

          // Calculate text positions
          let textY = y + 10;

          // To
          doc.setFont(undefined, 'normal');
          doc.text(`To,`, x + marginLeft, textY);
          textY += lineHeight;

          // Name - make it bold
          doc.setFont(undefined, 'bold');
          doc.text(`${addr.name || '[Name]'}`, x + marginLeft, textY);
          doc.setFont(undefined, 'normal');
          textY += lineHeight + 2;

          // Address - with proper wrapping and spacing
          const addressText = addr.address || '[Address]';
          const addressLines = doc.splitTextToSize(addressText, boxWidth - 10);

          // Limit to max 5 lines for address to avoid overflow
          const limitedAddressLines = addressLines.slice(0, 5);
          doc.text(limitedAddressLines, x + marginLeft, textY);

          // Adjust spacing based on actual number of address lines
          textY += lineHeight * limitedAddressLines.length + 4;

          // Pin
          doc.text(`PIN: ${addr.pin || '______'}`, x + marginLeft, textY);
          textY += lineHeight + 2;

          // Mobile
          doc.text(
            `Mobile: ${addr.mobile || '___________'}`,
            x + marginLeft,
            textY
          );

          // Add label number at bottom right corner
          doc.setFontSize(7);
          doc.text(`#${i + 1}`, x + boxWidth - 5, y + boxHeight - 3, {
            align: 'right',
          });
          doc.setFontSize(10);

          x += 100;
        });

        // Generate the PDF
        const pdfOutput = doc.output('datauristring');
        setPreview(pdfOutput);
        doc.save('addresses.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 100);
  };

  return (
    <div className='p-6 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-sm'>
      <h1 className='text-2xl font-bold mb-6 text-gray-800'>
        Address Label Generator
      </h1>

      <div className='flex flex-wrap gap-4 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Import Addresses
          </label>
          <input
            type='file'
            accept='.json'
            onChange={handleFileUpload}
            className='block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100'
          />
        </div>

        <button
          onClick={addAddress}
          className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                     transition-colors flex items-center space-x-1'
        >
          <span>+ Add Address</span>
        </button>

        <button
          onClick={generatePDF}
          disabled={addresses.length === 0 || loading}
          className={`px-4 py-2 rounded-md transition-colors flex items-center space-x-1
                    ${
                      addresses.length === 0 || loading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
        >
          <span>{loading ? 'Generating...' : 'Export to PDF'}</span>
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
          {addresses.map((addr, index) => (
            <div
              key={index}
              className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm h-72'
            >
              <div className='flex justify-between items-center mb-3'>
                <h3 className='text-sm font-medium text-gray-500'>
                  Address #{index + 1}
                </h3>
                <button
                  onClick={() => removeAddress(index)}
                  className='text-red-500 hover:text-red-700 text-sm'
                >
                  Remove
                </button>
              </div>

              <div className='flex flex-col h-full space-y-3'>
                <div>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    Name
                  </label>
                  <input
                    type='text'
                    placeholder='Name'
                    value={addr.name}
                    onChange={(e) =>
                      updateAddress(index, 'name', e.target.value)
                    }
                    className='w-full text-gray-900 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div className='flex-grow'>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    Address
                  </label>
                  <textarea
                    placeholder='Address'
                    value={addr.address}
                    onChange={(e) =>
                      updateAddress(index, 'address', e.target.value)
                    }
                    className='w-full h-24 text-gray-900 border border-gray-300 rounded-md p-2 text-sm resize-none focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    PIN Code
                  </label>
                  <input
                    type='text'
                    placeholder='PIN Code'
                    value={addr.pin}
                    onChange={(e) =>
                      updateAddress(index, 'pin', e.target.value)
                    }
                    className='w-full text-gray-900 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label className='block text-xs font-medium text-gray-500 mb-1'>
                    Mobile Number
                  </label>
                  <input
                    type='text'
                    placeholder='Mobile Number'
                    value={addr.mobile}
                    onChange={(e) =>
                      updateAddress(index, 'mobile', e.target.value)
                    }
                    className='w-full text-gray-900 border border-gray-300 rounded-md p-2 text-sm focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12 bg-white rounded-lg border border-dashed border-gray-300'>
          <p className='text-gray-500'>
            No addresses yet. Import a JSON file or click "Add Address" to get
            started.
          </p>
        </div>
      )}

      {preview && (
        <div className='mt-6 p-4 border rounded-lg bg-white'>
          <h2 className='text-lg font-medium mb-3'>PDF Preview</h2>
          <div className='border rounded overflow-hidden'>
            <iframe
              src={preview}
              width='100%'
              height='500'
              className='border-0'
              title='PDF Preview'
            />
          </div>
        </div>
      )}
    </div>
  );
}
