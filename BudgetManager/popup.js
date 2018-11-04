$(function(){

    chrome.storage.sync.get(['total', 'limit'], function(budget){
         $('#total').text(budget.total);
         $('#limit').text(budget.limit);
    })


    $('#spendAmount').click(function(){
        // total is some variable stored in chrome storage
        // expects a callback function as a second parameter
        //  will have a object in its parameter.
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0;
            if(budget.total){
                console.log("entering tot");
                newTotal += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }

            //as sson as user enter the value we are checking the value
            // if it exceeds the limit
            // console.log("entering");
            chrome.storage.sync.set({'total': newTotal}, function(){
                if(amount && newTotal >= budget.limit){
                    // console.log("entering");
                    var notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: 'Reached your limit!!!'
                    }
                chrome.notifications.create('limitNotif', notifOptions);

                // var notification = webkitNotifications.createNotification(
                //     // '48.png',  // icon url - can be relative
                //     // 'Hello!',  // notification title
                //     // 'Lorem ipsum...'  // notification body text
                //     'icon48.png',
                //     'Limit reached!',
                //     "Reached your limit!!"
                //   );

                //   notification.show();
                };
            });

            // chrome.notifications.clear('limitNotif');

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});