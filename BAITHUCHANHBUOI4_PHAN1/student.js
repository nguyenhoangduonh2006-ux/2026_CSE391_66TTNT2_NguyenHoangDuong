// ===============================
// Bước 1: Lấy các phần tử DOM
// ===============================
const inputStudentName = document.getElementById("inputStudentName");
const inputStudentDiem = document.getElementById("inputStudentDiem");
const btnAddStudent = document.getElementById("btnAddStudent");
const studentTableBody = document.getElementById("studentTableBody");
const studentStats = document.getElementById("studentStats");

const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
const sortScore = document.getElementById("sortScore");


// ===============================
// Bước 2: Dữ liệu sinh viên
// ===============================
let students = [
    { name: "Trần Thị B", score: 9 },
    { name: "Lê Văn C", score: 8 }
];

let filteredStudents = [...students];

let sortAsc = true;


// ===============================
// Bước 3: Hàm tính xếp loại
// ===============================
function getRank(score) {

    if (score >= 9) return "Giỏi";
    if (score >= 7) return "Khá";
    if (score >= 5) return "Trung bình";

    return "Yếu";
}


// ===============================
// Bước 4: Render bảng
// ===============================
function renderTable() {

    studentTableBody.innerHTML = "";

    if (filteredStudents.length === 0) {

        studentTableBody.innerHTML =
            `<tr><td colspan="5">Không có kết quả</td></tr>`;

        updateStats();
        return;
    }

    filteredStudents.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score}</td>
            <td>${getRank(student.score)}</td>
            <td><button class="btn-delete">Xoá</button></td>
        `;

        // nút xoá
        row.querySelector(".btn-delete").addEventListener("click", function () {

            students = students.filter(s => s !== student);

            applyFilters();
        });

        studentTableBody.appendChild(row);
    });

    updateStats();
}


// ===============================
// Bước 5: Áp dụng tìm + lọc + sort
// ===============================
function applyFilters() {

    const keyword = searchInput.value.toLowerCase();
    const rank = filterSelect.value;

    filteredStudents = students.filter(student => {

        const matchName =
            student.name.toLowerCase().includes(keyword);

        const matchRank =
            rank === "all" || getRank(student.score) === rank;

        return matchName && matchRank;
    });

    filteredStudents.sort((a, b) => {

        if (sortAsc) {
            return a.score - b.score;
        } else {
            return b.score - a.score;
        }

    });

    renderTable();
}


// ===============================
// Bước 6: Thêm sinh viên
// ===============================
btnAddStudent.addEventListener("click", function () {

    const studentName = inputStudentName.value.trim();
    const studentDiem = inputStudentDiem.value.trim();

    if (studentName === "" || studentDiem === "") {

        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    students.push({
        name: studentName,
        score: Number(studentDiem)
    });

    inputStudentName.value = "";
    inputStudentDiem.value = "";

    applyFilters();
});


// ===============================
// Bước 7: Tìm kiếm realtime
// ===============================
searchInput.addEventListener("input", function () {

    applyFilters();

});


// ===============================
// Bước 8: Lọc xếp loại
// ===============================
filterSelect.addEventListener("change", function () {

    applyFilters();

});


// ===============================
// Bước 9: Sắp xếp điểm
// ===============================
sortScore.addEventListener("click", function () {

    sortAsc = !sortAsc;

    this.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";

    applyFilters();
});


// ===============================
// Bước 10: Thống kê
// ===============================
function updateStats() {

    let totalStudents = filteredStudents.length;

    let totalScore = 0;

    filteredStudents.forEach(student => {

        totalScore += student.score;

    });

    let avg = 0;

    if (totalStudents > 0) {

        avg = (totalScore / totalStudents).toFixed(2);

    }

    studentStats.textContent =
        "Tổng sinh viên: " + totalStudents +
        " | Điểm trung bình: " + avg;
}


// ===============================
// Bước 11: Enter để thêm nhanh
// ===============================
inputStudentDiem.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        btnAddStudent.click();

    }

});


// ===============================
// Bước 12: chạy lần đầu
// ===============================
applyFilters();