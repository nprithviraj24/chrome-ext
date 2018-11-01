$(function(){

    chrome.storage.sync.get(['total', 'limit'], function(budget){
         $('#total').text(budget.total);
         $('#limit').text(budget.limit);
    })


    $('#spendAmount').click(function(){
        // total is some variable stored in chrome storage
        // expects a callback function as a second parameter
        //  will have a object in its parameter.
        chrome.storage.sync.get('total', function(budget){
            var newTotal = 0;
            if(budget.total){
                newTotal += parseInt(budget.total);
            }
            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total': newTotal});

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});