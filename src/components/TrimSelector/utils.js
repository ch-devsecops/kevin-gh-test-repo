export const getYearOptions = vehicles => {
  if (!vehicles) return [];

  return vehicles.map(vehicle => ({
    text: vehicle.year,
    value: vehicle.year,
  }));
};

// gets model options and selected vehicle
export const getSelectedVehicle = (selectedOptions = {}, vehicles) => {
  const vehicle = vehicles?.find(v => v.year === selectedOptions.year);
  if (!vehicle) return { models: [] };

  const models = vehicle.models.map(m => ({
    text: m.modelName,
    value: m.modelName,
  }));
  return { models, selectedVehicle: vehicle };
};

// gets trim options and cta type
export const getSelectedModel = (selectedOptions = {}, selectedVehicle) => {
  const model = selectedVehicle?.models?.find(m => m.modelName === selectedOptions.model);
  if (!model) return { trims: [] };

  const trims =
    model.trims?.map(trim => ({
      text: trim,
      value: trim,
    })) || [];

  return { trims, ctaType: model.ctaType };
};

export const getDropdowns = labels => {
  if (!labels || !labels.year) return [];

  const year = {
    key: 'year',
    ...labels.year,
  };

  const model = labels?.model && {
    key: 'model',
    ...labels.model,
  };

  const trim = labels?.trim && {
    key: 'trim',
    ...labels.trim,
  };

  return [year, model, trim];
};

export const addQueryParams = (path, selectedOptions) => {
  if (!path || !selectedOptions) return undefined;

  const params = Object.keys(selectedOptions)
    .map(key => `${key}=${selectedOptions[key]}`)
    .join('&');

  return `${path}?${params}`;
};
