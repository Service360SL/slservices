import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import AnalysisInvoices from "./AnalysisInvoices";
import GenerateInvoice from "./GenarateInvoices";

const AdminInvoices = () => {

  return (
    <div className="App">
      <div className="p-4">
        <h2>Payments</h2>
        <AnalysisInvoices />
      </div>
      <div className="px-4">
        {" "}
        <h2>Invoice Generator</h2>
      </div>
      <div className="p-4">
        <GenerateInvoice />
      </div>
    </div>
  );
};

export default AdminInvoices;