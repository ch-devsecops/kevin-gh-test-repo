import axios from 'axios';

const fetchInstance = (config, url) => axios.create({ baseURL: url })(config);

const fetchBaseQuery = async props => {
  const { body, method, params = {}, url, ...requestOpts } = props || {};

  try {
    const config = {
      ...requestOpts,
      headers: { 'Content-type': requestOpts.contentType || 'application/json' },
      method,
      ...params,
    };

    if (body) {
      config.data = body;
    }

    const result = await fetchInstance(config, url);

    // TODO Here we can handle the error globally
    if (result.status !== 200) {
      const error = {
        error: { status: result.statusText, data: result.data },
      };
      // eslint-disable-next-line no-console
      console.log('%c@-> fetchBaseQuery => error', 'background: hsl(0,100%,35%); color: #fff', error); // prettier-ignore
      return error;
    }

    return { data: result.data };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('%c@-> fetchBaseQuery => catch error', 'background: hsl(0,100%,35%); color: #fff', error); // prettier-ignore
    return { error: { status: error.response?.status, data: error.response?.data } };
  }
};

export default fetchBaseQuery;
