function formatExampleX(columnName, numberOfPoints) {
    const character_x = 'x';
	// Create a example to show how to fill out hp or stress
	// we want one x per number of points
	// split that string up in to chunks of 5
	// join the chunks with spaces
	// pad the end with spaces so the minimum length is equal to the length of the header
    return character_x.repeat(numberOfPoints).match(/.{1,5}/g).join(' ').padEnd(columnName.length + 3, ' ');
}

function formatHeader(columnName, numberOfPoints, formattedExampleX) {
	// concat the columnName with the numberOfPoints
	// pad the end with spaces so the minimum length is the same as the maximum number of points
	return columnName.concat("(").concat(numberOfPoints).concat(")").padEnd(formattedExampleX.length, ' ');
}

function formatHeaderDash(formattedExampleX, formattedHeader) {
    const character_dash = '-';
	// we want a number of dashes equal to the length of the field to mark points
	// pad the end with - so the minimum length is the same as formattedHeader
    return character_dash.repeat(formattedExampleX.length).padEnd(formattedHeader.length, character_dash);
}

function formatColumnSpaces(formattedExampleX, formattedHeader) {
    const character_space = ' ';
	// we want a number of spaces equal to the length of the field to mark points
	// pad the end with spaces so the minimum length is the same as formattedHeader
    return character_space.repeat(formattedExampleX.length).padEnd(formattedHeader.length, character_space);
}

async function promptHpStress(tp) {
    let hpCount = await tp.system.prompt("HP");
	const formattedX_hp = formatExampleX("HP", hpCount);
	const formattedHeader_hp = formatHeader("HP", hpCount, formattedX_hp);
	const formattedDash_hp = formatHeaderDash(formattedX_hp, formattedHeader_hp);
	const formattedSpace_hp = formatColumnSpaces(formattedX_hp, formattedHeader_hp);
	
	let stressCount = await tp.system.prompt("Stress");
	const formattedX_stress = formatExampleX("S", stressCount);
	const formattedHeader_stress = formatHeader("S", stressCount, formattedX_stress);
	const formattedDash_stress = formatHeaderDash(formattedX_stress, formattedHeader_stress);
	const formattedSpace_stress = formatColumnSpaces(formattedX_stress, formattedHeader_stress);
	
	const header1 = "| #   | AA | BB | Status  | Name   |\n".replace("AA",formattedHeader_hp).replace("BB",formattedHeader_stress);
	const header2 = "| --- | AA | BB | ------- | ------ |\n".replace("AA",formattedDash_hp).replace("BB",formattedDash_stress);
	const header3 = "|     | AA | BB | h,r,v   |        |\n".replace("AA",formattedX_hp).replace("BB",formattedX_stress);
	const bodyA   = "| A   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const bodyB   = "| B   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const bodyC   = "| C   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const bodyD   = "| D   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const bodyE   = "| E   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const bodyF   = "| F   | AA | BB |         |        |\n".replace("AA",formattedSpace_hp).replace("BB",formattedSpace_stress);
	const key     = " ***h: hidden, r: restrained, v: vulnerable***"
	
	return header1.concat(header2).concat(header3).concat(bodyA).concat(bodyB).concat(bodyC).concat(bodyD).concat(bodyE).concat(bodyF).concat(key);
}

module.exports = promptHpStress