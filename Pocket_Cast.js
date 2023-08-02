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
