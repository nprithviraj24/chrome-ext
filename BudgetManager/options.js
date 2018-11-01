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
})