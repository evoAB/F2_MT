let studentsData;


fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
    .then(response => response.json())
    .then(data => {
        studentsData = data;
        // Call a function to initialize your UI with this data
        initializeUI();
    })
    .catch(error => console.error('Error fetching data:', error));

function initializeUI(){
    updateData(studentsData);
}

function updateData(data){
    let dataList = document.querySelector("tbody")
    dataList.innerHTML=``;
    data.forEach(element => {
        let tr = document.createElement("tr"); // create new table row
        // console.log(element);
        let isPass = element.passing===true ? "Passed":"Failed";

        tr.innerHTML=`<td>${element.id}</td>
        <td id="name"><img src="${element.img_src}">${element.first_name} ${element.last_name}</td>
        <td id="gender">${element.gender}</td>
        <td id="class">${element.class}</td>
        <td id="marks">${element.marks}</td>
        <td id="pass">${isPass}</td>
        <td>${element.email}</td>`
        
        dataList.appendChild(tr); //append the row
    });
}

function inputfield(){
    let input = document.getElementById("input")
    const searchQuery = input.value.trim().toLowerCase();
    const filteredData = studentsData.filter(student =>
        student.first_name.toLowerCase().includes(searchQuery) ||
        student.last_name.toLowerCase().includes(searchQuery)
    );
    return filteredData;
}

document.getElementById("search").addEventListener('click', ()=>{
    const filteredData = inputfield();
    updateData(filteredData);
});

let clickAsc=false;
let clickDes=false;
let clickMark=false;
let clickClass=false;
let clickPass=false;
let clickGender=false;

document.getElementById("sort-asc").addEventListener('click', ()=>{
    clickAsc= clickAsc==true? false:true;
    clickDes=false;
    clickMark=false;
    clickClass=false;
    clickPass=false;
    clickGender=false;
    if(clickAsc){
        const data = inputfield();
        data.sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
        updateData(data);
    }
    else{
        updateData(inputfield());
    }
})

document.getElementById("sort-des").addEventListener('click', ()=>{
    clickDes = clickDes==true ? false:true;
    clickAsc=false;
    clickMark=false;
    clickClass=false;
    clickPass=false;
    clickGender=false;
    if(clickDes){
        const data = inputfield();
        data.sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
        updateData(data);
    }
    else{
        updateData(inputfield());
    }
})

document.getElementById("sort-mark").addEventListener('click', ()=>{
    clickMark = clickMark==true ? false:true;
    clickAsc=false;
    clickDes=false;
    clickClass=false;
    clickPass=false;
    clickGender=false;
    if(clickMark){
        const data = inputfield();
        data.sort((a, b) => a.marks-b.marks);
        updateData(data);
    }
    else{
        updateData(inputfield());
    }
})

document.getElementById("sort-class").addEventListener('click', ()=>{
    clickClass = clickClass==true ? false:true;
    clickAsc=false;
    clickDes=false;
    clickMark=false;
    clickPass=false;
    clickGender=false;
    if(clickClass){
        const data = inputfield();
        data.sort((a, b) => a.class-b.class);
        updateData(data);
    }
    else{
        updateData(inputfield());
    }
})

document.getElementById("sort-pass").addEventListener('click', ()=>{
    clickPass = clickPass==true ? false:true;
    clickAsc=false;
    clickDes=false;
    clickMark=false;
    clickClass=false;
    clickGender=false;
    if(clickPass){
        const data = inputfield();
        const filteredData = data.filter(student =>
            student.passing==true
        );
        updateData(filteredData);
    }
    else{
        updateData(inputfield());
    }
})

document.getElementById("sort-gender").addEventListener('click', ()=>{
    clickGender = clickGender==true ? false:true;
    clickAsc=false;
    clickDes=false;
    clickMark=false;
    clickClass=false;
    clickPass=false;
    if(clickGender){
        const data = inputfield();

        let malefilteredData = data.filter(student =>
            student.gender.toLowerCase()==="male"
        );
        let femalefilteredData = data.filter(student =>
            student.gender.toLowerCase()==="female"
        );
        let remainingFilteredData = data.filter(student =>
            !(student.gender.toLowerCase()==="male" || student.gender.toLowerCase()==="female")
        );
        updateData([...malefilteredData, ...femalefilteredData, ...remainingFilteredData]);
    }
    else{
        updateData(inputfield());
    }    
})

const buttons = document.querySelectorAll(".keyButton");
// console.log(buttons);
buttons.forEach(button=>{
    button.addEventListener("click", () => {
        // Toggle 'selected' class on the clicked button
        button.classList.toggle('selected');

        // Remove 'selected' class from other buttons
        buttons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('selected');
            }
        });
    });
})

document.getElementById("search").addEventListener("click", ()=>{
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
})