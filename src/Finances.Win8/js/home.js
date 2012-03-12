(function () {
    "use strict";

    var ui = WinJS.UI;
    var nav = WinJS.Navigation;

    function menuLink(e) {
        e.preventDefault();
        var link = e.target;
        nav.navigate(link.href);
    };

    function showReport(from) {
        var today = new Date();
        nav.navigate("/html/reports.html", { start: from, end: today } );
    };

    function navigateToLastWeek(e) {
        e.preventDefault();
        var today = new Date();
        var lastweek = new Date().setDate(today.getDate() + 7);
        showReport(lastweek);
    };

    function navigateToLastMonth(e) {
        e.preventDefault();
        var today = new Date();
        var thismonth = new Date(today.getYear(), today.getMonth(), 1, 0, 0, 0, 0);
        showReport(thismonth);
    };

    function navigateToThisYear(e) {
        e.preventDefault();

        var today = new Date();
        var startOfYear = new Date(today.getFullYear(), 6, 1, 0, 0, 0, 0); // JS month is 0-11 - July 1

        if (startOfYear > today)
            startOfYear.setFullYear(startOfYear.getFullYear() - 1);

        showReport(startOfYear);
    }

    ui.Pages.define("/html/home.html", {
        ready: function (element, options) {
            WinJS.Utilities.query(".menu a").listen("click", menuLink, false);

            element.querySelector("#lastweek").onclick = navigateToLastWeek;
            element.querySelector("#thismonth").onclick = navigateToLastMonth;
            element.querySelector("#yeartodate").onclick = navigateToThisYear;
        }
    });
})();
