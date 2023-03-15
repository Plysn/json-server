var listCourseBlock = document.querySelector('#list-courses')
var courseApi = 'http://localhost:3000/courses'

function start() {
    getCourses(renderCourses);
    handleCreateCourse();
}

start();

//Function
function getCourses(callback) {
    fetch(courseApi) 
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}

function createCourse(data, callback) {
    var postCourse = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            // "Content-Type": "multipart/form-data",
        }
    };
    fetch(courseApi, postCourse)
        .then(function(response){
            response.json();
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    var deleteCourse = {
        method: 'delete',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    fetch(courseApi + '/' + id, deleteCourse)
        .then(function(response){
            response.json();
        })
        .then(function() {
            getCourses(renderCourses);
        })
}

function renderCourses(courses) {
    console.log("courses");
    var htmls = courses.map(function(course) {
        return `
            <li>
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <div>
                <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button onclick="handleUpdateCourse(${course.id})">Sửa</button>
                </div>
            </li>
        `
    }); 
    listCourseBlock.innerHTML = htmls.join('');

}

//
function handleCreateCourse() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var formData = {
            name: name,
            description: description
        };
        console.log(formData)
        
        createCourse(formData, function() {
            getCourses(renderCourses);
        });

    }
    
}