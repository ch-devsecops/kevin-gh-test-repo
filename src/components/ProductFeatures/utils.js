/**
 * transpiles custom TextFeatures string format to array of objects to consume in provider
 * @param features
 * @returns {array}
 */

function featuresStrToArray(features = {}) {
  const ret = [];
  let isAccordion = false;
  let accordion = {
    accordionTitle: '',
    title: '',
    key: '',
    content: [],
  };
  let feature = {
    title: '',
    list: [],
  };
  features?.TextFeatures.split('\r\n').map(item => {
    if (item[1] === '<' && !item.includes('<tooltip')) {
      isAccordion = true;
      if (accordion.content.length) {
        accordion.content.push(feature);
        feature = {
          title: '',
          list: [],
        };
        ret.push(accordion);
        accordion = {
          accordionTitle: '',
          title: '',
          key: '',
          content: [],
        };
      }
      const TitleKeyId = item.trim().slice(2, -2);
      accordion.accordionTitle = TitleKeyId;
      accordion.title = TitleKeyId;
      accordion.key = TitleKeyId;
      return null;
    }
    if (item[0] === '<' && !item.includes('<tooltip')) {
      if (feature.list.length) {
        if (isAccordion) {
          accordion.content.push(feature);
        } else {
          ret.push(feature);
        }
        feature = {
          title: '',
          list: [],
        };
      }
      feature.title = item.trim().slice(1, -1);
      return null;
    }
    if (item.includes(' ||')) {
      const tmp = item.split(' ||');
      const tooltip = [...tmp[1].matchAll(/<+[a-zA-Z0-9="\s]+>+([^<]+)<\/+[a-zA-Z0-9]+>/gi)];
      feature.list.push({
        text: tooltip[0][1],
        tooltip: tooltip
          .map(i => i[1])
          .slice(1)
          .join('\r\n\r\n'),
      });
      return null;
    }
    feature.list.push({ text: item });
    return null;
  });
  if (feature.list.length) {
    if (isAccordion) {
      accordion.content.push(feature);
    } else {
      ret.push(feature);
    }
  }
  if (accordion.content.length) {
    ret.push(accordion);
  }
  return ret;
}

export default featuresStrToArray;
