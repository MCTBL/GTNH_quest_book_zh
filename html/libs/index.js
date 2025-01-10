var copyStr = (str) => {
	var input = str + "";
	const el = document.createElement("textarea");
	el.value = input;
	el.setAttribute("readonly", "");
	el.style.position = "absolute";
	el.style.left = "-9999px";
	el.style.fontSize = "12pt";
	const selection = getSelection();
	var originalRange;
	if (selection.rangeCount > 0) {
		originalRange = selection.getRangeAt(0);
	}
	document.body.appendChild(el);
	el.select();
	el.selectionStart = 0;
	el.selectionEnd = input.length;
	var success = false;
	try {
		success = document.execCommand("copy");
	} catch (err) {}

	document.body.removeChild(el);
	if (originalRange) {
		selection.removeAllRanges();
		selection.addRange(originalRange);
	}
};
var chart_this_chart = echarts.init(document.getElementById("this_chart"), "white", { renderer: "canvas" });

chart_this_chart.on("click", function (params) {
	console.log(params);
	if (params.dataType === "node" && window.openCopyNode === true) {
		let str = params.data.tooltip.replaceAll("<br/>", "");
		copyStr(str);
	}
});

if (option_this_chart) {
	chart_this_chart.setOption(option_this_chart);
} else {
	console.error("内容丢失");
}
window.addEventListener("resize", function () {
	chart_this_chart.resize();
});
