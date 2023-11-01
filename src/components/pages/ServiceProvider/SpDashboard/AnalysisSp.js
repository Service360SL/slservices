import { useState } from "react";
import "../../../../style/ServiceProvider/Dashboard.css";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useEffect } from "react";
import axios from "axios";

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
    data.push({ day: i.toString(), income: Math.floor(Math.random() * 1000) });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  for (let i = 0; i < 12; i++) {
    data.push({ month: months[i], income: Math.floor(Math.random() * 10000) });
  }
  return data;
};


function AnalysisSp() {
  const [viewTrainingSessionsData, setviewTrainingSessionsData] = useState(null);
  const [earningsData, setEarningsData] = useState([]);

    // GETTING LOGGED IN SERVICEPROVIDER ID

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

  useEffect(() => {
    axios.get('http://localhost:8080/auth/viewMyTrainingSessions',{
      params: {
        serviceproviderid: userData.userid
      },
    }).then((res) => {
        console.log(res.data);
        setviewTrainingSessionsData(res.data);

        // Generate earningsData from res.data
        const newData = res.data.map(item => {
          return {
              session: item.trainingtitle,
              earnings: parseInt(item.trainingcost)*item.going, 
              date: item.trainingdate 
          };
        });

        setEarningsData(newData);
    });
  }, []);

  console.log(viewTrainingSessionsData)



  // const earningsData = [
  //   { session: "Advanced Electrical Wiring", earnings: 14000, date: "2023-07-01" },
  //   { session: "Common Electrical Issues", earnings: 18000, date: "2023-06-12" },
  //   { session: "Energy-Efficient Systems", earnings: 10000, date: "2023-04-02" },
  //   { session: "Smart Home Automation", earnings: 17000, date: "2023-08-03" },
  //   { session: "Safety Practices in Electricity", earnings: 20000, date: "2023-05-12" },
  // ];

  const [view, setView] = useState('daily');

  const chartDataToShow = view === 'daily' ? generateDailyData() : generateMonthlyData();

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  const chartData = view === 'daily' ? generateDailyData() : generateMonthlyData();

  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map((item) => item.income));
    const dataMin = Math.min(...chartData.map((item) => item.income));

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Assuming the first payload item is enough

      return (
        <div className="custom-tooltip">
          <p className="label">{data.session}</p>
          <p className="intro">Earnings: {data.earnings}</p>
          <p className="desc">Date: {data.date}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <div className="dashboard-container align-items-center justify-content-center w-95 ms-lg-4 me-lg-4 my-4" >
        <div className="d-flex justify-content-between w-100">
          <h2 className="chart-title mb-4 ms-5 fs-4">
            Earnings from Customer Services
          </h2>
          <div className="col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-2 m-3 me-xs-5  align-items-end">
            <div className="input-group">
              <select
                value={view}
                onChange={handleViewChange}
                className="form-select"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartDataToShow} >
            <defs>{colorGradient()}</defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={view === "daily" ? "day" : "month"}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} strokeWidth={0.1} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="url(#colorGradient)" barSize={15} />
          </BarChart>
        </ResponsiveContainer>
      </div>


      <div className="dashboard-container align-items-center justify-content-center w-95 ms-lg-4 me-lg-4 my-4" >
        <div className="d-flex justify-content-between w-100">
          <h2 className="chart-title mb-4 ms-5 fs-4">
            Earnings from Training Sessions
          </h2>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <defs>
              <linearGradient id="lineColorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset={gradientOffset()} stopColor="#8884d8" />
                <stop offset={gradientOffset()} stopColor="#8884d8" />
              </linearGradient>
            </defs>
            <Line type="linear" dataKey="earnings" fill="url(#colorGradient)" stroke="url(#colorGradient)" name="Earnings" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AnalysisSp;