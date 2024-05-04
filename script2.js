const linkUrl = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";

const dataList = document.querySelector("tbody")

fetch(linkUrl)
    .then(response => { return response.json(); })
    .then(dataArr => {
        dataArr.forEach(element => {
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
    })


const arr= document.querySelectorAll("tbody tr td")

console.log(dataList);