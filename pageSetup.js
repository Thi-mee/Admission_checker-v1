let selectForGrades = document.querySelectorAll(".grades")
let resultField = document.getElementById("resultField")

let grades = [
    "--Select-Grade--", "A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "E9"
]
let subjects = [
                "--Select Subjects--", "Geography", "Economics", "Physics", 
                "Chemistry", "Biology", "French", "Computer Std", "Commerce",
                "Government", "Accounting", "Literature", "Further Maths"
            ]

selectForGrades.forEach(select => {
    let i = 0;
    let grd = [];
    for (grade of grades){
        grd[i] = document.createElement("option")
        grd[i].innerHTML = grade;
        grd[i].value = grade;
        if (i == 0) {
            grd[i].value = "";
        }
        select.append(grd[i++])
    } 
})

