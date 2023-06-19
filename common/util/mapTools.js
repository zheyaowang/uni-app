/**
 * @description 打开导航
 * @param latitude { number } 维度
 * @param longitude { number } 经度
 * @param name { String } 地点名
 * @return null
 * @example gomapApp(30.60, 114.30, '武汉市政府')
 * */
export const gomapApp = (latitude, longitude, name) => {
	let url = "";
	if (plus.os.name == "Android") { //判断是安卓端
		plus.nativeUI.actionSheet({ //选择菜单
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{
				title: "腾讯地图"
			}, {
				title: "百度地图"
			}, {
				title: "高德地图"
			}]
		}, function(e) {
			switch (e.index) {
				//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
				case 1:
					//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
					url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
					break;
				case 2:
					url =
						`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
					break;
				case 3:
					url =
						`androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				//plus.runtime.openURL(url,function(e){})调起手机APP应用
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	} else {
		// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
		// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
		//（如urlschemewhitelist:["iosamap","baidumap"]）
		plus.nativeUI.actionSheet({
			title: "选择地图应用",
			cancel: "取消",
			buttons: [{
				title: "腾讯地图"
			}, {
				title: "百度地图"
			}, {
				title: "高德地图"
			}]
		}, function(e) {
			switch (e.index) {
				case 1:
					url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
					break;
				case 2:
					url =
						`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
					break;
				case 3:
					url =
						`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
					break;
				default:
					break;
			}
			if (url != "") {
				url = encodeURI(url);
				plus.runtime.openURL(url, function(e) {
					plus.nativeUI.alert("本机未安装指定的地图应用");
				});
			}
		})
	}
}
