$(function(){

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    });

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': limit}, function(){
            //    it is best practices to work with function callbacks
            //  because all the API calls are asynchronous.
                close();
            });
        }
    });

    $("#resetTotal").click(function(){
        chrome.storage.sync.get({'total': 0}, function(){
            var notifOptions = {
                // the variabl notifOptions serves as the object input to
                //  chrome.notifications.create() function
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Total reached!',
                message: 'Total has been reset to zero.' 
            };
            // one is variables and another is object
            chrome.notifications.create('limitNotif', notifOptions);
        })
    })
})