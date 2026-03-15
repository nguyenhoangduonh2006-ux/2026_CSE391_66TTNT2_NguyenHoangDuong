$(document).ready(function () {

    // ===== FULLNAME =====
    $.validator.addMethod("validateFullname", function(value, element){
        return this.optional(element) || /^[A-Za-zÀ-ỹ\s]{3,}$/.test(value);
    }, "Họ tên ≥ 3 ký tự và chỉ chứa chữ cái");

    // ===== PHONE =====
    $.validator.addMethod("validatePhone", function(value, element){
        return this.optional(element) || /^0\d{9}$/.test(value);
    }, "Số điện thoại phải 10 số và bắt đầu bằng 0");

    // ===== PASSWORD =====
    $.validator.addMethod("validatePassword", function(value, element){
        return this.optional(element) || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
    }, "Password ≥ 8 ký tự gồm chữ hoa, chữ thường và số");


    $("#demoForm").validate({

        // realtime khi blur
        onfocusout: true,
        onkeyup: false,
        onclick: false,

        rules: {

            fullname:{
                required:true,
                validateFullname:true
                
            },

            email:{
                required:true,
                email:true
            },

            phone:{
                required:true,
                validatePhone:true
            },

            password:{
                required:true,
                validatePassword:true
            },

            "re-password":{
                required:true,
                equalTo:"#password"
            },

            gender:{
                required:true
            },

            terms:{
                required:true
            }

        },

       messages:{

    fullname:{
        required:"Không được để trống họ tên",
        validateFullname:"Họ tên phải ≥ 3 ký tự và chỉ chứa chữ cái"
    },

    email:{
        required:"Không được để trống email",
        email:"Email phải đúng định dạng name@domain.com"
    },

    phone:{
        required:"Không được để trống số điện thoại",
        validatePhone:"Số điện thoại phải gồm 10 số và bắt đầu bằng 0"
    },

    password:{
        required:"Không được để trống mật khẩu",
        validatePassword:"Mật khẩu phải ≥ 8 ký tự gồm chữ hoa, chữ thường và số"
    },

    "re-password":{
        required:"Phải nhập lại mật khẩu",
        equalTo:"Mật khẩu xác nhận không khớp"
    },

    gender:{
        required:"Vui lòng chọn giới tính"
    },

    terms:{
        required:"Bạn phải đồng ý điều khoản"
    }

},

        // khi form hợp lệ
        submitHandler:function(form){

            const name = $("input[name='fullname']").val();

            $("#demoForm").hide();

            $("body").append(
                "<h2>Đăng ký thành công! 🎉</h2>" +
                "<h3>Chào mừng " + name + "</h3>"
            );

        }

    });

});