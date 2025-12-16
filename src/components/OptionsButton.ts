import { getTimeUntilScan } from "../config";

const OptionsButton = () => {
	const wrapper = document.createElement("form");
	wrapper.style.position = "fixed";
	wrapper.style.left = "50px";
	wrapper.style.marginTop = "-46.5px";
	wrapper.style.zIndex = "1000";
	wrapper.style.display = "none";
	wrapper.style.backgroundColor = "white";
	wrapper.style.padding = "10px";
	wrapper.style.border = "1px solid black";
	wrapper.style.borderRadius = "5px";
	wrapper.style.cursor = "pointer";

	const saveButton = document.createElement("button");
	saveButton.type = "submit";
	saveButton.innerText = "Save";
	saveButton.style.marginRight = "5px";
	saveButton.style.marginLeft = "5px";
	saveButton.style.cursor = "pointer";

	const cancelButton = document.createElement("button");
	cancelButton.type = "button";
	cancelButton.innerText = "Cancel";
	cancelButton.style.cursor = "pointer";
	cancelButton.onclick = (e) => {
		e.preventDefault();
		wrapper.style.display = "none";
	};

	const input = document.createElement("input");
	input.value = `${getTimeUntilScan() / 1000}`;

	wrapper.appendChild(input);
	wrapper.appendChild(saveButton);
	wrapper.appendChild(cancelButton);

	return { wrapper, saveButton, input };
};

export default OptionsButton;
