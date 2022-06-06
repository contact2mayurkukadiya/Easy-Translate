addContextMenu = () => {
    console.log("context menu added");
    chrome.contextMenus.create({
        id: "Translate",
        title: "Translate",
        contexts: ["selection"],
        visible: true
    })
    chrome.contextMenus.onClicked.addListener(openTranslater)
}

openTranslater = (info, tab) => {
    console.log("info", info);
    console.log("tab", tab);
    try {
        switch (info.menuItemId) {
            case "Translate":
                chrome.tabs.create({ url: "https://translate.google.com/?langpair=it%7Cen&sl=auto&tl=gu&text=" + info.selectionText + "&op=translate" });
                break;
        }
    } catch (error) {
        console.log("error", error);
    }
}


chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        console.log("detail", details);
        addContextMenu()
    } else if (details.reason == "update") {
        //call a function to handle an update
        console.log("detail", details);
        addContextMenu();
    }
});