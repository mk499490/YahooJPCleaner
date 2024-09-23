// 設定画面を開いたときの処理
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('input[name="checkItem"]').forEach(element => element.addEventListener('click', getSelectedValues))
})

// 設定取得
window.onload = async(e) => {
	let items = await chrome.storage.sync.get(null)
	var allKeys = Object.keys(items)
	console.log(allKeys)
	for (let i = 0; i < allKeys.length; i++) {
		await chrome.storage.sync.get(allKeys[i], function(value) {
			console.log(Object.values(value))
			if (Object.values(value)[0] == true) {
				let element = document.getElementById(allKeys[i])
				console.log(element)
				document.getElementById(allKeys[i]).checked = true
			}
		})
	}
}

async function getSelectedValues() {
	let settings = {};

	let items = document.querySelectorAll(
		'input[name="checkItem"]'
	)

	let checkedItems = document.querySelectorAll(
	'input[name="checkItem"]:checked'
	)

	for (let i = 0; i < items.length; i++) {
		for (let j = 0; j < checkedItems.length; j++) {
			if (items[i].value == checkedItems[j].value) {
				settings[items[i].value] = true
				break
			}
		}

		if (settings[items[i].value] != true) {
			settings[items[i].value] = false
		}
	}

	console.log(settings)
	await chrome.storage.sync.set(settings).then(console.log("saved"))
}