// 默认环境
let BASE_URL = 'http://eduplus-testabbyun.com/prod-api'

let FILE_URL = 'http://39.174.79.186:30002'

// #ifdef H5
BASE_URL = '/prod-api'
// #endif


export default {
	apiUrl: BASE_URL,
	fileUrl: FILE_URL
}