import React, { useState, useEffect } from "react";
import { Datatable } from "@o2xp/react-datatable";
import BarChartIcon from "@material-ui/icons/BarChart";
import { v4 as uuidV4 } from "uuid";
import moment from "moment";

import data from "./data";
import ChartCreator from "../ChartCreator";

const { rows, columns } = data;

// Add aggregate
// Button to select if starting at 0
// Ordering
// Add multiple ordinate
// Handling date data

// Split screen
// Select data
// Fav

// aggregate date
// Scope aggregate data to datatable
// Map projection

const sampleFinSecCatId = ["Debt", "Equity"];
const sampleIssuerGrpId = ["Supranational", "Central Bank", "Corporate (non-fin)"];
const sampleRatingGrpId = [
  "A+,A,A-",
  "AAA,AA+,AA,AA-",
  "BBB+,BBB,BBB-",
  "BB,B,CCC AND BELOW"
];
const sampleCurrencyGrpId = [
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
      clsMlatId: uuidV4(),
      date: new Date(new Date() - Math.floor(Math.random() * 100000000000)).toUTCString(),
      finSecCatId: sampleFinSecCatId[Math.round(Math.random())],
      issuerGrpId: sampleIssuerGrpId[Math.round(Math.random() * 2)],
      ratingGrpId: sampleRatingGrpId[Math.round(Math.random() * 3)],
      currencyGrpId: sampleCurrencyGrpId[Math.round(Math.random() * 7)],
      minOutstandAmnt: null,
      maxOutstandAmnt: null,
      cluster: `Cluster ${i}`,
      score: parseFloat((Math.random() * (5 - 1 + 1) + 1).toFixed(2)),
      propdLMrktScore: parseFloat((Math.random() * (5 - 1 + 1) + 1).toFixed(2)),
      avgRelBidAskSpread: parseFloat((Math.random() * (5 - 1 + 1) + 1).toFixed(2)),
      adtvQty: parseFloat((Math.random() * (5 - 1 + 1) + 1).toFixed(2)),
      adtvAmnt: parseFloat((Math.random() * (50 - 1 + 1) + 1).toFixed(2))
    });
  }

  return dataGenerated;
};

const defaultOptions = {
  title: "Mlat",
  keyColumn: "clsMlatId",
  data: {
    ...data,
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

const dates = [
  "2018-06-15T00:24:58.000Z",
  "2018-06-15T14:33:28.000Z",
  "2018-06-19T14:35:28.000Z",
  "2018-06-19T17:13:46.000Z",
  "2020-12-07T13:33:14.000Z",
  "2019-08-09T10:42:40.000Z",
  "2018-09-09T03:48:26.000Z"
];

const ChartCreatorStory = () => {
  const [open, setOpen] = useState(true);
  const [datatableOptions, setDatatableOptions] = useState(defaultOptions);

  const test = () => {
    const res = {};
    let sortedArray = dates.sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    while (sortedArray.length > 0) {
      const firstDate = sortedArray[0];
      const start = moment(firstDate);
      const interval = "days";
      const count = 355;
      const end = moment(start).add(count, interval);
      res[firstDate] = [];
      sortedArray.forEach((date) => {
        if (moment(date).isSameOrAfter(start) && moment(date).isSameOrBefore(end)) {
          res[firstDate].push(date);
          sortedArray = sortedArray.filter((sa) => !moment(sa).isSame(date));
        }
      });
    }

    // console.log(res);
  };

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
    test();
  }, []);

  return (
    <div>
      <Datatable options={datatableOptions} stripped />
      <ChartCreator
        open={open}
        setOpen={setOpen}
        rows={datatableOptions.data.rows}
        columns={columns}
      />
    </div>
  );
};

export default {
  title: "Example/ChartCreator"
};

export const Primary = () => <ChartCreatorStory />;
