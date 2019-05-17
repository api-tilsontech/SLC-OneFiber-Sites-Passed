jQuery.ajax({
    type: "POST",
    url: "https://sitetraker-tilson.my.salesforce.com/services/data/v45.0/jobs/ingest/",
    data: {
        "operation": "upsert",
        "object": "strk__Site__c",
        "externalIdFieldName": "API_External_ID__c",
        "contentType": "CSV"
    },
    dataType: 'json',
    log: {
        "sanitize": [
            "request.headers.Authorization"
        ]
    },
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', "OAuth " + session);
        xhr.setRequestHeader('Accept', "application/json");
        //usually not needed but when you are
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET');

    },
    success: function (data) {
        alert("Successfully Updated")
        console.log(data);
    }
});