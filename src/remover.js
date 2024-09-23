window.onload = async(e) => {
	let items = await chrome.storage.sync.get(null)
	var allKeys = Object.keys(items)
	for (let i = 0; i < allKeys.length; i++) {
		await chrome.storage.sync.get(allKeys[i], function(value) {
			if (Object.values(value)[0] == true) {
				console.log(allKeys[i])
				document.getElementById(allKeys[i]).style.display = 'none';
			}
		})
	}
}