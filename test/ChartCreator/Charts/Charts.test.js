import React from "react";
import { mount } from "enzyme";
import Charts from "../../../src/ChartCreator/Charts";

jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  const mUseRef = jest.fn();
  return {
    ...originReact,
    createRef: mUseRef
  };
});

const data = {
  abscissId: "surname",
  abscissLabel: "Surname",
  ordinateLabels: ["Age"],
  rows: [
    {
      age: 10,
      surname: "Hanks",
      firstName: "Tom"
    },
    {
      age: 55,
      surname: "Bay",
      firstName: "Michael"
    },
    {
      age: 10,
      surname: "Zimmer",
      firstName: "Hans"
    }
  ],
  datasets: [
    {
      id: "d3cb50f8-e7c7-411e-91e5-b5db3699988f",
      displayLabel: true,
      ordinate: "age",
      label: "Age",
      backgroundColor: "rgba(63, 81, 181, 0.5)",
      borderColor: "#3f51b5"
    }
  ]
};
const chartRef = { current: null };
const setChartRef = jest.fn();
const aggregateOperation = "";
const abscissType = "string";
const orderBy = { columnId: "surname", order: "asc" };
const axesStartingAtZero = { x: true, y: true };

describe("ChartCreator", () => {
  it("should mount", () => {
    const wrapper = mount(
      <Charts
        chart="line"
        data={data}
        chartRef={chartRef}
        setChartRef={setChartRef}
        aggregateOperation={aggregateOperation}
        abscissType={abscissType}
        orderBy={orderBy}
        axesStartingAtZero={axesStartingAtZero}
      />
    );
    expect(wrapper.find(Charts)).toHaveLength(1);
  });

  describe("should mount chart of type", () => {
    it("verticalBar", () => {
      const wrapper = mount(
        <Charts
          chart="verticalBar"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#verticalBar-chart")).toHaveLength(1);
    });
    it("horizontalBar", () => {
      const wrapper = mount(
        <Charts
          chart="horizontalBar"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#horizontalBar-chart")).toHaveLength(1);
    });
    it("line", () => {
      const wrapper = mount(
        <Charts
          chart="line"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#line-chart")).toHaveLength(1);
    });
    it("scatter", () => {
      const wrapper = mount(
        <Charts
          chart="scatter"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#scatter-chart")).toHaveLength(1);
    });
    it("doughnut", () => {
      const wrapper = mount(
        <Charts
          chart="doughnut"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#doughnut-chart")).toHaveLength(1);
    });
    it("pie", () => {
      const wrapper = mount(
        <Charts
          chart="pie"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#pie-chart")).toHaveLength(1);
    });
    it("polarArea", () => {
      const wrapper = mount(
        <Charts
          chart="polarArea"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#polarArea-chart")).toHaveLength(1);
    });
    it("radar", () => {
      const wrapper = mount(
        <Charts
          chart="radar"
          data={data}
          chartRef={chartRef}
          setChartRef={setChartRef}
          aggregateOperation={aggregateOperation}
          abscissType={abscissType}
          orderBy={orderBy}
          axesStartingAtZero={axesStartingAtZero}
        />
      );
      expect(wrapper.find("#radar-chart")).toHaveLength(1);
    });
  });
});
