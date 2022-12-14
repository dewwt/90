const Discord = require('discord.js');
const settings = require("../../configs/settings.json")
let qdb = require("quick.db");
let db = qdb.table("blacklist")
const moment = require("moment")

module.exports = {
    conf: {
      aliases: ["blacklist"],
      name: "blacklist",
      help: "blacklist [ekle/sil] ",
    },

    run: async (client, message, args) => {
        if (settings.owners.some(x => x !== message.author.id)) return
        
const sec = args[0]
    if (sec == "ver" || sec == "ekle") {
        const kisi = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
            if (!kisi) {
                return message.reply("Lütfen bir kişiyi etiketleyiniz").then(x => x.delete({timeout: 5000})).catch(() => { })
            } else {
                if (await db.get(`blacklist.${kisi.id}`)) {
                    return message.reply(`Hata: Etiketlediğiniz kişi zaten karalistede listesinde bulunuyor.`).then(x => x.delete({timeout: 5000})).catch(() => { })
                }
                await db.set(`blacklist.${kisi.id}`, "Aktif")
                message.channel.send(`Başarılı bir şekilde ${entry.executor} adlı kişiyi karalisteye eklediniz`).then(x => x.delete({timeout: 5000})).catch(() => { })
            }
        }
    if (sec == "sil" || sec == "kaldır") {
        const kisi = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0])
            if (!kisi) {
                return message.reply("Lütfen bir kişiyi etiketleyiniz").then(x => x.delete({timeout: 5000})).catch(() => { })
            } else {
                if (!await db.get(`blacklist.${kisi.id}`)) {
                    return message.reply(`Hata: Etiketlediğiniz kişi zaten karalistede bulunmuyor.`).then(x => x.delete({timeout: 5000})).catch(() => { })
                }
                await db.delete(`blacklist.${kisi.id}`)
                message.channel.send(`Başarılı bir şekilde ${entry.executor} adlı kişiyi karalisteden sildiniz`).then(x => x.delete({timeout: 5000})).catch(() => { })
            }
        }
}
}
