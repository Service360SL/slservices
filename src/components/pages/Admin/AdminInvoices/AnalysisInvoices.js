import "../../../../style/ServiceProvider/Dashboard.css";
import {

  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,

} from "recharts";

function AnalysisInvoices() {

  const data = [
    {
      "month": "January",
      "income": 18900
    },
    {
      "month": "February",
      "income": 10000
    },
    {
      "month": "March",
      "income": 20000
    },
    {
      "month": "April",
      "income": 26000
    },
    {
      "month": "May",
      "income": 45000
    },
    {
      "month": "June",
      "income": 12000
    },
    {
      "month": "July",
      "income": 24500
    },
    {
      "month": "August",
      "income": 21000
    },
    {
      "month": "September",
      "income": 0
    },
    {
      "month": "October",
      "income": 0
    },
    {
      "month": "November",
      "income": 0
    },
    {
      "month": "December",
      "income": 0
    }
  ];

  const renderActiveDot = (props) => {
    const { cx, cy, stroke, key } = props;

    return (
      <g key={key}>
        <circle cx={cx} cy={cy} r={3} stroke={stroke} fill="#8884d8" />
      </g>
    );
  };

  return (
    // <div className="graphContainer px-3 py-4">
    <div className="graphContainer px-3 py-4" style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="90%">

        <AreaChart data={data} margin={{ top: 0, right: 30, left: 0, bottom: 42 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1" fill="#8884d8">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis dataKey="income" domain={['auto', 'auto']} axisLine={false} strokeWidth={0.1} />
          <Tooltip />

          <Area type="monotone" dataKey="income" stroke="#687699" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" dot={renderActiveDot} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="rect"
            wrapperStyle={{ paddingTop: 15 }}
            payload={[{ value: 'income (LKR)', type: 'rect', color: '#8884d8' }]} // Custom label and icon
          />
        </AreaChart>

      </ResponsiveContainer>
    </div>
  );
}

export default AnalysisInvoices;