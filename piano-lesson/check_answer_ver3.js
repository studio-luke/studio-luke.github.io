var base_enum =
  {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
   'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
   'A#': 10, 'Bb': 10, 'B': 11};
var NOTES =
  {0: '도', 1: '도#', 1.5: '레b',
   2: '레', 3: '레#', 3.5: '미b', 4: '미',
   5: '파', 6: '파#', 6.5: '솔b',
   7: '솔', 8: '솔#', 8.5: '라b',
   9: '라', 10: '라#', 10.5: '시b', 11: '시'};


function generateMajor5(base){
	let baseNum = base_enum[base];

	return [baseNum, baseNum + 4, baseNum + 7];
}


function applyChord(base, chord) {
	let note = generateMajor5(base);
	let seventh = false;

	if (chord.includes("7")){
		seventh = true;
		note.push(note[0] + 10);

		if (chord.includes("M7"))
	  		note[3] += 1;
	}
  

	if (chord.search("^m") == 0)
		note[1] -= 1;
	
	else if (chord.includes("sus4"))
		note[1] += 1;

	else if (chord.includes("aug"))
		note[2] += 1;

	else if (chord.includes("dim")) {
		note[1] -= 1;
		note[2] -= 1;
		if (seventh)
			note[3] -= 1;
	}

	
	if (chord.includes("b5"))
		note[2] -= 1;  


  	if (chord.includes("m") || chord.includes("dim")){
        if (base == 'B') { 
        }
        else{
            if (base.includes("#")) {
            }
            else {
                for (let i=0; i < note.length; i++){
            	   console.log(note[i]);
                    if (NOTES[note[i]%12].search("#") > -1) {
                       note[i] += 0.5;
                   }
                }
            }
        }
        
    }
    else {
    	if (base.includes("b")) {
            for (let i=0; i < note.length; i++){
        	   if (NOTES[note[i]%12].search("#") > -1){
            	   note[i] += 0.5;
               }
            }
        }
    }
    
    var isCorrect = checkAnswer(pushedKeys, note);
    var ans = document.querySelector("#answer");
    if (isCorrect){
        ans.innerHTML = "정답입니다!";
    }
    else{
        ans.innerHTML = "틀렸습니다!";
        printChord(note);
    }
    showAnswerKeys(note, isCorrect);
    
    document.querySelector("#ans").disabled = true;
}

function checkAnswer(pushedKeys, ansNotes) {
    var submit = [];
    for (var i = 0; i < pushedKeys.length; i++)
        submit.push(pushedKeys[i] % 12);
    
    var submitUnique = [];
    for (var i = 0; i < submit.length; i++){
        if (submitUnique.indexOf(submit[i]) == -1)
            submitUnique.push(submit[i]);
    }
    submitUnique.sort();

    var ansCompare = [];
    for (var i = 0; i < ansNotes.length; i++)
        ansCompare.push(parseInt(ansNotes[i] % 12));
    ansCompare.sort();
    
    var ans = document.querySelector("#answer");
    if (JSON.stringify(submitUnique) == JSON.stringify(ansCompare)){
        return true;
    }
    else{
        return false;
    }
}


function printChord(notes){
	var ans = document.querySelector("#answer");
    var answerHTML = "<br><span class='highlight'>";
    
    for (var i = 0; i < notes.length; i++) {
        answerHTML += NOTES[notes[i] % 12] + " ";
    }
//	notes.forEach(function(item, index, array){
//		ans.innerHTML += (NOTES[item % 12] + "&ensp;");
//	});
    answerHTML += "</span>";
    ans.innerHTML += answerHTML;
}