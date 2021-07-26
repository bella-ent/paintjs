const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const newColors = document.getElementsByClassName("newAddColors");
const colorContainer = document.getElementById("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const clearBtn = document.getElementById("jsClear");
const color_front = document.getElementById("color_front");
const colorPicker = document.getElementById("colorPicker");
const colorSaveBtn = document.getElementById("saveRandom");
const INITIAL_COLOR = "#2c2c2c";
let colorSavedRandom = "#000000";
let newColorArray = [];

//? Random background colors
const BG_colors = [
	"#ABDEE6",
	"#CBAACB",
	"#FFFFB5",
	"#55CBCD",
	"#FF968A",
	"#FFDBCC",
	"#ECEAE4",
	"#f6f9fc",
];
const chosen_bgColor = BG_colors[Math.floor(Math.random() * BG_colors.length)];

document.body.style.backgroundColor = chosen_bgColor;

canvas.width = 700;
canvas.height = 600;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
	painting = true;
}

function stopPainting(event) {
	painting = false;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMoveTouch(event) {
	event.preventDefault();
	const x = event.changedTouches[0].pageX - canvas.getBoundingClientRect().left;
	const y = event.changedTouches[0].pageY - canvas.getBoundingClientRect().top;

	if (painting === false) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMouseDown(event) {
	painting = true;
}

function handleRangeChange(event) {
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleModeClick() {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function handleCM(event) {
	event.preventDefault();
}

function handleSaveClick() {
	const image = canvas.toDataURL("image/png");
	const link = document.createElement("a");
	link.href = image;
	link.download = "PaintJS[EXPORT]";
	link.click();
}

function clearCanvas() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clickInput() {
	colorPicker.click();
}

function changeColor(event) {
	color_front.style.backgroundColor = event.target.value;
	colorSavedRandom = event.target.value;
	ctx.strokeStyle = colorSavedRandom;
	ctx.fillStyle = colorSavedRandom;
}

function saveColor() {
	const newColor = document.createElement("div");
	newColor.classList.add("controls__color");
	newColor.classList.add("jsColor");
	newColor.classList.add("newAddColors");
	newColor.style.backgroundColor = colorSavedRandom;
	colorContainer.appendChild(newColor);
	newColorArray.push(newColor);
	newColorArray.forEach((color) =>
		color.addEventListener("click", handleColorClick)
	);
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);

	canvas.addEventListener("touchmove", onMoveTouch);
	canvas.addEventListener("touchstart", startPainting);
	canvas.addEventListener("touchend", stopPainting);
}

Array.from(colors).forEach((color) =>
	color.addEventListener("click", handleColorClick)
);

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}

if (clearBtn) {
	clearBtn.addEventListener("click", clearCanvas);
}

if (color_front) {
	color_front.addEventListener("click", clickInput);
}

if (colorPicker) {
	colorPicker.addEventListener("change", changeColor);
}

if (colorSaveBtn) {
	colorSaveBtn.addEventListener("click", saveColor);
}
