import { VoiceChannel } from 'discord.js';
const tts = require('google-tts-api');
import { GroupConfig } from './config';

export class T2S {
  private _config: GroupConfig;
  private _text: string;
  private _vc: VoiceChannel;
  private _queue: string[] = [];
  private _cur: string;
  private _idle: number = 0;
  private _inVC: boolean = false;

  constructor(config: GroupConfig) {
    this._config = config;
    this.shift();
  }
  private async synthesize(): Promise<string> {
    return new Promise((resolve, reject) => {
      tts(this._text, this._config.getLang(), this._config.getT2SSpeed())
        .then((url: string) => resolve(url))
        .catch((err: string) => reject(err));
    });
  }
  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
  private async play(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._vc
        .join()
        .then((con): void => {
          this._inVC = true;
          con.play(url).once('finish', () => resolve());
        })
        .catch((err) => reject(err));
    });
  }
  private async shift(): Promise<void> {
    await this.delay(1000);
    if (this._inVC) this._idle++;
    if (this._queue.length > 0) {
      this._cur = this._queue.shift();
      await this.play(this._cur);
      this._idle = 0;
    }
    if (this._idle == this._config.getIdleTimeout()) {
      this._vc.leave();
      this._inVC = false;
    }
    this.shift();
  }
  add(text: string, voicechannel: VoiceChannel): void {
    this._vc = voicechannel;
    this._text = text;
    this.synthesize().then((url) => this._queue.push(url));
  }
}