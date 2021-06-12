function uselessWebButton(button, popup) {
	var buttonElement = button
	var popupElement = popup
	var initialClick = false
	var randomRange = 7

	var sitesList = [
		"https://ritunda.com/",
		
	]

	var sites = null

	// Prepares and binds the button
	var init = function () {
		button.onclick = onButtonClick

		// Initial set sites
		sites = sitesList.slice()

		if (localStorage["currentSiteList"]) {
			// They have storage, filter out any not in the base list, that could be spam now
			var currentSites = JSON.parse(localStorage["currentSiteList"])
			var filteredSites = currentSites.filter(
				(site) => sitesList.indexOf(site) !== -1
			)
			if (filteredSites.length > 0) {
				sites = filteredSites
			}
		}
	}

	// Selects and removes the next website from the list
	var selectWebsite = function () {
		var site, range, index

		range = randomRange > sites.length ? sites.length : randomRange
		index = Math.floor(Math.random() * range)

		site = sites[index]
		sites.splice(index, 1)

		return site
	}

	var openSite = function (url) {
		window.open(url)
	}

	var onButtonClick = function () {
		if (window.gtag) {
			gtag("event", "click", { event_category: "button" })
		}

		if (initialClick === false) {
			// Change text from "TO A"
			document.getElementById("joint").innerHTML = "TO ANOTHER"
			initialClick = true
		}

		var url = selectWebsite()
		openSite(url)

		// User has visited ALL the sites... refresh the list.
		if (sites.length == 0) {
			sites = sitesList.slice()
		}

		localStorage["currentSiteList"] = JSON.stringify(sites)
	}

	init()
}

var uselessWebButton = new uselessWebButton(document.getElementById("button"))
;
