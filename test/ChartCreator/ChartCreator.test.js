import React from "react";
import { mount } from "enzyme";
import ChartCreator from "../../src/ChartCreator";

const open = false;
const setOpen = jest.fn();
const columns = [
  {
    id: "age",
    label: "Age",
    dataType: "number"
  },
  {
    id: "surname",
    label: "Surname",
    dataType: "string"
  },
  {
    id: "firstName",
    label: "First name",
    dataType: "string"
  }
];
const rows = [
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
];

const wrapper = mount(
  <ChartCreator open={open} setOpen={setOpen} columns={columns} rows={rows} />
);

describe("ChartCreator", () => {
  it("should mount", () => {
    expect(wrapper.find(ChartCreator)).toHaveLength(1);
  });
});
