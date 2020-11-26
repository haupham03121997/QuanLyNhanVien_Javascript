
//Khai báo mảng nhân viên quản lý dữ liệu table
var mangNhanVien = [];
var validate = new Validation();
//Xử lý nút thêm nhân viên
document.getElementById('btnThemNV').onclick = function () {
    //Lấy thông người dùng nhap26 vào => đưa vào đối tượng nhân viên
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.getElementById('msnv').value;
    nhanVien.tenNhanVien = document.getElementById('name').value;
    nhanVien.email = document.getElementById('email').value;
    nhanVien.matKhau = document.getElementById('password').value;
    nhanVien.ngaySinh = document.getElementById('datepicker').value;
    nhanVien.chucVu = document.getElementById('chucvu').value;
    //Kiểm tra rỗng 
    var valid = true;

    valid = validate.kiemTraRong('Mã nhân viên ', nhanVien.maNhanVien, '#tbMaNV') &
        validate.kiemTraRong('Tên nhân viên ', nhanVien.tenNhanVien, '#tbTen') & validate.kiemTraRong('Mật khẩu', nhanVien.matKhau, '#tbMatKhau') & validate.kiemTraRong('Ngày sinh', nhanVien.ngaySinh, '#tbNgay') & validate.kiemTraSo('Mã nhân viên', nhanVien.maNhanVien, '#tbMaNV') & validate.kiemTraKyTu('Tên nhân viên', nhanVien.tenNhanVien, '#tbTen') & validate.kiemTraEmail('Email', nhanVien.email, '#tbEmail') & validate.kiemTraDoDai('Mã nhân viên', nhanVien.maNhanVien, '#tbMaNV', 4, 6);

    if (!valid) {
        return;
    }
    //Đưa thông tin nhân viên vào mảng
    mangNhanVien.push(nhanVien);
    console.log(mangNhanVien);
    //Gọi hàm tạo bảng
    taoBang();
    //Đóng form => dom đến nút đóng và gọi nút đó click()
    document.getElementById('btnDong').click();
    //Lưu vào localstorage
    luuLocalStorage()
}
var taoBang = function () {
    var noiDungTable = '';
    for (var index = 0; index < mangNhanVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
        var nhanVien = mangNhanVien[index];
        //Từ data nhân viên tạo ra 1 dòng <tr > cho biến nội dung
        noiDungTable += `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngaySinh}</td>
                <td>${nhanVien.chucVu}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="suaNhanVien('${nhanVien.maNhanVien}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tableDanhSach').innerHTML = noiDungTable;
}
//Xử lý sửa nhân viên
var suaNhanVien = function (maNV) {
    //Tìm thông tin nhân viên trong mảng có maNhanVien = maNV truyền vào
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVien = mangNhanVien[index];
        if (nhanVien.maNhanVien == maNV) {
            //Load dữ liệu nhân viên đó lên popup
            // console.log('nhanVienSua',nhanVien)
            document.getElementById('msnv').value = nhanVien.maNhanVien;
            document.getElementById('name').value = nhanVien.tenNhanVien;
            document.getElementById('email').value = nhanVien.email;
            document.getElementById('password').value = nhanVien.matKhau;
            document.getElementById('datepicker').value = nhanVien.ngaySinh;
            document.getElementById('chucvu').value = nhanVien.chucVu;
        }
    }
}

//Cập nhật thông tin người dùng
document.getElementById('btnCapNhat').onclick = function () {
    //B1: Lấy thông tin người dùng từ giao diện
    var nhanVienUpdate = new NhanVien();
    nhanVienUpdate.maNhanVien = document.getElementById('msnv').value;
    nhanVienUpdate.tenNhanVien = document.getElementById('name').value;
    nhanVienUpdate.email = document.getElementById('email').value;
    nhanVienUpdate.matKhau = document.getElementById('password').value;
    nhanVienUpdate.ngaySinh = document.getElementById('datepicker').value;
    nhanVienUpdate.chucVu = document.getElementById('chucvu').value;
    //B2: Tìm nhân viên trong mảng
    for (var index = 0; index < mangNhanVien.length; index++) {
        //Lấy ra nhân viên trong mảng
        var nhanVienMang = mangNhanVien[index];
        if (nhanVienMang.maNhanVien == nhanVienUpdate.maNhanVien) {
            //B3: Cập nhật thông tin nhân viên trong mảng = thông tin người dùng nhập vào
            nhanVienMang.tenNhanVien = nhanVienUpdate.tenNhanVien;
            nhanVienMang.email = nhanVienUpdate.email;
            nhanVienMang.matKhau = nhanVienUpdate.matKhau;
            nhanVienMang.ngaySinh = nhanVienUpdate.ngaySinh;
            nhanVienMang.chucVu = nhanVienUpdate.chucVu;
        }
    }
    taoBang();
    luuLocalStorage();
    document.getElementById('btnDong').click();


}

//Xử lý xóa nhân viên
var xoaNhanVien = function (maNV) {
    //Tìm nhân viên trong mảng có maNhanVien = với maNV khi người bấm xóa
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        var nhanVien = mangNhanVien[index];
        if (nhanVien.maNhanVien == maNV) {
            //Xóa tại vị trí nhân viên đó
            mangNhanVien.splice(index, 1);
        }
    }
    taoBang();
    // luuLocalStorage();
}






var luuLocalStorage = function () {
    //Chuyển mảng nhân viên thành chuỗi 
    var sMangNhanVien = JSON.stringify(mangNhanVien); //Chuyển mảng nhân viên thành chuỗi
    //Lưu thông tin mảng nhân viên đã chuyển thành chuỗi vào storage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
    console.log(sMangNhanVien);
}

var layDuLieuStorage = function () {
    //Kiểm tra storage có dữ liệu chưa
    if (localStorage.getItem('mangNhanVien')) {
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //Chuyển chuỗi có định dạng json về object hoặc mảng
        mangNhanVien = JSON.parse(sMangNhanVien);
        taoBang();
    }
}


layDuLieuStorage();
// document.getElementById('btnGetStorage').onclick = layDuLieuStorage;


//Chức năng tìm kiếm

document.getElementById('btnTimNV').onclick = function () {
    var tuKhoa = document.getElementById('searchName').value;
    var mangNhanVienTimKiem = [];
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nhanVien = mangNhanVien[index];
        //Nếu tên nhân viên chứa từ khóa
        //trim(): loại bỏ khoảng trống đầu cuối của chuỗi
        //toLowerCase(): chuyển đổi chuỗi tất cả thành chữ thường
        if(nhanVien.tenNhanVien.trim().toLowerCase().search(tuKhoa.trim().toLowerCase()) != -1)
        {
            mangNhanVienTimKiem.push(nhanVien);
        }
    }
    // console.log('mangNhanVienTimKiem',mangNhanVienTimKiem);
    loadTableNhanVien(mangNhanVienTimKiem);

}


var loadTableNhanVien = function (mangKetQua) {
    var noiDungTable = '';
    for (var index = 0; index < mangKetQua.length; index++) {
        //Mỗi lần duyệt lấy ra 1 nhân viên trong mảng
        var nhanVien = mangKetQua[index];
        //Từ data nhân viên tạo ra 1 dòng <tr > cho biến nội dung
        noiDungTable += `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.email}</td>
                <td>${nhanVien.ngaySinh}</td>
                <td>${nhanVien.chucVu}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button>
                <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="suaNhanVien('${nhanVien.maNhanVien}')">Sửa</button>
                </td>
            </tr>
        `;
    }
    document.getElementById('tableDanhSach').innerHTML = noiDungTable;
}