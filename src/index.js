import {Sticker} from "./lib/util.js";
/**
 * follow igwe saya hardianto02_
 * @param {String} categoryName nama sticker nya apa?
 * @returns {Promise<{name: string, title: string, result: Array<{link_download: string}}>}
 */
export const getSticker = async (categoryName) => {
    return new Promise(async (resolve, reject) => {
    const sticker = new Sticker();
    const result = await sticker.parseStickerByNameCategory("cat");
    const result2 = await sticker.getSticker(result);
    const result3 = await sticker.parseUrlDownload(result2);
    resolve(result3);
    })
}