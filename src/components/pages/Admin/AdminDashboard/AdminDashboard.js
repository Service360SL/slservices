import React, { useState,useEffect } from 'react';
import { Card, Table, Modal, Form, Button } from "react-bootstrap";
import BgImage from '../../../../assets/images/header/Background.png';
import BgImage2 from '../../../../assets/images/header/footer.png';
import PopupBgImage from '../../../../assets/images/header/popupBg.png';
import '../../../../style/Admin/AdminDashboard.css';
import { BarChart, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, } from 'recharts';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';
import axios from 'axios';

import person1 from '../../../../assets/images/home/Customer_1.png';
import person2 from '../../../../assets/images/home/Customer_2.png';
import person3 from '../../../../assets/images/home/Customer_3.png';
import person4 from '../../../../assets/images/home/Customer_4.jpg';
import { set } from 'lodash';

const serverLink = 'http://localhost:8080';

const generateRevenueData = () => {

  const data = [];
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  for (let i = 0; i < 7; i++) {
    data.push({ day: days[i], revenue: Math.floor(Math.random() * 1000) });
  }
  return data;
};

const generateMonthlyRevenueData = () => {
  const data = [];
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  for (let i = 0; i < getLastDayOfMonth(lastMonth); i++) {
    data.push({ day: i.toString(), revenue: Math.floor(Math.random() * 10000) });
    console.log(i.toString());
  }
  return data;
};


const getLastDayOfMonth = (date) => {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(0);
  return nextMonth.getDate();
};

