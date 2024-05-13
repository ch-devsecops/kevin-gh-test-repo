/**
 * Initializes the i18next library to provide a translation dictionary to the app.
 */

export default function i18nInit() {
  return new Promise((resolve, reject) => {
    import('./i18nInstance')
      .then(() => resolve())
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}
