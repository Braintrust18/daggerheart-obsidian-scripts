// Designed to show checkboxes using ITS Theme
// based on code shared by Crit Hit The Giant on Youtube
function formatCheckboxes(label, numberOfBoxes) {
	const checkboxLabel = `>     - *${label} (${numberOfBoxes}):*\n`;
	const checkboxBox = `>     - [ ] \n`;
	let checkboxesText = "".concat(checkboxLabel);
	for (let i = 0; i < numberOfBoxes; i++) {
		checkboxesText += checkboxBox;
	}
	return checkboxesText;
}

function formatAdversary(adversaryName, adversaryIndex, hpText, stressText){
	const firstLine = `> [!checks | no-i ] ${adversaryName} #${adversaryIndex}\n>   - \n`;
	return firstLine.concat(hpText).concat(stressText).concat("\n");
}

async function promptHpStressITS(tp) {
    let adversaryName = await tp.system.prompt("Adversary Name");
	let adversaryCount = await tp.system.prompt("Adversary Count");
	let hpCount = await tp.system.prompt("HP");
	let stressCount = await tp.system.prompt("Stress");
	let hpStressText = "";
	const hpText = formatCheckboxes("HP", hpCount);
	const stressText = formatCheckboxes("Stress", stressCount);
	
	
	for (let i = 0; i < adversaryCount; i++) {
		hpStressText += formatAdversary(adversaryName, i + 1, hpText, stressText);
	}
	return hpStressText;
}

module.exports = promptHpStressITS