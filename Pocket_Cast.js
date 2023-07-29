{
	"translatorID": "64099898-b865-49c5-a765-cdb80f69a7d4",
	"label": "Pocket Cast",
	"creator": "Amanda Chen",
	"target": "https://pca.st/.*",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsbv",
	"lastUpdated": "2023-07-29 20:55:00"
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
	return 'podcast';
}

async function doWeb(doc, url) {
	if (detectWeb(doc, url) === "podcast") {
		scrape(doc, url);
	}
}

async function scrape(doc, url = doc.location.href) {
	var title = ZU.xpath(doc, "//head/title"); 
    title = title[0].innerText.split(' - ')[0];  
    var abstractNote = ZU.xpath(doc, "/html/head/meta[3]");  
    abstractNote = abstractNote[0].getAttribute('content'); 
    var accessDate = ZU.xpath(doc, "//*[@id='episode_date']");
    accessDate = accessDate[0].innerText;
	var runningTime = ZU.xpath(doc, "//*[@id='duration_time']");
	runningTime = runningTime[0].innerText;
	var url = ZU.xpath(doc, "/html/head/meta[6]");
	url = url[0].getAttribute('content');
	var creators = ZU.xpath(doc, "//head/title");
	creators = creators[0].innerText.split(' - ')[1];
	var note_content = ZU.xpath(doc, "//*[contains(@class, 'section show_notes')]");
	note_content = note_content[0].innerHTML;
	note_content = note_content.replace(/\"/g, "'");
	note_content = note_content.replace(/<img .*?src='(.*?)'.*?>/g, "<img src='$1'\/>");


	var newItem = new Zotero.Item("podcast");
	newItem.title = title;
	newItem.abstractNote = abstractNote;
	newItem.extra = accessDate;
	newItem.runningTime = runningTime;
	newItem.url = url;
	newItem.creators = [{ lastName: creators, creatorType: "podcaster", fieldMode: 1 }]
    newItem.notes.push({note:note_content}); 
    newItem.complete();
}

