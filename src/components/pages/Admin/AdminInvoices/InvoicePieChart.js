import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#8884d8", "#1f285a", "#687699"];

const dataThisMonth = [
  { name: "Gold", value: 3299 },
  { name: "Platinum", value: 4499 },
  { name: "Training Session", value: 7500 },
];

const dataThisYear = [
  { name: "Gold", value: 35299 },
  { name: "Platinum", value: 52499 },
  { name: "Training Session", value: 75000 },
];

const InvoicePieChart = () => {
  const [selectedOption, setSelectedOption] = useState("thisMonth");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dataToShow =
    selectedOption === "thisMonth" ? dataThisMonth : dataThisYear;

  return (
    <Card>
      <Card.Body>
        <h5>Pie Chart Example</h5>
        <div className="d-flex justify-content-end">
          <Form.Select value={selectedOption} onChange={handleOptionChange} style={{ maxWidth: "20em" }}>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </Form.Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dataToShow}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {dataToShow.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default InvoicePieChart;