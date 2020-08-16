# discord-t2s-bot

> A simple discord text-to-speech bot for your discord server

## Configuration

For default the config channel is called `t2s-config` and the text to speech channel is called `text-to-speech`.
This names can be changed in the config channel using [commands](#commands).

## Commands

The bot has a few commands which are executed by typing the command in the config channel.

### lang

The `lang` command returns the current bot language. The default language is English _(feedback and text-to-speech language)_.

### setLang

The `setLang [languageCode]` command changes the bot's language using a [languageCode](#languageCodes).

### configChannel

The `configChannel` command returns the name of the current config channel. The default name is `t2s-config`.

### setConfigChannel

The `setConfigChannel [name]` command changes the name of the config channel.

### T2SChannel

The `T2SChannel` command returns the name of the current text to speech. The default name is `text-to-speech`.

### setT2SChannel

The `setT2SChannel [name]` command changes the name of the text to speech channel.

### useLangNick

The `useLangNick` command returns whether the bot shows the current [languageCode](#languageCodes) in the nickname or not. The default is `true`.

### setUseLangNick

The `setUseLangNick [name]` command changes whether the bot shows the current [languageCode](#languageCodes) in the nickname or not.

### idleTimeout

The `idleTimeout` command returns the current idle time until the bot leaves a VoiceChannel. The default is 12 seconds

### setIdleTimeout

The `setIdleTimeout [seconds]` command changes the idle time until the bot leaves a VoiceChannel.

### speed

The `speed` command returns the current speaking speed. Default is fast.

### setSpeed

The `setSpeed [fast/slow]` command sets the speaking speed to fast or slow.

### help

The `help` command redirects you to this list.

## languageCodes

Your language is missing or contains translation errors? No problem, feel free to open a pull request in which your language is intigrated or possible errors are fixed.
If you want to add a new language to the bot, please make sure the language is available on [google translate](https://translate.google.com/).

- `EN` (English)
- `DE` (German)
- `FR` (French)
