import useScript from '../../utils/hooks/useScript';
import usePartStreamConfig from '../../utils/sitecoreContext/usePartStreamConfig';

const PartStream = () => {
  const config = usePartStreamConfig();
  const { host, appKey, id } = config;
  const url = `${host}?appKey=${appKey}`;

  useScript(url, id);

  return null;
};

export default PartStream;
