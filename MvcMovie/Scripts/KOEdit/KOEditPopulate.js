var urlPath = "/Movies";
 
$(function () {
    ko.applyBindings(KOEdit);
    KOEdit.loadArticles();
});

var KOEdit = {
    Movies: ko.observableArray([]),
 
    loadArticles: function () {
        var self = this;
        //Ajax Call Get All Movies
        $.ajax({
            type: "GET",
            url: urlPath + '/FillIndex',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                $(data).each(function () {
                    var isolatedDateString = this.ReleaseDate.substr(6, (this.ReleaseDate.length - (2 + 6)))
                    this.ReleaseDate = new Date(parseInt(isolatedDateString)).toLocaleDateString();
                });

                self.Movies(data); //Put the response in ObservableArray
            },
            error: function (err) {
                alert(err.status + " : " + err.statusText);
            }
        });
    }
};