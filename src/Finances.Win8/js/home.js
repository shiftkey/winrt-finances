(function () {
    "use strict";

    var ui = WinJS.UI;
    var nav = WinJS.Navigation;
    var today = new Date();

    function menuLink(e) {
        e.preventDefault();
        var link = e.target;
        nav.navigate(link.href);
    };

    function showReport(from) {
        nav.navigate("/html/reports.html", { start: from, end: today } );
    };

    function navigateToLastWeek(e) {
        e.preventDefault();
        var lastweek = new Date().setDate(today.getDate() + 7);
        showReport(lastweek);
    };

    function navigateToLastMonth(e) {
        e.preventDefault();
        var thismonth = new Date(today.getYear(), today.getMonth(), 1, 0, 0, 0, 0);
        showReport(thismonth);
    };

    function navigateToThisYear(e) {
        e.preventDefault();
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

            var items = element.querySelector(".notifications ul");
            var width = 0;

            for (var i = 0; i < items.children.length; i++) {
                var child = items.children[i];
                width = width + child.offsetWidth;
            }

            items.style.width = width + "px";

            var notifications = element.querySelector(".notifications");
            var container = element.querySelector("section[role=main]");
            element.querySelector("#dismiss").onclick = function () { container.removeChild(notifications); };
        }
    });
})();
