var students = [
    {
        id: 100,
        name: 'Lisa',
        age: 22,
    },
    {
        id: 101,
        name: 'Mike',
        age: 25,
    },
    {
        id: 102,
        name: 'Carol',
        age: 20,
    },
];

// ==================== Function ===================

//----------  1. read and display data ------------------
function readData() {
    let table_data = '';
    for (stu of students) {
        table_data += `<tr>`;
        table_data += `<td>${stu.name}</td>`;
        table_data += `<td>${stu.age}</td>`;
        table_data += `<td><button class="btn btn-danger mx-2 btn-delete" id="${stu.id}">Delete</button>`;
        table_data += `<button class="btn btn-warning mx-2">Edit</button></td>`;
        table_data += `</tr>`;
    }

    document.querySelector('#table_body').innerHTML = table_data;

    // attach delete function to delete button
    deleteData();

    // after the user click add and save
    
}

//----------  2. Delete function ------------------
function deleteData() {
    // ============= delete =============
    // selest all delete buttons
    const btnDelete = document.querySelectorAll('.btn-delete');
    // bind onclick event to each delete buttons
    btnDelete.forEach(function (btn) {
        btn.onclick = function () {
            // alert(btn.id);
            //---------------------------------------------------------------------------------------
            // 1.find the real array index
            // let arrayId = 0;
            // for(let i=0; i<students.length; i++){
            //     if(students[i].id == btn.id){
            //         arrayId = i;
            //         break;
            //     }
            // }
            //---------------------------------------------------------------------------------------
            // 2. delete the data unwanted record

            //method 2
            //filter out the unwanted record
            //     let temp = [];
            //     for(stu of students){
            //         if(stu.id != btn.id){
            //             temp.push(stu);
            //         }
            //     }
            //    students = temp;
            //---------------------------------------------------------------------------------------
            // students = students.filter(function (stu) {
            //     return stu.id != btn.id;
            // });
            // students = temp;

            //---------------------------------------------------------------------------------------
            // console.log(arrayId);
            //delete the data from array using id
            // students.splice(arrayId,1);

            // relond the data and refresh table
            readData();

            // ---------- alert pop up ---------------
            Swal.fire({
                title: 'Are you sure to delete?',
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                // denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    students = students.filter(function (stu) {
                        return stu.id != btn.id;
                    });
                    readData();
                    //   Swal.fire('Saved!', '', 'success')
                }
            })
        }
    })
}

// --------- 3. Add function ----------
function addData(){
   document.querySelector('#btnSaveAdd').onclick = function(){
    //hide the modal
    // myModal.hide();
    const add_name = document.querySelector('#txtName').value;
    const add_age =  document.querySelector('#txtAge').value;
    const lastIndex = students[students.length-1].id;
    students.push({id: lastIndex +1, name: add_name, age: add_age });
    readData();
   }
}
// read and show data
readData();

 // after the user click add and save
addData();

