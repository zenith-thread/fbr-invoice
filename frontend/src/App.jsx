// react-router
import { Route, Routes } from "react-router";

// components
import Form from "./components/Form";
import AllInvoices from "./components/AllInvoices";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Form />} />
        <Route path="invoices" element={<AllInvoices />} />
      </Route>
    </Routes>
  );
};

export default App;
