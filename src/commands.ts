import { GroupConfig } from './config';

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
  help: {
    EN: `This are all existing commands:\n%c`,
    DE: `Dies sind alle verfügbaren Befehle:\n%c`,
    FR: `Ce sont toutes les commandes disponibles:\n%c`,
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
  const cmds: string[] = [
    'lang',
    'setlang',
    'configChannel',
    'setConfigChannel',
    'T2SChannel',
    'setT2SChannel',
    'useLangNick',
    'setUseLangNick',
    'help',
  ];
  const l: string = config.getLang();
  const cC: string = config.getConfigChannel();
  const t2sC: string = config.getT2SChannel();
  const uLN: boolean = config.getUseLangNick();
  const cmd: string = command.toLowerCase();
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
    default:
      return fb['help'][l].replace('%c', `- ${cmds.join('\n- ')}`);
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
