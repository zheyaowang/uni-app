import { getConnectInfo } from '@/common/util/work.js'

// 图片格式
export const imagesExtension = [".png", ".jpg", ".jpeg", ".gif"];

// 获取基础路径
function createBaseUrl() {
	return `http://${getConnectInfo('ip')}:${getConnectInfo('port')}`
}

// 判断是否已编码，若已编码则直接返回原targetUrl，如果没有编码则需要encodeURIComponent(targetUrl)
function createDecodeUrl(targetUrl, path) {
	// 文件基础路径
	const baseUrl = createBaseUrl();
	const filepath = '/user-platform/file/' + path
	// 获取绝对的文件路径 D:\\...
	const fileSrc = targetUrl.includes(filepath) ? targetUrl.substring(filepath.length) : targetUrl;
	// 编码解码
	const decodeUrl = decodeURIComponent(fileSrc) === fileSrc ? encodeURIComponent(fileSrc) : fileSrc
	// 合并
	return baseUrl + filepath + decodeUrl
}

// 图片回显完整路径，用于回显和下载图片，img中的src
export function createFullImgUrl(url) {
	return createDecodeUrl(url, "download?filepath=")
}

// pdf完整路径 新开页面预览
export function createFullFileUrlPreview(url) {
	return createDecodeUrl(url, "preview?filepath=")
}

// 视频完整路径，新开页面预览，video中的src
export function createFullVideoUrlPreview(url) {
	return createDecodeUrl(url, "preview/video?filepath=")
}

// 回显upload的fileList格式，用于回显表单 upload中的fileList
export function createUploadFileList(fileList = []) {
	return fileList.map((v, i) => {
		if (typeof v === "string") {
			const { extension } = createFileNameExtension(v);
			return {
				name: `${ i }${ extension }`,
				url: createFullImgUrl(v)
			};
		}
		return v;
	});
}

// 图片上传格式，用于提交后端
export function createFormImagesUrl(fileList = []) {
	const baseUrl = createBaseUrl();
	const uploadFiles = fileList.map(v => {
		const url = v.url.includes(baseUrl) ? v.url.substring(baseUrl.length) : v.url
		return decodeURIComponent(url) === url ? url : decodeURIComponent(url)
	})
	return uploadFiles.join(",");
}

// 上传文件格式和名称
export function createFileNameExtension(file) {
	const name = typeof file === "string" ? file : file.name;
	const extensionIndex = name.lastIndexOf("."); // 后缀序列
	const extension = name.substring(extensionIndex); // 文件后缀
	const fileName = name.substring(0, extensionIndex); // 文件名称
	return {
		extension,
		fileName
	};
}

// 下载文件
export function downloadUploadFile({
	url,
	name = new Date().getTime() + ""
}) {
	const eLink = document.createElement("a");
	eLink.style.display = "none";
	eLink.href = url;
	eLink.setAttribute("download", name); // 文件名称
	eLink.setAttribute("target", "_blank"); // 新开窗口
	document.body.appendChild(eLink);
	eLink.click();
	URL.revokeObjectURL(eLink.href); // 释放URL 对象
	document.body.removeChild(eLink);
}
