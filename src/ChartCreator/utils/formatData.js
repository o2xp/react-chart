// @flow

export const formatData = ({ data, datasetOptions }) => {
  const { datasets, rows, abscissId } = data;
  const newDatasets = datasets.map(dataset => ({
    ...dataset,
    ...datasetOptions,
    data: rows.map(row => row[dataset.ordinate])
  }));
  const dataFormated = {
    labels: rows.map(row => row[abscissId]),
    datasets: newDatasets
  };

  return dataFormated;
};

export const formatDataScatter = ({ data, datasetOptions }) => {
  const { datasets, rows, abscissId } = data;
  const newDatasets = datasets.map(dataset => ({
    ...dataset,
    ...datasetOptions,
    data: rows.map(row => ({ x: row[abscissId], y: row[dataset.ordinate] }))
  }));

  return {
    datasets: newDatasets
  };
};
