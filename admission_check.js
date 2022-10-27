const introForm = document.getElementById("formIntro")
const mainForm = document.getElementById("mainForm")

const firstErrorBox = document.getElementById("firstErr")
const blocker = document.getElementById("blocker")
const openBlockerBtn = document.getElementById("openOlevelBtn")

const firstInputs = document.querySelectorAll(".field-one input")
const firstSelects = document.querySelectorAll(".field-one select")

const utmeScore = document.getElementById("utmeScore")
const postUtmeScore = document.getElementById("putmeScore")
const noOfSittings = document.getElementById("noOfSittings")
const oLevelSubjects = document.querySelectorAll(".subjects")

const subjectsSelect = document.querySelectorAll("select.subjects")
const gradesSelect = document.querySelectorAll("select.grades")


function Candidate(name, age, stateOfOrigin, utmeScore, postUtmeScore, oLevelGrades, noOfSittings) {
    this.name = name
    this.age = age
    this.utmeScore = utmeScore
    this.postUtmeScore = postUtmeScore
    this.oLevelGrades = oLevelGrades
    this.oLevelScores = oLevelGrades.map(grade => {
        if (grade === "A1") {return 10}
        if (grade === "B2") {return 9}
        if (grade === "B3") {return 8}
        if (grade === "C4") {return 7}
        if (grade === "C5") {return 6}
        if (grade === "C6") {return 5}
        if (grade === "D7") {return 4}
        if (grade === "E8") {return 3}
        if (grade === "F9") {return 0}
        else { return -1 }
    })
    this.noOfSittings = noOfSittings
    this.stateOfOrigin = stateOfOrigin
    this.fallsWithinCatchment = ["Ondo", "Osun", "Oyo", "Ekiti", "Lagos", "Ogun", "Edo", "Niger"].includes(this.stateOfOrigin)
    this.areAllCredits = this.oLevelScores.every(score => {
        return score >= 5
    })
    this.oLevelTotalScore = Number(((this.oLevelScores.reduce((a, b) => a + b) / (this.oLevelScores.length * 10)) * 30).toFixed(2))
    this.totalScore = (this.utmeScore / 8) + this.oLevelTotalScore + this.postUtmeScore;

    // Verifies candidate
    this.verify = () => {
        if (this.utmeScore < 180 || this.noOfSittings > 1 || !this.areAllCredits || this.postUtmeScore < 12) {
            console.log("You don't meet the requirements")
            document.getElementById('display').innerHTML = "You don't meet the requirements"
        }
        else if (this.totalScore >= 80) {
            document.getElementById('display').innerHTML = "Hurray!🎉🎉✨ You've gotten admission on merit"
        }
        else if (this.totalScore >= 75) {
            document.getElementById('display').innerHTML = "Qualified through concessionary score"
            console.log("Qualified through concessionary score")
        }
        else if (this.totalScore >= 65 && this.fallsWithinCatchment) {
            document.getElementById('display').innerHTML = "Qualified for catchment"
            console.log("Qualified for catchment")
        }
        else if (this.totalScore >= 60) {
            document.getElementById('display').innerHTML = "Qualified for VC list"
            console.log("Qualified for VC list")
        }
        else {
            document.getElementById('display').innerHTML = "You don't meet the requirements"
            console.log("You don't meet the requirements")
        }
        document.getElementById('display').style.display = "flex"
        document.getElementById('grayout').style.display = "block"
        document.getElementById('restart').style.display = "block"
    };
}


document.getElementById('nextBtn').addEventListener('click', (e) => {
    
    e.preventDefault()
    firstErrorBox.innerHTML = "";
    for (input of firstInputs) {

        let which = "Last"
        if (input.id == "fname"){
            which = "First"
        }

        if(!input.value){
            input.style.backgroundColor = "#ecc";
            firstErrorBox.innerHTML = `${which} name is required`
            return
        }
        if (input.value.length < 3) {
            input.style.backgroundColor = "#ecc"
            firstErrorBox.innerHTML = `${which} name must be a minimum of 3 characters`
            return
        }
    }

    for (select of firstSelects) {
        if (select.value === ""){
            select.style.backgroundColor = "#eec"
            firstErrorBox.innerHTML = `You have to choose an option in the dropdown`
            return
        }
    }
    

    introForm.classList.toggle("active")
    mainForm.classList.toggle("active")

    
})
firstInputs.forEach(input => {
    input.addEventListener("input", () => {
        input.style.backgroundColor = "#fff"
    })
})
gradesSelect.forEach(select => {
    select.addEventListener('change', () => {
        select.style.backgroundColor = "#fff"
    })
})
document.getElementById('prevBtn').addEventListener('click', () => {
    introForm.classList.toggle("active")
    mainForm.classList.toggle("active")
})
utmeScore.addEventListener("input", () => {
    const umeDisplay = document.getElementById("ume-display")
    umeDisplay.innerText = ""
    let i = 0;
    let myInterval = setInterval(()=>{
        umeDisplay.innerText += '.'
        i++
        if(i == 4){
            clearInterval(myInterval)
            if (!utmeScore.value || parseFloat(utmeScore.value) < 0 || parseFloat(utmeScore.value) > 400) {
                umeDisplay.innerText = "Invalid value for UTME";
                return 0;
            } else if (parseFloat(utmeScore.value) < 180){
                umeDisplay.innerText = "UTME score too low to be considered";
            } else {
                umeDisplay.innerText = "Oouu🎉 Nice! UTME cut off passed";
            }
        }
    }, 300)
})
postUtmeScore.addEventListener("input", () => {
    const pumeDisplay = document.getElementById("pume-display")
    pumeDisplay.innerText = ""
    let i = 0;
    let myInterval = setInterval(()=>{
        pumeDisplay.innerText += '.'
        i++
        if (i == 4){
            clearInterval(myInterval)

            if (!postUtmeScore.value || parseFloat(postUtmeScore.value) < 0 || parseFloat(postUtmeScore.value) > 20) {
                pumeDisplay.innerText = "Invalid value for post UTME";
                return 0;
            } else if (parseFloat(postUtmeScore.value) < 12){
                pumeDisplay.innerText = "post UTME score too low to be considered";
            } else {
                pumeDisplay.innerText = "Oouu🎉 post UTME cut off passed";
            }
        }
    }, 300)
})
openBlockerBtn.addEventListener('click', () => {
    blocker.classList.remove('unallow')
    openBlockerBtn.classList.add('hide')
})


function checkInputs(){

    let i = 0
    for (select of gradesSelect){
        if (!select.value ){
            i++    
            select.style.backgroundColor = '#ecc'
        }
    }
    if (i > 0){
        document.getElementById('gradeErr').innerText = '⚠ Fill all grades'
        return 0
    }
    
    return 1;
}

document.getElementById("submit-button").addEventListener('click', (e) => {
    
    if (!checkInputs()){
        return 0
    }

    let grds = []
    for (individualGradeselect of gradesSelect){
        grds.push(individualGradeselect.value)
    }

    let newCandidate = new Candidate(
        `${firstInputs[0].value} ${firstInputs[1].value}`,
        parseInt(firstSelects[0].value),
        firstSelects[1].value,
        parseInt(utmeScore.value),
        parseInt(postUtmeScore.value),
        grds,
        parseFloat(noOfSittings.value)
    )
    newCandidate.verify()
})

document.getElementById("restart").addEventListener('click', ()=> {
    firstInputs[0].value = ""
    firstInputs[1].value = ""
    firstSelects[1].value = ""
    firstSelects[0].value = ""
    utmeScore.value = ""
    postUtmeScore.value = ""
    location.reload()
})
