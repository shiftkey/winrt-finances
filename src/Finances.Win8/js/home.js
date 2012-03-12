(function () {
    "use strict";

    var ui = WinJS.UI;
    var nav = WinJS.Navigation;

    ui.Pages.define("/html/home.html", {
        ready: function (element, options) {
            element.querySelector("#transactions").onclick = function () { nav.navigate("/html/transactions.html"); };
            element.querySelector("#goals").onclick = function () { nav.navigate("/html/goals.html"); };
            element.querySelector("#reports").onclick = function () { nav.navigate("/html/reports.html"); };

            var today = new Date();

            var lastweek = new Date().setDate(today.getDate() + 7);
            var thismonth = new Date(today.getYear(), today.getMonth(), 1, 0, 0, 0, 0);
            var startOfYear = new Date(today.getFullYear(), 6, 1, 0, 0, 0, 0); // JS month is 0-11 - July 1

            if (startOfYear > today)
                startOfYear.setFullYear(startOfYear.getFullYear() - 1);

            element.querySelector("#lastweek").onclick = function () { nav.navigate("/html/reports.html", { start: thisweek, end: today }); };
            element.querySelector("#thismonth").onclick = function () { nav.navigate("/html/reports.html", { start: thismonth, end: today }); };
            element.querySelector("#yeartodate").onclick = function () { nav.navigate("/html/reports.html", { start: startOfYear, end: today }); };
        },
    });
})();
