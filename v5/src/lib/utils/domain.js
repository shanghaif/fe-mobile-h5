import domain, { baseDomain } from '@liepin/native-domain-fe';

export const rootDomain = baseDomain;
export const mRoot = domain('m');
export const cRoot = domain('m-c');
export const mVasRoot = domain('m-vas');
export const passportRoot = domain('passport');
export const isCn = rootDomain.split('.')[1] === 'cn';
