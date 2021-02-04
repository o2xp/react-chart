import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock("react-chartjs-2", () => ({
  Bar: () => null,
  HorizontalBar: () => null,
  Line: () => null,
  Scatter: () => null,
  Doughnut: () => null,
  Pie: () => null,
  Radar: () => null
}));

jest.mock("@reactchartjs/react-chart.js", () => ({
  PolarArea: () => null
}));

configure({ adapter: new Adapter() });
