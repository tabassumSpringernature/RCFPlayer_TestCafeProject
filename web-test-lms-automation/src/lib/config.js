// @flow
import config from '@rcf/universal-library-config';

declare type UrlDetails = {
	host: string,
	port: number,
	protocol: string,
	path: string
};

const buildUrl = ({ host, port, protocol, path }: UrlDetails): string => `${protocol}://${host}:${port}${path}`;

export const getWebTestLmsRootUrl = () => buildUrl(config.services.webTestLms.app);
