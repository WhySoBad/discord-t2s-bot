import { GroupConfig, SpeakingSpeed } from './config';

const fb: any = {
  lang: {
    EN: 'The current text-to-speech language is `English`',
    DE: 'Die derzeitige text-to-speech Sprache ist `Deutsch`',
    FR: 'La langue de text-to-speech actuelle est le `français`',
  },
  setlang: {
    err: {
      EN: "This isn't an available language `<setlang EN/DE/FR>`",
      DE: 'Dies ist keine verfügbare Sprache `<setlang EN/DE/FR>`',
      FR: "Ce n'est pas une langue disponible `<setlang EN/DE/FR>`",
    },
    suc: {
      EN: 'The language was changed to `English`',
      DE: 'Die Sprache wurde zu `Deutsch` geändert',
      FR: 'La langue a été changé en `français`',
    },
  },
  configchannel: {
    EN: `The current config channel is \`%g\``,
    DE: `Der momentane config-Kanal heisst \`%g\``,
    FR: `Le canal de configuration actuel est appelé \`%g\``,
  },
  setconfigchannel: {
    EN: `The config channel was changed to \`%m\``,
    DE: `Der Einstellungs Kanal wurde zu \`%m\` geändert`,
    FR: `Le canal de configuration a été changé en \`%m\``,
  },
  t2schannel: {
    EN: `The current text-to-speech channel is \`%g\``,
    DE: `Der derzeitige text-to-speech Kanal ist \`%g\``,
    FR: `Le canal de text-to-speech actuel est \`%g\``,
  },
  sett2schannel: {
    EN: `The text-to-speech channel was changed to \`%m\``,
    DE: `Der text-to-speech Kanal wurde zu \`%m\` geändert`,
    FR: `Le canal de text-to-speech à été changé en \`%m\``,
  },
  uselangnick: {
    EN: `The bot shows the language in the nickname: \`%b\``,
    DE: `Der Bot zeigt die Sprache im Nicknamen: \`%b\``,
    FR: `Le bot montre la langue dans le surnom: \`%b\``,
  },
  setuselangnick: {
    alr: {
      EN: `useLangNick is already set to \`%s\``,
      DE: `useLangNick ist bereits \`%s\``,
      FR: `useLangNick est déjà \`%s\``,
    },
    err: {
      EN: `This isn't a valid value for useLangNick \`<setUseLangNick true/false>\``,
      DE: `Dies ist kein verfügbarer Wert für useLangNick \`<setUseLangNick true/false>\``,
      FR: `Ce n'est pas une valeur disponible pour useLangNick \`<setUseLangNick true/false>\``,
    },
    suc: {
      EN: `useLangNick was changed to \`%s\``,
      DE: `useLangNick wurde zu \`%s\` geändert`,
      FR: `useLangNick a été changé en \`%s\``,
    },
  },
  idletimeout: {
    EN: `The current idleTimeout is \`%t\`s`,
    DE: `Das derzeitige idleTimeout ist \`%t\`s`,
    FR: `L'actuel idleTimeout est \`%t\`s`,
  },
  setidletimeout: {
    err: {
      EN: `This isn't a valid number \`<setIdleTimeout [seconds]>\``,
      DE: `Dies ist keine gültige Zahl \`<setIdleTimeout [seconds]>\``,
      FR: `Ce n'est pas un numéro valide \`<setIdleTimeout [seconds]>\``,
    },
    suc: {
      EN: `The idleTimeout is now \`%t\`s`,
      DE: `Das idleTimeout beträgt nun \`%t\`s`,
      FR: `Le idleTimeout est maintenant \`%t\`s`,
    },
  },
  speed: {
    EN: `The current speaking speed is \`%s\``,
    DE: `Die derzeitige Sprechgeschwindigkeit beträgt \`%s\``,
    FR: `Le taux de parole actuel est \`%s\``,
  },
  setspeed: {
    alr: {
      EN: `The speaking speed is already \`%s\``,
      DE: `Die Sprechgeschwindigkeit ist bereits \`%s\``,
      FR: `Le taux de parole est déjà \`%s\``,
    },
    suc: {
      EN: `The speaking speed was set to \`%s\``,
      DE: `Die Sprechgeschwindigkeit wurde zu \`%s\` geändert`,
      FR: `La vitesse de parole a été réglée sur \`%s\``,
    },
    err: {
      EN: `This isn't a valid speaking speed`,
      DE: `Dies ist keine gültige Sprechgeschwindigkeit`,
      FR: `Ce n'est pas un taux de parole valide`,
    },
  },
  help: {
    EN: `A detailed list with all existing commands can be found here: https://github.com/WhySoBad/discord-t2s-bot/tree/master#Commands`,
    DE: `Eine detaillierte Liste mit allen verfügbaren Befehlen kann hier gefunden werden: https://github.com/WhySoBad/discord-t2s-bot/tree/master#Commands`,
    FR: `Une liste détaillée de toutes les commandes disponibles peut être trouvée ici: https://github.com/WhySoBad/discord-t2s-bot/tree/master#Commands`,
  },
  novc: {
    EN: `You have to be in a voice channel to use text-to-speech`,
    DE: `Du musst in einem Sprachkanal sein um text-to-speech benutzen zu können`,
    FR: `Vous devez être dans un canal vocal pour utiliser text-to-speech`,
  },
  tmc: {
    EN: `The message has a maximum of 200 characters`,
    DE: `Die Nachricht darf maximal 200 Zeichen lang sein`,
    FR: `Le message peut comporter jusqu'à 200 caractères`,
  },
};

