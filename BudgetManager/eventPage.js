var cMenu = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
}

chrome.contextMenus.create(cMenu);

function isInt(value){
    return !isNaN(value) 
        && parseInt(Number(value)) == value && !isNan(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickedDAta){
    if(clickedData.menuItemId == "spendMoney" && clickedData.selectionText){
        if(isInt(clickedDAta.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit){
                        // console.log("entering");
                        var notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon48.png',
                            title: 'Limit reached!',
                            message: 'Reached your limit!!!'
                        }
                    chrome.notifications.create('limitNotif', notifOptions)
                });
            })
        }
    }
});