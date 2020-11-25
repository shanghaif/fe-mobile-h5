import { setHistoryword } from '@liepin/react-search-layer-h5';
import stringUtil from '../../../lib/utils/string';

const keyword = stringUtil.getQuery('keyword');
keyword && setHistoryword(keyword);
