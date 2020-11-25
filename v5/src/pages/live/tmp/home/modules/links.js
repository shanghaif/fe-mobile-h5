import domain from '@liepin/native-domain-fe';
import { QUERY_NAME } from '../../../../../common/js/global/source/constants/';

const { location } = window;

export const getApplyLink = () => (`/register/?return_url=${encodeURIComponent(location.href)}&${QUERY_NAME}=zhibo`);

export const getRouteLink = () => (`${domain('m')}/live/route?backUrl=${encodeURIComponent(location.href)}&${QUERY_NAME}=zhibo`);

export const getLoginLink = () => (`/register/?return_url=${encodeURIComponent(`${domain('m')}/live/route/?backUrl=${encodeURIComponent(location.href)}&${QUERY_NAME}=zhibo`)}&${QUERY_NAME}=zhibo&nonstop=1`);
