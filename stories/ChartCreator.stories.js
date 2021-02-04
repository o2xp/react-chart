import React, { useState, useEffect } from "react";
import { Datatable } from "@o2xp/react-datatable";
import BarChartIcon from "@material-ui/icons/BarChart";
import { v4 as uuidV4 } from "uuid";
import ChartCreator from "../src/ChartCreator";

const columns = [
  {
    id: "surname",
    label: "Surname",
    colSize: "100px"
  },
  {
    id: "firstName",
    label: "First Name",
    colSize: "100px",
    required: true,
    dataType: "string",
    editable: false
  },
  {
    id: "age",
    label: "Age",
    colSize: "80px",
    dataType: "number"
  },
  {
    id: "birthDate",
    label: "Birth date",
    colSize: "200px",
    dataType: "date"
  },
  {
    id: "group",
    label: "Group",
    colSize: "80px"
  }
];

const surnameId = [
  "Hood",
  "Sutton",
  "Rios",
  "Burris",
  "Mclaughlin",
  "Salinas",
  "Mcclure",
  "Lynch",
  "Battle",
  "White",
  "Howard",
  "Cunningham",
  "Robertson",
  "Curtis",
  "Puckett",
  "Pearson",
  "Fuller",
  "Stuart",
  "Phillips",
  "Ortega",
  "Leonard",
  "Bray",
  "Bennett",
  "Ware",
  "Mercer",
  "Evans",
  "Patrick",
  "Galloway",
  "Silva",
  "Wolfe",
  "Britt",
  "Brock",
  "Mcguire",
  "Hester",
  "Cox",
  "Mcgee",
  "Rodriguez",
  "Talley",
  "Gilbert",
  "Mccormick",
  "Estrada",
  "Nolan",
  "Flores",
  "Grant",
  "Sims",
  "Lambert",
  "Morrow",
  "Stewart",
  "Ferrell",
  "Hensley"
];
const firstNameId = [
  "Lupe",
  "Claudine",
  "Lola",
  "Brandi",
  "Ebony",
  "Katy",
  "Mamie",
  "Theresa",
  "Taylor",
  "Dickson",
  "Bowman",
  "Maritza",
  "Lamb",
  "Kirk",
  "Heather",
  "Fisher",
  "Bianca",
  "Kelley",
  "Rosales",
  "Glass",
  "Marcia",
  "Larson",
  "Monique",
  "Glenda",
  "Dennis",
  "Sherrie",
  "Leanna",
  "Pena",
  "Addie",
  "Helga",
  "Langley",
  "Kathryn",
  "Moody",
  "Eddie",
  "Jessica",
  "Maddox",
  "Katheryn",
  "Rowland",
  "Savannah",
  "Roberts",
  "Davidson",
  "Dawn",
  "Queen",
  "Bell",
  "Ashlee",
  "Calhoun",
  "Cox",
  "Luna",
  "Moran",
  "Chambers"
];
const groupId = [
  "Group 1",
  "Group 2",
  "Group 4",
  "Group 5",
  "Group 6",
  "Group 7",
  "Group 8",
  "Group 9"
];

const generateData = () => {
  const dataGenerated = [];
  for (let i = 0; i < 55; i++) {
    dataGenerated.push({
      id: uuidV4(),
      birthDate: new Date(
        new Date() - Math.floor(Math.random() * 1000000000000)
      ).toUTCString(),
      age: Number(Math.round(Math.random() * 70)),
      surname: surnameId[Math.round(Math.random() * 49)],
      firstName: firstNameId[Math.round(Math.random() * 49)],
      group: groupId[Math.round(Math.random() * 8)]
    });
  }

  return dataGenerated;
};

const defaultOptions = {
  title: "Mlat",
  keyColumn: "clsMlatId",
  data: {
    columns,
    rows: generateData()
  },
  features: {
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canOrderColumns: true,
    canSelectRow: true
  }
};

const ChartCreatorStory = () => {
  const [open, setOpen] = useState(false);
  const [datatableOptions, setDatatableOptions] = useState(defaultOptions);
  const [rowsForChart, setRowsForChart] = useState(datatableOptions.data.rows);

  useEffect(() => {
    setDatatableOptions({
      ...defaultOptions,
      features: {
        ...defaultOptions.features,
        additionalIcons: [
          {
            title: "Create Chart",
            icon: <BarChartIcon color="secondary" />,
            onClick: () => setOpen(true)
          }
        ]
      }
    });
  }, []);

  const actions = ({ type, payload }) => {
    if (type === "select" && payload.length > 0) {
      setRowsForChart(payload);
    } else {
      setRowsForChart(datatableOptions.data.rows);
    }
  };

  return (
    <div>
      <Datatable options={datatableOptions} actions={actions} stripped />
      <ChartCreator open={open} setOpen={setOpen} rows={rowsForChart} columns={columns} />
    </div>
  );
};

export default {
  title: "Example/ChartCreator"
};

export const Primary = () => <ChartCreatorStory />;
