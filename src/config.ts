import * as fs from 'fs';
import { configPath, setNick, client } from './index';

interface ConfigTemplate {
  lang?: 'EN' | 'DE' | 'FR';
  useLangNick?: boolean;
  configChannel?: string;
  t2sChannel?: string;
}

const template: ConfigTemplate = {
  lang: 'EN',
  useLangNick: false,
  configChannel: 't2s-config',
  t2sChannel: 'text-to-speech',
};

export class GroupConfig {
  private _configFile: any = this.readJson();
  private _config: ConfigTemplate;
  private _gId: string;
  constructor(id: string, config?: ConfigTemplate) {
    if (!this._configFile[id]) {
      this._configFile[id] = { ...template, ...config };
    }
    this._gId = id;
    this._config = this._configFile[id];
    this.writeJson();
  }
  private readJson(): Object {
    return JSON.parse(fs.readFileSync(configPath).toString());
  }
  private writeJson(): void {
    fs.writeFileSync(configPath, JSON.stringify(this._configFile, null, 2));
  }
  updateLangNick(): void {
    const s = this.getUseLangNick();
    setNick(
      this._gId,
      `${client.user.username}${s ? ` [${this.getLang()}]` : ''}`,
    );
  }
  logConfig(): void {
    console.log(this._config);
  }
  setLang(lang: 'EN' | 'DE' | 'FR'): void {
    this._config.lang = lang;
    this.updateLangNick();
    this.writeJson();
  }
  setUseLangNick(use: boolean): void {
    this._config.useLangNick = use;
    this.updateLangNick();
    this.writeJson();
  }
  setConfigChannel(name: string): void {
    this._config.configChannel = name;
    this.writeJson();
  }
  setT2SChannel(name: string): void {
    this._config.t2sChannel = name;
    this.writeJson();
  }
  getLang(): string {
    return this._config.lang;
  }
  getUseLangNick(): boolean {
    return this._config.useLangNick;
  }
  getConfigChannel(): string {
    return this._config.configChannel;
  }
  getT2SChannel(): string {
    return this._config.t2sChannel;
  }
  get(): Object {
    return this._config;
  }
}
