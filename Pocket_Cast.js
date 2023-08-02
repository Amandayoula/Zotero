{
	"translatorID": "f7888ee9-1804-488a-a360-cfbc3f04ad52",
	"label": "Pocket_Cast",
	"creator": "Amanda Chen",
	"target": "https://pca.st/.*",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2023-08-02 13:14:41"
}

/*
	***** BEGIN LICENSE BLOCK *****

	Copyright © 2022 YOUR_NAME <- TODO

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/


function detectWeb(doc, url) {
	return 'radioBroadcast';
}


async function doWeb(doc, url) {
	if (detectWeb(doc, url) === "radioBroadcast") {
		scrape(doc, url);
	}
}

async function scrape(doc, url = doc.location.href) {
	var title = ZU.xpath(doc, "//head/title");  
	title = title[0].innerText.split(' - ')[0];  
	var abstractNote = ZU.xpath(doc, "/html/head/meta[3]"); 
	abstractNote = abstractNote[0].getAttribute('content'); 

	var episode_date = ZU.xpath(doc, "//*[@id='episode_date']");
	const originalDate = episode_date[0].innerText;
	const dateObject = new Date(originalDate);
	const year = dateObject.getFullYear();
	const month = dateObject.getMonth() + 1;
	const day = dateObject.getDate();
	const date = `${year}-${month}-${day}`;
	
	var runningTime = ZU.xpath(doc, "//*[@id='duration_time']");
	runningTime = runningTime[0].innerText;
	var url = ZU.xpath(doc, "/html/head/meta[6]");
	url = url[0].getAttribute('content');
	var programTitle = ZU.xpath(doc, "//head/title");
	programTitle = programTitle[0].innerText.split(' - ')[1];
	
	var show_notes_content = ZU.xpath(doc, "//*[contains(@class, 'section show_notes')]");
	show_notes_content = show_notes_content[0].innerHTML;
	const newContent = `<h1>Show notes of ${title}_${programTitle}@${date}</h1>`; 
	const note_content1 = newContent + show_notes_content;
	const note_content2 = `<h1>After-listen notes of ${title}_${programTitle}@${date}</h1><p></p>`; 

	var newItem = new Zotero.Item("radioBroadcast");
	newItem.title = title;
	newItem.abstractNote = abstractNote;
	newItem.date = date;
	newItem.runningTime = runningTime;
	newItem.url = url;
	newItem.creators = [{ lastName: programTitle, creatorType: "director", fieldMode: 1 }]
	newItem.programTitle = programTitle
	newItem.notes.push({note:note_content1}); 
	newItem.notes.push({note:note_content2}); 
	newItem.complete();		
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://pca.st/xelg96k2",
		"detectedItemType": "podcast",
		"items": [
			{
				"itemType": "podcast",
				"title": "装修踩过啥坑？《房产达人》帮你回忆",
				"creators": [
					{
						"lastName": "超级游文化",
						"creatorType": "podcaster",
						"fieldMode": 1
					}
				],
				"abstractNote": "播客公社出品，每周六更新。畅谈游戏背后的文化与生活，交流与建议请搜索播客公社，私信注明“超游”",
				"extra": "Friday 30 June 2023",
				"runningTime": "01:22:35",
				"url": "https://pca.st/xelg96k2",
				"attachments": [],
				"tags": [],
				"notes": [
					{
						"note": "<p>【制作团队】</p><p>主播：野人、金花、小朱、恶霸波</p><p>后期：恶霸波</p><p>【本集内容】</p><p>野哥这期节目现身说法，分享了一下自己装修踩过的坑。兄弟们听了都可开心了……</p><p>废话不多说，先上图，野哥看了下面的效果图，燃起了自己的斗志！</p><p><img src=\"http://imagev2.xmcdn.com/storages/1fa3-audiofreehighqps/7E/99/GKwRIUEIdI8bAAe3LwIxS4Uq.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/cb51-audiofreehighqps/DE/D4/GKwRIDoIdI8pAANcVQIxS4yx.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/40be-audiofreehighqps/29/83/GKwRIJIIdI86AAgaXwIxS5S2.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/0943-audiofreehighqps/BF/EF/GMCoOSAIdI9GAAZdkgIxS5pI.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/efe9-audiofreehighqps/CB/AD/GMCoOSYIdI9TAAd7ZwIxS6Ca.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p>然而！！！</p><p>理想很丰满，现实很骨感！</p><p>让我们再看看野哥千辛万苦装好的实际结果！</p><p>上图！</p><p><img src=\"http://imagev2.xmcdn.com/storages/56d1-audiofreehighqps/C5/9F/GMCoOSUIdI-PAAartQIxS74o.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/cc09-audiofreehighqps/1A/00/GMCoOSAIdI-gAA9dSAIxS8a4.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/aa5c-audiofreehighqps/D4/3F/GKwRIaIIdI-xAAZZgAIxS82Q.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/119e-audiofreehighqps/F0/2F/GKwRIaIIdI_KAALhuQIxS9d-.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/334b-audiofreehighqps/2D/3A/GMCoOSAIdI_iAAWK8wIxS-LX.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p><img src=\"http://imagev2.xmcdn.com/storages/f9f7-audiofreehighqps/4F/55/GMCoOSYIeAo2AAJDcQIyiG9L.jpg!op_type=4&amp;device_type=ios&amp;upload_type=attachment&amp;name=mobile_large\" alt=\"\"><br></p><p>怎么说呢……</p><p>我挺同情野哥的……</p><p>希望大家评论区就不要再刺激野哥了……</p>"
					}
				],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
