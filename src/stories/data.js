const data = {
  columns: [
    {
      id: "date",
      label: "Date",
      colSize: "200px",
      dataType: "date",
      editable: false
    },
    {
      id: "finSecCatId",
      label: "Instrument Group",
      required: true,
      colSize: "100px",
      dataType: "string",
      editable: false
    },
    {
      id: "issuerGrpId",
      label: "Issuer Group",
      colSize: "100px",
      required: true,
      dataType: "string",
      editable: false
    },
    {
      id: "ratingGrpId",
      label: "Rating Group",
      colSize: "80px",
      required: true,
      dataType: "string",
      editable: false
    },
    {
      id: "currencyGrpId",
      label: "Currency Group",
      dataType: "string",
      required: true,
      colSize: "80px",
      editable: false
    },
    {
      id: "minOutstandAmnt",
      label: "< Outstanding Amt",
      colSize: "80px",
      required: true,
      editable: true,
      dataType: "number"
    },
    {
      id: "maxOutstandAmnt",
      label: ">= Outstanding Amt",
      colSize: "80px",
      editable: true,
      required: true,
      dataType: "number",
      hiddenCreate: true
    },
    {
      id: "cluster",
      label: "Cluster",
      colSize: "80px",
      dataType: "string",
      editable: true,
      required: true
    },
    {
      id: "score",
      label: "Production L-Mrkt score",
      colSize: "80px",
      required: true,
      dataType: "number",
      editable: true
    },
    {
      id: "propdLMrktScore",
      label: "Proposed L-Mkt score",
      colSize: "80px",
      required: true,
      dataType: "number",
      editable: false
    },
    {
      id: "avgRelBidAskSpread",
      label: "Avg Bid Ask",
      colSize: "80px",
      dataType: "number",
      required: true,
      editable: false
    },
    {
      id: "adtvQty",
      label: "Avg Daily Trading Volume",
      colSize: "80px",
      dataType: "number",
      required: true,
      editable: false
    },
    {
      id: "adtvAmnt",
      label: "Avg Daily Trading Amount",
      colSize: "80px",
      dataType: "number",
      required: true,
      editable: false
    }
  ],
  rows: [
    {
      clsMlatId: 246,
      finSecCatId: "Debt",
      issuerGrpId: "Supranational",
      ratingGrpId: "A+,A,A-",
      minOutstandAmnt: null,
      maxOutstandAmnt: null,
      cluster: "Cluster 420",
      score: 1,
      currencyGrpId: "Group1",
      propdLMrktScore: 1.23,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 240,
      finSecCatId: "EQUITY",
      issuerGrpId: "CENTRAL BANK (Government)",
      ratingGrpId: "Other",
      minOutstandAmnt: 9,
      maxOutstandAmnt: null,
      cluster: "Cluster 240",
      score: 1.56,
      currencyGrpId: "USD",
      propdLMrktScore: 1.93,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 2408,
      finSecCatId: "EQUITY",
      issuerGrpId: "CENTRAL BANK (Government)",
      ratingGrpId: "Other",
      minOutstandAmnt: null,
      maxOutstandAmnt: 9,
      cluster: "Cluster 249",
      score: 1.78,
      currencyGrpId: "USD",
      propdLMrktScore: 1.23,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 241,
      finSecCatId: "EQUITY",
      issuerGrpId: "CORPORATE (FIN)",
      ratingGrpId: "A+,A,A-",
      minOutstandAmnt: null,
      maxOutstandAmnt: null,
      cluster: "Cluster 241",
      score: 3.7,
      currencyGrpId: "CHF,GBP,JPY",
      propdLMrktScore: 4.41,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 1,
      finSecCatId: "DEBT",
      issuerGrpId: "CENTRAL BANK (Government)",
      ratingGrpId: "A+,A,A-",
      minOutstandAmnt: 10,
      maxOutstandAmnt: null,
      cluster: "Cluster 1",
      score: 2.48,
      currencyGrpId: "CHF,GBP,JPY",
      propdLMrktScore: 2.02,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 1456,
      finSecCatId: "DEBT",
      issuerGrpId: "CENTRAL BANK (Government)",
      ratingGrpId: "A+,A,A-",
      minOutstandAmnt: null,
      maxOutstandAmnt: 10,
      cluster: "Cluster 1-2",
      score: 4,
      currencyGrpId: "CHF,GBP,JPY",
      propdLMrktScore: 2.02,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    },
    {
      clsMlatId: 2,
      finSecCatId: "DEBT",
      issuerGrpId: "CENTRAL BANK (Government)",
      ratingGrpId: "A+,A,A-",
      minOutstandAmnt: null,
      maxOutstandAmnt: null,
      cluster: "Cluster 2",
      score: 1.2,
      currencyGrpId: "EUR",
      propdLMrktScore: 2.12,
      avgRelBidAskSpread: null,
      adtvQty: null,
      adtvAmnt: null
    }
  ]
};

export default data;
