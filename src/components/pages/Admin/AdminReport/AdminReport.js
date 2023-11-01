import React, { useState, useEffect } from 'react';
import { Card, Table, Modal, Button, Container } from "react-bootstrap";
import BgImage from '../../../../assets/images/header/Background.png';
import '../../../../style/Admin/AdminDashboard.css';
import { BarChart, Bar, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';

import person1 from '../../../../assets/images/home/Customer_1.png';
import person2 from '../../../../assets/images/home/Customer_2.png';
import person3 from '../../../../assets/images/home/Customer_3.png';
import person4 from '../../../../assets/images/home/Customer_4.jpg';
import person5 from '../../../../assets/images/home/Customer_5.jpg';
import person6 from '../../../../assets/images/home/Customer_6.jpg';
import person7 from '../../../../assets/images/home/Customer_7.jpg';
import person8 from '../../../../assets/images/home/Customer_8.jpg';
import person9 from '../../../../assets/images/home/Customer_9.jpg';

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

const AdminReport = () => {

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
    const complaintData = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            nic: '123456789V',
            contactNumber: '0123456789',
            email: 'john.doe@example.com',
            address: '123 Main Street, City',
            complaintDate: '2023-08-01',
            image: person1,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
            complaint: 'Issue with account registration process',
            description: 'I registered on July 1st, but my account status is still pending. Can you please check and update my status?',
            closedDate: '2023-08-04',

        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            nic: '987654321V',
            contactNumber: '0987654321',
            email: 'jane.smith@example.com',
            address: '456 Oak Avenue, Town',
            complaintDate: '2023-08-02',
            image: person2,
            status: 'Resolved',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
            complaint: 'Missing uploaded files.',
            description: 'I uploaded the required files on July 2nd, but they are not showing up in my account. Please resolve this issue.',
            closedDate: '2023-08-05',
        },
        {
            id: 3,
            firstName: 'Mike',
            lastName: 'Johnson',
            nic: '456123789V',
            contactNumber: '0456123789',
            email: 'mike.johnson@example.com',
            address: '789 Maple Lane, Village',
            complaintDate: '2023-08-03',
            image: person3,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
            complaint: 'Incorrect contact number.',
            description: 'I entered my contact number as 0456123789, but it is showing up as 0456123788. Please correct this.',
            closedDate: '2023-08-06',
        },
        {
            id: 4,
            firstName: 'De',
            lastName: 'Silva',
            nic: '789123456V',
            contactNumber: '0789123456',
            email: 'de.silva@example.com',
            address: '101 Pine Street, City',
            complaintDate: '2023-08-05',
            image: person2,
            status: 'Resolved',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
            complaint: 'Unresolved issue with account status.',
            description: `My account status is showing as "Resolved," but I haven't received any resolution for my previous complaint.Please look into it.`,
            closedDate: '2023-08-07',
        },
        {
            id: 5,
            firstName: 'Kumar',
            lastName: 'Sangakkara',
            nic: '654987321V',
            contactNumber: '0654987321',
            email: 'kumar.sangakkara@example.com',
            address: '222 Oak Road, Town',
            complaintDate: '2023-08-05',
            image: person3,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
            complaint: 'Email verification problem.',
            description: `I registered with my email (kumar.sangakkara@example.com) on July 5th, but I haven't received any verification email. Can you resend it?`,
            closedDate: '2023-08-08',
        },
        {
            id: 6,
            firstName: 'Mike',
            lastName: 'Johnson',
            nic: '789654123V',
            contactNumber: '0789654123',
            email: 'mike.johnson@example.com',
            address: '333 Maple Street, Village',
            registeredDate: '2023-08-06',
            service: 'Painting',
            category: 'Interior Works',
            image: person1,
            status: 'Rejected',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 7,
            firstName: 'Saman',
            lastName: 'Perera',
            nic: '321456789V',
            contactNumber: '0321456789',
            email: 'saman.perera@example.com',
            address: '444 Pine Avenue, City',
            registeredDate: '2023-08-07',
            service: 'Electrical Wiring',
            category: 'Electrical & Plumbing',
            image: person4,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 8,
            firstName: 'Susantha',
            lastName: 'Villergers',
            nic: '987654321V',
            contactNumber: '0987654321',
            email: 'susantha.villergers@example.com',
            address: '555 Oak Lane, Town',
            registeredDate: '2023-08-08',
            service: 'Tiles Fitting',
            category: 'Construction',
            image: person5,
            status: 'Accepted',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 9,
            firstName: 'William',
            lastName: 'Wiliamson',
            nic: '654321789V',
            contactNumber: '0654321789',
            email: 'william.wiliamson@example.com',
            address: '666 Maple Road, Village',
            registeredDate: '2023-08-09',
            service: 'Fire Alarm',
            category: 'Security',
            image: person6,
            status: 'Rejected',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 10,
            firstName: 'Johnes',
            lastName: 'Doe',
            nic: '123456789V',
            contactNumber: '0123456789',
            email: 'john.doe@example.com',
            address: '777 Main Street, City',
            registeredDate: '2023-08-10',
            service: 'Carpentry',
            category: 'Interior Works',
            image: person1,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 11,
            firstName: 'Jane',
            lastName: 'Smith',
            nic: '987654321V',
            contactNumber: '0987654321',
            email: 'jane.smith@example.com',
            address: '888 Oak Avenue, Town',
            registeredDate: '2023-08-11',
            service: 'AC Repair',
            category: 'Electrical & Plumbing',
            image: person2,
            status: 'Accepted',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 12,
            firstName: 'Mike',
            lastName: 'Johnson',
            nic: '456123789V',
            contactNumber: '0456123789',
            email: 'mike.johnson@example.com',
            address: '999 Maple Lane, Village',
            registeredDate: '2023-08-12',
            service: 'Masonry',
            category: 'Construction',
            image: person3,
            status: 'Rejected',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 13,
            firstName: 'De',
            lastName: 'Silva',
            nic: '789123456V',
            contactNumber: '0789123456',
            email: 'de.silva@example.com',
            address: '1010 Pine Street, City',
            registeredDate: '2023-08-13',
            service: 'CCTV Repair',
            category: 'Security',
            image: person7,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 14,
            firstName: 'Kumar',
            lastName: 'Sangakkara',
            nic: '654987321V',
            contactNumber: '0654987321',
            email: 'kumar.sangakkara@example.com',
            address: '111 Oak Road, Town',
            registeredDate: '2023-08-14',
            service: 'Sofa cleaning',
            category: 'cleaning',
            image: person8,
            status: 'Accepted',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 15,
            firstName: 'Mike',
            lastName: 'Johnson',
            nic: '789654123V',
            contactNumber: '0789654123',
            email: 'mike.johnson@example.com',
            address: '1212 Maple Street, Village',
            registeredDate: '2023-08-15',
            service: 'Painting',
            category: 'Interior Works',
            image: person9,
            status: 'Rejected',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 16,
            firstName: 'Saman',
            lastName: 'Perera',
            nic: '321456789V',
            contactNumber: '0321456789',
            email: 'saman.perera@example.com',
            address: '1313 Pine Avenue, City',
            registeredDate: '2023-08-16',
            service: 'Electrical Wiring',
            category: 'Electrical & Plumbing',
            image: person3,
            status: 'Pending',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 17,
            firstName: 'Susantha',
            lastName: 'Villergers',
            nic: '987654321V',
            contactNumber: '0987654321',
            email: 'susantha.villergers@example.com',
            address: '1414 Oak Lane, Town',
            registeredDate: '2023-08-17',
            service: 'Tiles Fitting',
            category: 'Construction',
            image: person1,
            status: 'Accepted',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
        {
            id: 18,
            firstName: 'William',
            lastName: 'Wiliamson',
            nic: '654321789V',
            contactNumber: '0654321789',
            email: 'william.wiliamson@example.com',
            address: '1515 Maple Road, Village',
            registeredDate: '2023-08-18',
            service: 'Fire Alarm',
            category: 'Security',
            image: person2,
            status: 'Rejected',
            uploadedFiles: [
                { fileName: 'File 1', url: 'https://example.com/file1.pdf' },
                { fileName: 'File 2', url: 'https://example.com/file2.pdf' },
            ],
        },
    ];

    const handleGenerateMonthlyReport = async () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        const headingText = 'Top Service Providers for this month';
        doc.text(headingText, 10, 10);

        const tableData = TopServiceProvidersData.map(provider => [
            provider.firstName,
            provider.lastName,
            provider.nic,
            provider.contactNumber,
            provider.email,
        ]);

        const table1StartY = 10 + doc.getTextDimensions(headingText).h;

        doc.autoTable({
            head: [['First Name', 'Last Name', 'NIC', 'Contact Number', 'Email']],
            body: tableData,
            startY: table1StartY,
        });

        const advertisementDataMonthly = [
            { category: 'Spare parts', value: 220 },
            { category: 'Tools', value: 180 },
            { category: 'Sessions', value: 250 },
            { category: 'Others', value: 120 },
        ];

        const table2StartY = table1StartY + 10 + doc.autoTable.previous.finalY;

        doc.setFontSize(16);
        const headingText2 = 'Advertisement Data for this month';
        doc.text(headingText2, 10, table2StartY);

        const table2Data = advertisementDataMonthly.map(item => [item.category, item.value]);

        doc.autoTable({
            head: [['Category', 'Value']],
            body: table2Data,
            startY: table2StartY + doc.getTextDimensions(headingText2).h,
        });

        const monthlyRevenueData = generateMonthlyRevenueData();

        const table3StartY = 15 + doc.autoTable.previous.finalY;

        doc.setFontSize(16);
        const headingText3 = 'Monthly Revenue Data';
        doc.text(headingText3, 10, table3StartY);

        const table3Data = monthlyRevenueData.map(item => [parseInt(item.day) + 1, 'Rs. ' + item.revenue]);

        doc.autoTable({
            head: [['Day', 'Revenue']],
            body: table3Data,
            startY: table3StartY + doc.getTextDimensions(headingText3).h,
        });

        const dataUri = doc.output('datauristring');

        showPdfPreview(dataUri);
    };

    const showPdfPreview = (dataUri) => {
        // Show the PDF preview in an iframe
        const pdfPreviewIframe = document.createElement('iframe');
        pdfPreviewIframe.src = dataUri;
        pdfPreviewIframe.style.width = '80%';
        pdfPreviewIframe.style.height = '80%';
        pdfPreviewIframe.style.border = '1px solid #ccc';

        // Display the PDF preview in a modal
        const modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'show');
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        modal.appendChild(pdfPreviewIframe);

        // Add close button to the modal
        const closeButton = document.createElement('button');
        closeButton.classList.add('btn-effect3');
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.textContent = 'Close';
        closeButton.onclick = () => {
            document.body.removeChild(modal);
        };
        modal.appendChild(closeButton);

        document.body.appendChild(modal);
    };

    const [view, setView] = useState('daily');
    const [revenueView, setRevenueView] = useState('last7days');
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);
    const [data, setData] = useState({ fromDate: null, toDate: null });
    const [selectedOption, setSelectedOption] = useState('weekly');
    const [selectedComplaintOption, setSelectedComplaintOption] = useState('weekly');
    const [filteredComplaintData, setFilteredComplaintData] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);

    const advertisementDataWeekly = [
        { category: 'Spare parts', value: 120 },
        { category: 'Tools', value: 200 },
        { category: 'Sessions', value: 150 },
        { category: 'Others', value: 80 },
    ];

    const advertisementDataMonthly = [
        { category: 'Spare parts', value: 220 },
        { category: 'Tools', value: 180 },
        { category: 'Sessions', value: 250 },
        { category: 'Others', value: 120 },
    ];

    const revenueData = revenueView === 'last7days' ? generateRevenueData() : generateMonthlyRevenueData();

    const handleOptionChange = (event) => {
        setSelectedComplaintOption(event.target.value);
    };

    const handleRevenueViewChange = (e) => {
        setRevenueView(e.target.value);
    };

    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    const handleFromDateChange = (date) => {
        setData((prevState) => ({ ...prevState, fromDate: date }));
    };

    const handleToDateChange = (date) => {
        setData((prevState) => ({ ...prevState, toDate: date }));
    };

    const handleDateChange = (ranges) => {
        setDateRange([ranges.selection]);
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

    const filteredData = view === 'daily' ? generateDailyData() : generateMonthlyData();
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    const chartData = filteredData.filter((item) => {
        const date = new Date(item.day);
        return date >= startDate && date <= endDate;
    });

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

    const chartDataToShow = view === 'daily' ? generateDailyData() : generateMonthlyData();

    const renderActiveDot = (props) => {
        const { cx, cy, stroke, key } = props;

        return (
            <g key={key}>
                <circle cx={cx} cy={cy} r={3} stroke={stroke} fill="#8884d8" />
            </g>
        );
    };

    const handleShowDetails = (user) => {
        setData({ ...data, showDetailsModal: true, selectedUser: user });
    };


    useEffect(() => {

        const filteredData = complaintData.filter((complaint) => {
            if (selectedComplaintOption === 'weekly') {
                return complaint.status === 'Pending' || complaint.status === 'Resolved';
            } else if (selectedComplaintOption === 'monthly') {
                return complaint.status === 'Pending' || complaint.status === 'Resolved';
            }
            return false;
        });
        setFilteredComplaintData(filteredData);


        const pendingCount = filteredData.filter((complaint) => complaint.status === 'Pending').length;
        const resolvedCount = filteredData.filter((complaint) => complaint.status === 'Resolved').length;

        const data = [
            { category: 'Pending', value: pendingCount },
            { category: 'Resolved', value: resolvedCount },
        ];

        setDataToShow(data);


    }, [selectedComplaintOption]);

    return (
        <div>
            <section className="block dashboard-block" style={{ backgroundImage: `url(${BgImage})` }}>

                <div className="d-flex w-100">
                    <div className='col-xs-3 col-md-4 col-lg-4 col-xl-4 col-xxl-3 m-3 me-0 date-picker-container'>
                        <div className="input-group m-0">
                            <DatePicker
                                selected={data.fromDate}
                                onChange={handleFromDateChange}
                                className="form-control date-picker-input"
                                placeholderText="From Date"
                                dateFormat="yyyy-MM-dd"
                                isClearable
                            />
                            <span className="input-group-text">
                                <i className="bi bi-calendar2-week"></i>
                            </span>
                        </div>
                    </div>

                    <div className='me-xs-2 col-xs-2 col-md-4 col-lg-4 col-xl-4 col-xxl-3 m-3 date-picker-container'>
                        <div className="input-group">
                            <DatePicker
                                selected={data.toDate}
                                onChange={handleToDateChange}
                                className="form-control date-picker-input"
                                placeholderText="To Date"
                                dateFormat="yyyy-MM-dd"
                                isClearable
                            />
                            <span className="input-group-text">
                                <i className="bi bi-calendar2-week"></i>
                            </span>
                        </div>
                    </div>
                    <div className='me-xs-2 col-xs-2 col-md-4 col-lg-3 col-xl-4 col-xxl-3 m-3 d-flex'>
                        <button
                            className="btn me-2 d-block d-md-none fs-3"
                            onClick={handleGenerateMonthlyReport}
                        >
                            <i className="bi bi-clipboard2-minus-fill"></i>
                        </button>
                        <Button onClick={handleGenerateMonthlyReport} className="btn-effect3 d-none d-md-block">
                            Generate Monthly Report
                        </Button>
                    </div>

                </div>

                <div className="dashboard-container align-items-center justify-content-center w-100" style={{ backgroundImage: `url(${BgImage})` }}>

                    <div className="d-flex justify-content-between w-100">
                        <h2 className="chart-title mb-4 ms-5 fs-3">Customers Count</h2>
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

                <div className="row w-100 mb-1 mt-4">
                    <div className="col-xs-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <Card style={{ backgroundImage: `url(${BgImage})`, flex: 1 }} >
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
                                                    <i className="bi bi-info-circle-fill fs-4" ></i>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-xs-12 col-md-12 col-lg-6 d-flex justify-content-center align-items-center">
                        <Card style={{ backgroundImage: `url(${BgImage})`, flex: 1 }}>
                            <div className="d-flex justify-content-between w-100 align-items-center">
                                <h3 className="chart-title ms-3 fs-3 align-items-center mb-0">Revenue</h3>
                                <div className="col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-3 m-3 me-xs-5">
                                    <div className="input-group">
                                        <select className="form-select" value={revenueView} onChange={handleRevenueViewChange}>
                                            <option value="last7days">Last Week</option>
                                            <option value="lastmonth">Last Month</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <Card.Body>
                                <ResponsiveContainer width="100%" height='100%'>
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
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row w-100 mb-1">

                    <div className="col-lg-6 d-flex justify-content-center d-none d-lg-block">
                        <Card style={{ backgroundImage: `url(${BgImage})`, flex: 1 }}>
                            <div className="d-flex justify-content-between w-100 align-items-center">
                                <h3 className="chart-title ms-3 fs-3 align-items-center mb-0">Complaints Status</h3>
                                <div className="col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-3 m-3 me-xs-5">
                                    <div className="input-group">
                                        <select className="form-select" value={selectedComplaintOption} onChange={handleOptionChange}>
                                            <option value="weekly">Last Week</option>
                                            <option value="monthly">Last Month</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <Card.Body className='pieChartContainerClass'>
                                <ResponsiveContainer width="100%" height={500}>
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

            </section>
        </div>
    );
};

export default AdminReport;