const getSelectedModelId = (selectedModelKey, models) => {
  if (!Array.isArray(models) && !models?.length) return null;

  return models.find(item => item?.detKey?.value === selectedModelKey)?.id;
};

export default getSelectedModelId;