const generateDailyData = () => {
  const data = [];
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  for (let i = 0; i < getLastDayOfMonth(lastMonth); i++) {
    data.push({ day: i.toString(), customers: Math.floor(Math.random() * 100) });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (let i = 0; i < 12; i++) {
    data.push({ month: months[i], customers: Math.floor(Math.random() * 1000) });
  }
  return data;
};

const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-end;
    `;

const AdminDashboard = () => {

  const [customerCount, setCustomerCount] = useState(0);
  const [serviceProviderCount, setServiceProviderCount] = useState(0);
  const [advertiserCount, setAdvertiserCount] = useState(0);
  const [customerCountForLast7Days,setCustomerCountForLast7Days] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(serverLink + '/auth/api/getTotalCustomers');
        const customerCount = response1.data;
        setCustomerCount(customerCount);

        const response2 = await axios.get(serverLink + '/auth/api/getTotalServiceProviders');
        const serviceProviderCount = response2.data;
        setServiceProviderCount(serviceProviderCount);

        const response3 = await axios.get(serverLink + '/auth/api/getTotalAdvertisers');
        const advertiserCount = response3.data;
        setAdvertiserCount(advertiserCount);

        const response4 = await axios.get(serverLink + '/auth/api/getCustomerCountForLast7Days');
        const customerCountForLast7 = response4.data;
        setCustomerCountForLast7Days(customerCountForLast7)

        console.log(customerCountForLast7)

      }
      catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const TopServiceProvidersData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      nic: '123456789V',
      contactNumber: '0123456789',
      email: 'john.doe@example.com',
      address: '123 Main Street, City',
      registeredDate: '2023-08-01',
      service: 'Carpentry',
      category: 'Interior Works',
      image: person1,
      status: 'Pending',
      numOfProjects: 20,
      uploadedFiles: [
        { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
        { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
      ],
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      nic: '987654321V',
      contactNumber: '0987654321',
      email: 'jane.smith@example.com',
      address: '456 Oak Avenue, Town',
      registeredDate: '2023-08-02',
      service: 'AC Repair',
      category: 'Electrical & Plumbing',
      image: person2,
      status: 'Accepted',
      numOfProjects: 15,
      uploadedFiles: [
        { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
        { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
      ],
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      nic: '456123789V',
      contactNumber: '0456123789',
      email: 'mike.johnson@example.com',
      address: '789 Maple Lane, Village',
      registeredDate: '2023-08-03',
      service: 'Masonry',
      category: 'Construction',
      image: person3,
      status: 'Rejected',
      numOfProjects: 12,
      uploadedFiles: [
        { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
        { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
      ],
    },
    {
      id: 4,
      firstName: 'De',
      lastName: 'Silva',
      nic: '789123456V',
      contactNumber: '0789123456',
      email: 'de.silva@example.com',
      address: '101 Pine Street, City',
      registeredDate: '2023-08-04',
      service: 'CCTV Repair',
      category: 'Security',
      image: person4,
      status: 'Pending',
      numOfProjects: 10,
      uploadedFiles: [
        { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
        { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
      ],
    },
  ];

  const [datas, setDatas] = useState({
    showModal: false,
    showDetailsModal: false,
    selectedProvider: null,
    enable: true,

  });

  const [view, setView] = useState('daily');
  const [revenueView, setRevenueView] = useState('last7days');
  const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
  const [data, setData] = useState({ fromDate: null, toDate: null });
  const [selectedOption, setSelectedOption] = useState('weekly');

  const handleActionButtonClick = (provider) => {
    setData({ ...data, selectedProvider: provider, showDetailsModal: true });
  };

  const advertisementDataWeekly = [
    { category: 'Spare parts', value: 120 },
    { category: 'Tools', value: 200 },
    { category: 'Equipment', value: 150 },
    { category: 'Others', value: 80 },
  ];

  const advertisementDataMonthly = [
    { category: 'Spare parts', value: 220 },
    { category: 'Tools', value: 180 },
    { category: 'Equipment', value: 250 },
    { category: 'Others', value: 120 },
  ];


  const chartDataToShow = view === 'daily' ? generateDailyData() : generateMonthlyData();
  const dataToShow = selectedOption === 'weekly' ? advertisementDataWeekly : advertisementDataMonthly;
  const revenueData = revenueView === 'last7days' ? generateRevenueData() : generateMonthlyRevenueData();

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRevenueViewChange = (e) => {
    setRevenueView(e.target.value);
  };

  const COLORS = ['#8884d8', '#1f285a', '#687699', '#292D32'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const chartData = view === 'daily' ? generateDailyData() : generateMonthlyData();

  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((item) => item.customers));
    const dataMin = Math.min(...chartData.map((item) => item.customers));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const colorGradient = () => (
    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset={gradientOffset()} stopColor="#687699" />
      <stop offset={gradientOffset()} stopColor="#687699" />
    </linearGradient>
  );

  const renderActiveDot = (props) => {
    const { cx, cy, stroke, key } = props;

    return (
      <g key={key}>
        <circle cx={cx} cy={cy} r={3} stroke={stroke} fill="#8884d8" />
      </g>
    );
  };

  return (
    <div>
      <section className="block dashboard-block" style={{ backgroundImage: `url(${BgImage})` }}>

        <div className="dashboard-container align-items-center justify-content-center w-100" style={{ backgroundImage: `url(${BgImage})` }}>

          <div className="d-flex justify-content-between w-100">
            <h2 className="chart-title mb-4 ms-5 fs-3">Customer Analytics</h2>
            <div className='col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-2 m-3 me-xs-5  align-items-end'>
              <div className="input-group">
                <select value={view} onChange={handleViewChange} className="form-select">
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartDataToShow}>
              <defs>{colorGradient()}</defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={view === 'daily' ? 'day' : 'month'} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} strokeWidth={0.1} />
              <Tooltip />
              <Legend />
              <Bar dataKey="customers" fill="url(#colorGradient)" barSize={15} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="row mt-4 d-flex w-100 mb-4">
          <div className="col-sm-6 col-lg-3 d-flex justify-content-center mt-2 ">
            <Card style={{ backgroundImage: `url(${BgImage})` }}>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='fs-5'>Total Customers</span>
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <Card.Body className='d-flex justify-content-between'>
                <h1 className="card-title mt-2">{customerCount}</h1>
                <p className="card-text d-flex justify-content-end align-items-end">
                  <span className="text-success flex-end">↑ 10%</span>
                </p>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-6 col-lg-3 d-flex justify-content-center mt-2">
            <Card style={{ backgroundImage: `url(${BgImage})` }}>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='fs-5'>Total Service Providers</span>
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <Card.Body className='d-flex justify-content-between'>
                <h1 className="card-title mt-2">{serviceProviderCount}</h1>
                <p className="card-text d-flex justify-content-end align-items-end">
                  <span className="text-danger">↓ 5%</span>
                </p>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-6 col-lg-3 d-flex justify-content-center mt-2">
            <Card style={{ backgroundImage: `url(${BgImage})` }}>
              <div className='d-flex justify-content-between align-items-center w-100'>
                <span className='fs-5'>Total Advertisers</span>
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <Card.Body className='d-flex justify-content-between'>
                <h1 className="card-title mt-2">{advertiserCount}</h1>
                <p className="card-text d-flex justify-content-end align-items-end">
                  <span className="text-success">↑ 15%</span>
                </p>
              </Card.Body>
            </Card>
          </div>

          <div className="col-sm-6 col-lg-3 d-flex justify-content-center mt-2 ">
            <Card style={{ backgroundImage: `url(${BgImage})` }}>
              <div className="d-flex justify-content-between align-items-center w-100">
                <span className='fs-5'>Active Now</span>
                <i className="bi bi-three-dots-vertical"></i>
              </div>
              <Card.Body className='d-flex justify-content-between'>
                <h1 className="card-title mt-2">500</h1>
                <div className="active-users-profile-pics d-flex justify-content-end align-items-end" >
                  <img src={person1} alt="Person 1" className="rounded-circle profile-pic " style={{ width: '15px', height: '15px' }} />
                  <img src={person2} alt="Person 2" className="rounded-circle profile-pic " style={{ width: '15px', height: '15px' }} />
                  <img src={person3} alt="Person 3" className="rounded-circle profile-pic " style={{ width: '15px', height: '15px' }} />
                  <img src={person2} alt="Person 2" className="rounded-circle profile-pic " style={{ width: '15px', height: '15px' }} />
                  <img src={person3} alt="Person 3" className="rounded-circle profile-pic " style={{ width: '15px', height: '15px' }} />
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="row w-100 mb-1">

          <div className="col-xs-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
            <Card style={{ backgroundImage: `url(${BgImage2})`, flex: 1 }} >
              <div className="d-flex justify-content-between w-100 align-items-center">
                <h3 className="chart-title ms-3 fs-3 align-items-center mb-0">Top Service Providers</h3>
              </div>

              <Card.Body className="d-flex justify-content-between w-100 align-items-center table-responsive" >
                <Table className="custom-table-style">
                  <thead className='text-center'>
                    <tr>
                      <th>Image</th>
                      <th>Service Category</th>
                      <th>Service</th>
                      <th>No of projects</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {TopServiceProvidersData.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center"><img src={item.image}
                          alt={item.firstName}
                          className='rounded'
                          style={{ width: '50px', height: '50px' }}
                        /></td>
                        <td className="text-center">{item.category}</td>
                        <td className="text-center">{item.service}</td>
                        <td className="text-center">{item.numOfProjects}</td>
                        <td className="text-center">
                          <i className="bi bi-info-circle-fill fs-4" onClick={() => handleActionButtonClick(item)} ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-6 d-flex justify-content-center d-none d-lg-block">
            <Card style={{ backgroundImage: `url(${BgImage})`, flex: 1 }}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <h3 className="chart-title ms-3 fs-3 align-items-center mb-0">Advertisements Analytics</h3>
                <div className="col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-3 m-3 me-xs-5">
                  <div className="input-group">
                    <select className="form-select" value={selectedOption} onChange={handleOptionChange}>
                      <option value="weekly">Last Week</option>
                      <option value="monthly">Last Month</option>
                    </select>
                  </div>
                </div>
              </div>

              <Card.Body className='pieChartContainerClass'>
                <ResponsiveContainer width="100%" height='100%'>
                  <PieChart>
                    <Pie
                      data={dataToShow}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      isAnimationActive={true}
                    >
                      {dataToShow.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      formatter={(value, entry) => `${entry.payload.category}`}
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="dashboard-container align-items-center justify-content-center w-100 mt-4" style={{ backgroundImage: `url(${BgImage})` }}>

          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="d-flex align-items-center">
              <h3 className="chart-title ms-3 fs-3 align-items-center mb-0">Revenue</h3>
            </div>
            <div className='col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-3 m-3 me-xs-5' style={{ backgroundColor: '' }}>
              <div className="input-group">
                <select value={revenueView} onChange={handleRevenueViewChange} className="form-select">
                  <option value="last7days">Last 7 days</option>
                  <option value="lastmonth">Last Month</option>
                </select>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#687699" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey={revenueView === 'last7days' ? 'day' : 'day'} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} strokeWidth={0.1} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#687699" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" dot={renderActiveDot} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
          <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
            <Modal.Title>Service Provider Details</Modal.Title>
          </Modal.Header>
          {data.selectedProvider && (
            <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex justify-content-start">
                    <img src={data.selectedProvider.image} alt="Service Provider" className="rounded-circle" width="100" height="100" />
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Service Provider ID: </span> SP0{data.selectedProvider.id}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>First Name: </span> {data.selectedProvider.firstName}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Last Name: </span> {data.selectedProvider.lastName}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>NIC: </span> {data.selectedProvider.nic}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Email: </span> {data.selectedProvider.email}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Address: </span> {data.selectedProvider.address}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Registered Date: </span> {data.selectedProvider.registeredDate}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Service: </span> {data.selectedProvider.service}
                  </div>
                  <div className="mt-2 bordered-paragraph rounded">
                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Category:</span> {data.selectedProvider.category}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 " style={{ marginTop: '100px' }}>
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h6 className="text-center">Certificates And Documents</h6>
                    </div>
                    <ul className="list-unstyled">
                      {data.selectedProvider.uploadedFiles.map((file, index) => (
                        <li key={index}>
                          <div className="d-flex align-items-center mb-2 p-2 rounded hover-effect" style={{ backgroundColor: "#ccc" }}>
                            <i className="bi bi-file-earmark-arrow-down-fill me-2 fs-4"></i>
                            <a href={file.url} download className="text-decoration-none text-dark fw-bold">
                              {file.fileName}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Modal.Body>
          )}
          <StyledModalFooter>
            <>

              <Form.Check
                type="radio"
                name="enableDisableRadio"
                id="enableRadio"
                label="Enable"
                checked={data.enable}
                onChange={() => setData({ ...data, enable: true })}
                className='ms-0 me-1 custom-radio'
              />
              <Form.Check
                type="radio"
                name="enableDisableRadio"
                id="disableRadio"
                label="Disable"
                checked={!data.enable}
                onChange={() => setData({ ...data, enable: false })}
                className='ms-0 me-5 custom-radio'
              />

            </>
            <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
              <Button className="btn-effect3 me-2" onClick={() => setData({ ...data, showDetailsModal: false })}>
                Cancel
              </Button>
              <Button type="submit" className="btn-effect" >
                More Info
              </Button>
            </div>
          </StyledModalFooter>

        </Modal>

      </section>
    </div>
  );
};

export default AdminDashboard;