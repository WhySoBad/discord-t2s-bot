import {
  Client,
  Guild,
  TextChannel,
  VoiceChannel,
  Message,
  GuildMember,
} from 'discord.js';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { GroupConfig } from './config';
import { configCommand, t2sCommand } from './commands';
import { T2S } from './t2s';
dotenv.config();
const token: string = process.env.BOT_TOKEN;
export const client: Client = new Client();
export const configPath: string = `${path.dirname(
  __dirname,
)}\\groupConfig.json`;

client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
      type: 'PLAYING',
      name: 'text to speech',
    },
  });
});

let g: Guild;
let c: any;
let vC: VoiceChannel;
let gConfig: GroupConfig;
let gT2S: T2S;

client.on('message', (message: Message) => {
  if (message.author.bot) return;
  c = message.channel;
  g = message.guild;
  vC = message.member.voice.channel;
  gConfig = gConfig ? gConfig : new GroupConfig(g.id, { useLangNick: true });
  gT2S = gT2S ? gT2S : new T2S(gConfig);
  gConfig.updateLangNick();
  const { configChannel, t2sChannel }: any = gConfig.get();
  g.channels.cache.forEach((channel) => {
    if (channel.id == c.id) {
      const cmd: string = message.content.split(' ')[0];
      const msg: string = message.content.substring(
        cmd.length + 1,
        message.content.length,
      );
      const cN: string = channel.name.toLowerCase();
      if (cN === configChannel) {
        sendMessage(c, configCommand(cmd, msg, gConfig));
      } else if (cN === t2sChannel) {
        if (!vC) {
          sendMessage(c, t2sCommand('noVC', gConfig));
          return;
        } else if (message.content.length > 200) {
          sendMessage(c, t2sCommand('tMC', gConfig));
          return;
        } else if (
          message.attachments.size > 0 ||
          message.embeds.length > 0 ||
          message.mentions.users.first()
        ) {
          return;
        } else {
          gT2S.add(message.content, vC);
        }
      }
    }
  });
});
export const setNick = (
  guild: string | Guild,
  nick: string,
  id: string = client.user.id,
): void => {
  let g: Guild =
    typeof guild === 'string' ? client.guilds.cache.get(guild) : guild;
  g.members.cache.array().forEach((member: GuildMember) => {
    if (member.user.id == id) member.setNickname(nick);
  });
};

export const sendMessage = (channel: TextChannel, message: string): void => {
  if (message === '') return;
  channel.send(message).catch((reason) => {
    console.log(reason);
  });
};

client.login(token);
