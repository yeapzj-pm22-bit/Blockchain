import React,{ useEffect, useRef,useState } from 'react';
import { Table, Input, Button, Space,Tag  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link,useNavigate  } from 'react-router-dom';
import { Modal, Button2 } from 'react-bootstrap';
import Select from 'react-select';




const dispenseRecords = [
  {
    id: 'D001',
    patientName: 'John Doe',
    medicines: [
      { name: 'Amoxicillin', quantity: 15 },
      { name: 'Paracetamol', quantity: 10 },
    ],
    status: 'Active',
  },
  {
    id: 'D002',
    patientName: 'Jane Smith',
    medicines: [
      { name: 'Ibuprofen', quantity: 20 },
    ],
    status: 'Completed',
  },
];

const transformedData = dispenseRecords.flatMap((record) =>
  record.medicines.map((med, index) => ({
    key: `${record.id}-${index}`,
    dispenseId: record.id,
    patientName: record.patientName,
    medicineName: med.name,
    quantity: med.quantity,
    status: record.status,
    isFirst: index === 0,
    span: record.medicines.length,
  }))
);

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
    const handleReset = () => {
      clearFilters();
      confirm({ closeDropdown: true });
    };

    return (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button type="default" onClick={() => handleReset(clearFilters, confirm)} size="small">
            Reset
          </Button>
        </Space>
      </div>
    );
  },
  filterIcon: (filtered) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
});





const DispenseList = () => {
    const tableRef = useRef();
    const [selectedMedicationName, setSelectedMedicationName] = useState('Paracetamol');
    const [requestedQuantity, setRequestedQuantity] = useState('');
    const [expectedExpiryDate, setExpectedExpiryDate] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [showModal2, setShowModal2] = useState(false);
    const navigate = useNavigate();
    const [selectedPatient, setSelectedPatient] = useState(null); // contains name & medicine list
    const [selectedMedicineIds, setSelectedMedicineIds] = useState([]);

    const columns = [
  {
    title: 'Dispense ID',
    dataIndex: 'dispenseId',
    sorter: (a, b) => a.dispenseId.localeCompare(b.dispenseId),
    render: (_, row) => ({
      children: row.dispenseId,
      props: {
        rowSpan: row.isFirst ? row.span : 0,
      },
    }),
    ...getColumnSearchProps('dispenseId'),
  },
  {
    title: 'Patient Name',
    dataIndex: 'patientName',
    render: (_, row) => ({
      children: row.patientName,
      props: {
        rowSpan: row.isFirst ? row.span : 0,
      },
    }),
    ...getColumnSearchProps('patientName'),
  },
  {
    title: 'Medicine Name',
    dataIndex: 'medicineName',
    ...getColumnSearchProps('medicineName'),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Completed', value: 'Completed' },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      const color =
        status === 'Active'
          ? 'processing'
          : status === 'Completed'
          ? 'success'
          : 'default';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (_, row) => ({
      children: (
        <Button size="small" type="link" onClick={() => handleOpenDispenseModal(row)}>
                View
              </Button>
      ),
      props: {
        rowSpan: row.isFirst ? row.span : 0,
      },
    }),
  },
];

const handleOpenDispenseModal = (row) => {
  // Group all medicines for this dispenseId
  const patientMedicines = transformedData.filter(item => item.dispenseId === row.dispenseId);

  setSelectedPatient({
    name: row.patientName,
    dispenseId: row.dispenseId,
    medicines: patientMedicines.map(med => ({
      name: med.medicineName,
      quantity: med.quantity
    })),
  });

  setSelectedMedicineIds([]);  // Reset checkbox selection
  setShowModal2(true);
};

const handleMedicineToggle = (medId) => {
  setSelectedMedicineIds((prev) =>
    prev.includes(medId)
      ? prev.filter((id) => id !== medId)
      : [...prev, medId]
  );
};

 const handleDispenseSubmit = () => {
   // Handle form submission logic here (validation, API, etc.)

   // Then close the modal
   setShowModal2(false);
 };

const handleMedicineCheckbox = (medName) => {
  setSelectedMedicineIds((prev) =>
    prev.includes(medName)
      ? prev.filter((name) => name !== medName)
      : [...prev, medName]
  );
};

  return (
    <>
      <div className="container-fluid">
            <div className="row column_title">
               <div className="col-md-12">
                  <div className="page_title" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h2 style={{ margin: 0 }}>Dispense List</h2>
                  </div>

               </div>
            </div>



    <div className="main_content_iner ">
        <div className="container-fluid p-0">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="white_card card_height_100 mb_30">
                        <div className="white_card_header">
                            <div className="box_header m-0">
                                <div className="main-title">
                                </div>
                            </div>
                        </div>
                        <div className="white_card_body">
                            <div className="QA_section">
                                <div className="white_box_tittle list_header">

                                   <div className="box_right d-flex lms_block" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>

                                    </div>
                                </div>

                                <div className="QA_table mb_30">

                                   <Table
                                     columns={columns}
                                     dataSource={transformedData}
                                     pagination={{ pageSize: 5 }}
                                     bordered
                                   />

                                    <Modal show={showModal2} onHide={() => setShowModal2(false)}>
                                      <Modal.Header closeButton>
                                        <Modal.Title>Dispense Details</Modal.Title>
                                      </Modal.Header>

                                      <Modal.Body>
                                        <p><strong>Patient Name:</strong> {selectedPatient?.name}</p>
                                        <p><strong>Dispense ID:</strong> {selectedPatient?.dispenseId}</p>

                                        <div className="mb-3">
                                          <label className="form-label">Medicines</label>
                                          {selectedPatient?.medicines?.map((med, index) => (
                                            <div key={index} className="form-check">
                                              <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`med-${index}`}
                                                checked={selectedMedicineIds.includes(med.name)}
                                                onChange={() => handleMedicineCheckbox(med.name)}
                                              />
                                              <label className="form-check-label" htmlFor={`med-${index}`}>
                                                {med.name} ({med.quantity})
                                              </label>
                                            </div>
                                          ))}
                                        </div>
                                      </Modal.Body>

                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal2(false)}>
                                          Close
                                        </Button>
                                        <Button variant="primary" onClick={handleDispenseSubmit}>
                                          Submit
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>





      </div>
    </>
  );
};

export default DispenseList;