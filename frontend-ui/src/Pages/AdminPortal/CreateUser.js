import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Select from 'react-select';

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#ced4da',
    color: 'black',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
  input: (provided) => ({
    ...provided,
    color: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // To ensure dropdown shows above modals if any
  }),
};
const roleOptions = [
  { value: 'doctor', label: 'Doctor' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'nurse', label: 'Nurse' },
  { value: 'patient', label: 'Patient' },
];
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const CreateUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState(null);
  return (
    <div className="container-fluid">
      <div className="row column_title">
        <div className="col-md-12">
          <div className="page_title">
            <h2>Create New User</h2>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <form className="p-4 border rounded shadow bg-white">
          <div className="row g-3">
            {/* Role */}
            <div className="col-md-6">
              <label className="form-label">Role</label>
              <Select
                styles={customStyles}
                options={roleOptions}
                value={role}
                onChange={(selected) => setRole(selected)}
                placeholder="-- Select Role --"
              />
            </div>

            {/* Doctor only: Expertise */}
            {role?.value === 'doctor' && (
              <div className="col-md-6">
                <label className="form-label">Expertise</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Cardiologist"
                />
              </div>
            )}

            {/* First Name */}
            <div className="col-md-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
              />
            </div>

            {/* Last Name */}
            <div className="col-md-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label">Gender</label>
              <Select
                styles={customStyles}
                options={genderOptions}
                value={gender}
                onChange={(selected) => setGender(selected)}
                placeholder="-- Select Gender --"
              />
            </div>

            {/* Birth Date */}
            <div className="col-md-6">
              <label className="form-label">Birth Date</label>
              <input type="date" className="form-control" />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter password"
                />
                <span
                  className="position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-md-6">
              <label className="form-label">Confirm Password</label>
              <div className="position-relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Confirm password"
                />
                <span
                  className="position-absolute"
                  style={{
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="text-end mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
