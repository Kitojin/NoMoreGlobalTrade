const SettingsUI = require('tera-mod-ui').Settings;

module.exports = function noMoreGlobalTrade(mod) {
	mod.hook('S_CHAT', 3, e => {
		if (
			!mod.settings.enabled ||
			e.channel !== 27 ||
			!/(wts|wtb|wtt)/gi.test(e.message.toLowerCase())
		)
			return;
		e.channel = mod.settings.redirectToTradeChat ? 4 : e.channel;
		return mod.settings.redirectToTradeChat;
	});

	mod.command.add('gt', {
		$default(state) {
			if (ui) {
				ui.show();
			} else {
				mod.settings.enabled = state
					? state.toLowerCase() === 'on'
					: !mod.settings.enabled;
				mod.log(
					`Trading in global chat ${
						mod.settings.enabled ? 'allowed' : 'blocked'
					}`,
				);
			}
		},
		redirect(state) {
			mod.settings.redirectToTradeChat = state
				? state.toLowerCase() === 'on'
				: !mod.settings.redirectToTradeChat;
			if (mod.settings.redirectToTradeChat) mod.settings.enabled = true;
			mod.log(
				`Redirecting trades into trade chat ${
					mod.settings.redirectToTradeChat ? 'en' : 'dis'
				}abled`,
			);
		},
	});

	let ui = null;
	if (global.TeraProxy.GUIMode) {
		ui = new SettingsUI(mod, require('./settings_structure'), mod.settings, {
			height: 232,
		});
		ui.on('update', settings => {
			if (settings.redirectToTradeChat) settings.enabled = true;
			mod.settings = settings;
		});

		this.destructor = () => {
			if (ui) {
				ui.close();
				ui = null;
			}
		};
	}
};
