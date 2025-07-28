import React, { useState } from 'react';
import Select from 'react-select';
const medicationOptions = [
  { value: 'paracetamol', label: 'Paracetamol 500mg Tablet' },
  { value: 'amoxicillin', label: 'Amoxicillin 250mg Capsule' },
  { value: 'ibuprofen', label: 'Ibuprofen 200mg Tablet' },
  { value: 'metformin', label: 'Metformin 500mg Tablet' },
];
const customSelectStyles = {
  control: (base) => ({
    ...base,
    color: 'black',
  }),
  singleValue: (base) => ({
    ...base,
    color: 'black',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    color: 'black',
    backgroundColor: isSelected
      ? '#e6e6e6'
      : isFocused
      ? '#f2f2f2'
      : 'white',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#999', // Optional: grey placeholder
  }),
  input: (base) => ({
    ...base,
    color: 'black',
  }),
};

const Inventory = () => {
const [selectedMedication, setSelectedMedication] = useState(null);
const [quantity, setQuantity] = useState('');
const [expiryDate, setExpiryDate] = useState('');
const [supplierName, setSupplierName] = useState('');


  return (
    <div className="container-fluid">
      <div className="row column_title">
        <div className="col-md-12">
          <div className="page_title">
            <h2>Create New Inventory Order</h2>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <form className="p-4 border rounded shadow bg-white">
          <div className="row g-3">
            {/* Medication (React Select) */}
            <div className="col-md-6">
              <label className="form-label">Medication</label>
              <Select
                options={medicationOptions}
                value={selectedMedication}
                onChange={setSelectedMedication}
                placeholder="-- Select Medication --"
                styles={customSelectStyles}
              />
            </div>

            {/* Quantity to Order */}
            <div className="col-md-6">
              <label className="form-label">Quantity to Order</label>
              <input
                type="number"
                className="form-control"
                min="1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            {/* Expected Expiry Date */}
            <div className="col-md-6">
              <label className="form-label">Expected Expiry Date</label>
              <input
                type="date"
                className="form-control"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>

            {/* Supplier Name */}
            <div className="col-md-6">
              <label className="form-label">Supplier Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter supplier name"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
