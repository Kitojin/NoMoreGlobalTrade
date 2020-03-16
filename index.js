module.exports = function noMoreGlobalTrade(mod) {
	mod.hook('S_CHAT', 3, e => {
		if (!mod.settings.enabled) return;
		if (e.channel != 27) return;
		return !e.message.toLowerCase().includes(/^(wts|wtb|wtt)/g);
	});

	mod.command.add('globaltrade', (args) => {
		mod.settings.enabled != mod.settings.enabled;
		mod.log(`Trading in global chat ${mod.settings.enabled ? 'allowed' : 'blocked'}`);
	});
}