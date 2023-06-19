'use strict';  
const uniPush = uniCloud.getPushManager({appId:"__UNI__338A3E0"}) // 注意这里需要传入你的应用appId  
exports.main = async (event, context) => {  
	// const { cids, title, content, data, request_id, options } = JSON.parse(event.body)
	console.log('JSON.parse(event.body)', JSON.parse(event.body))
	const eBody = JSON.parse(event.body)
    return await uniPush.sendMessage({  
  //       "push_clientid": cids, // uni-app客户端获取到的客户端推送标识push_clientid  
  //       "force_notification": true,  //填写true，客户端就会对在线消息自动创建“通知栏消息”。  
  //       "title": title, // 标题    
  //       "content": content,  
  //       "payload": content,
  //       "request_id": request_id,
  //       "options": options,
			...eBody
    })  
};