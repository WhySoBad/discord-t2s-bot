import { VoiceChannel } from 'discord.js';
const tts = require('google-tts-api');
import { GroupConfig } from './config';

let queue: { url: string; vc: VoiceChannel }[] = [];
startQueue();

const synthesize = async (text: string, lang: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    tts(text, lang, 1)
      .then((url: string) => resolve(url))
      .catch((err: string) => {
        console.log(err);
        reject(err);
      });
  });
};

const T2S = (
  text: string,
  voicechannel: VoiceChannel,
  config: GroupConfig,
): void => {
  synthesize(text, config.getLang())
    .then((url) => queue.push({ url: url, vc: voicechannel }))
    .catch();
};

async function startQueue(): Promise<void> {
  if (queue.length != 0) {
    let cur = queue.shift();
    await play(cur.url, cur.vc);
  }
  await delay(500);
  startQueue();
}

async function play(url: string, vc: VoiceChannel): Promise<any> {
  console.log(url); //Debug only
  return new Promise((resolve, reject) => {
    vc.join()
      .then((con): void => {
        const pl = con.play(url);
        pl.once('finish', () => {
          vc.leave();
          resolve();
        });
      })
      .catch((err) => reject(err));
  });
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default T2S;