export const configCommand = (
  command: string,
  message: string,
  config: GroupConfig,
): string => {
  const l: string = config.getLang();
  const cC: string = config.getConfigChannel();
  const t2sC: string = config.getT2SChannel();
  const uLN: boolean = config.getUseLangNick();
  const cmd: string = command.toLowerCase();
  const iTO: number = config.getIdleTimeout();
  const s: number = config.getT2SSpeed();
  switch (command.toLowerCase()) {
    case 'lang':
      return fb[cmd][l];
    case 'setlang':
      switch (message.substring(0, 2).toUpperCase()) {
        case 'DE':
          config.setLang('DE');
          return fb[cmd].suc['DE'];
        case 'EN':
          config.setLang('EN');
          return fb[cmd].suc['EN'];
        case 'FR':
          config.setLang('FR');
          return fb[cmd].suc['FR'];
        default:
          return fb[cmd].err[l];
      }
    case 'configchannel':
      return fb[cmd][l].replace('%g', cC);
    case 'setconfigchannel':
      config.setConfigChannel(message);
      return fb[cmd].replace('%m', message);
    case 't2schannel':
      return fb[cmd][l].replace('%g', t2sC);
    case 'sett2schannel':
      config.setT2SChannel(message);
      return fb[cmd][l].replace('%m', message);
    case 'uselangnick':
      return fb[cmd][l].replace('%b', uLN);
    case 'setuselangnick':
      if (message.substring(0, 5).toLowerCase() === 'false') {
        if (!uLN) return fb[cmd].alr[l].replace('%s', false);
        config.setUseLangNick(false);
        return fb[cmd].suc[l].replace('%s', false);
      } else if (message.substring(0, 4).toLowerCase() === 'true') {
        if (uLN) return fb[cmd].alr[l].replace('%s', true);
        config.setUseLangNick(true);
        return fb[cmd].suc[l].replace('%s', true);
      } else {
        return fb[cmd].err[l];
      }
    case 'idletimeout':
      return fb[cmd][l].replace('%t', iTO);
    case 'setidletimeout':
      let newTimeout = parseFloat(message.split(' ')[0]);
      if (!isNaN(newTimeout)) {
        config.setIdleTimeout(newTimeout);
        return fb[cmd].suc[l].replace('%t', newTimeout);
      } else {
        return fb[cmd].err[l];
      }
    case 'speed':
      return fb[cmd][l].replace('%s', s == 1 ? 'fast' : 'slow');
    case 'setspeed':
      let newSpeed = message.split(' ')[0].toLowerCase();
      if (newSpeed == 'fast') {
        if (s === SpeakingSpeed.FAST) {
          return fb[cmd].alr[l].replace('%s', newSpeed);
        } else {
          config.setT2SSpeed(SpeakingSpeed.FAST);
          return fb[cmd].suc[l].replace('%s', newSpeed);
        }
      } else if (newSpeed == 'slow') {
        if (s === SpeakingSpeed.SLOW) {
          return fb[cmd].alr[l].replace('%s', newSpeed);
        } else {
          config.setT2SSpeed(SpeakingSpeed.SLOW);
          return fb[cmd].suc[l].replace('%s', newSpeed);
        }
      } else {
        return fb[cmd].err[l];
      }

    default:
      return fb['help'][l];
  }
};

export const t2sCommand = (error: string, config: GroupConfig): string => {
  const l = config.getLang();
  switch (error.toLowerCase()) {
    case 'novc':
      return fb['novc'][l];
    case 'tmc':
      return fb['tmc'][l];
    default:
      return '';
  }
};
