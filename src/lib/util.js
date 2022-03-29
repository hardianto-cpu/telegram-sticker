const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = class Sticker {
    async parseStickerByNameCategory(categoryName) {
        return new Promise(async (resolve, reject) => {
            const page = Math.floor(Math.random() * 7) + 1;
            const stickers = [];
            const response = await fetch(`https://combot.org/telegram/stickers?page=${page}&q=${categoryName}`);
            const html = await response.text();
            const $ = cheerio.load(html);
            $('body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div').each(function (i, elem) {
                const $$ = $(elem).find('a').attr('href');
                stickers.push($$.replace('https://t.me/addstickers/', ''));
            });
            resolve(stickers);
        })
    }
    async getSticker(url) {
        return new Promise(async (resolve, reject) => {
            const random = url[Math.floor(Math.random() * url.length)]
            const response = await fetch('https://api.telegram.org/bot2116199553:AAHdXig3UMyl7SPKX5aUeMcwEImLvUMypfs/getStickerSet?name=' + random)
            const json = await response.json();
            resolve(json)
        })
    }
    async getStickerById(id) {
        return new Promise(async (resolve, reject) => {
            const response = await fetch('https://api.telegram.org/bot2116199553:AAHdXig3UMyl7SPKX5aUeMcwEImLvUMypfs/getFile?file_id=' + id)
            const json = await response.json();
            resolve(json)
        })
    }
    async parseUrlDownload(taiklu) {
        return new Promise(async (resolve, reject) => {
            const buset = []
            for await (let i of taiklu.result.stickers) {
                const sticker = await this.getStickerById(i.file_id)
                const res = {
                    ...i,
                    link_download: 'https://api.telegram.org/file/bot2116199553:AAHdXig3UMyl7SPKX5aUeMcwEImLvUMypfs/' + sticker.result.file_path,
                }
                buset.push(res)
            }
            delete taiklu.result.stickers
            resolve({
                ...taiklu.result,
                result: buset,
            })
        })
    }
}
