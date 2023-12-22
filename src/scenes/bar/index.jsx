import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import BarChart2 from "../../components/BarChart2";
import BarChart3 from "../../components/BarChart3";
const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Ventas" subtitle="Por mes y Producto" />
      <Box height="75vh">
        <BarChart />
      </Box>
      <Header title="Recaudacion" subtitle="Por mes " />
      <Box height="75vh">
        <BarChart2 />
      </Box>
      <Header title="Recaudacion" subtitle="Por mes " />
      <Box height="75vh">
        <BarChart3 />
      </Box>
    </Box>
  );
};

export default Bar;
