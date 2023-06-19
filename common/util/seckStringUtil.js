
import { getConnectInfo } from '@/common/util/work.js'
// 将后端返回的路径转化为网络路径
export function networkImg({path, baseURL= `http://${getConnectInfo('ip')}:${getConnectInfo('port')}`}) {
	return encodeURI(`${baseURL}/user-platform/file/download?filepath=${path}`);
}
// 将后端返回的路径转化为网络路径
export function networkImg1({path, baseURL= `http://${getConnectInfo('ip')}:${getConnectInfo('port')}`}) {
	return encodeURI(`${baseURL}${path}`);
}
