import DataTable from "./components/DataTable";
import Layout from "./layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/table" element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
