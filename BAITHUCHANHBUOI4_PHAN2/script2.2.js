const prices = {
    Ao:150000,
    Quan:200000,
    Giay:300000
}

const form = document.getElementById("orderForm")

function showError(id,message){
    document.getElementById(id).textContent = message
}

function clearError(id){
    document.getElementById(id).textContent = ""
}


// ===== VALIDATE PRODUCT =====

function validateProduct(){

    const product = document.getElementById("product").value

    if(product === ""){
        showError("productError","Vui lòng chọn sản phẩm")
        return false
    }

    clearError("productError")
    return true
}


// ===== VALIDATE Số lượng

function validateQuantity(){

    const quantity = document.getElementById("quantity").value

    if(quantity === ""){
        showError("quantityError","Không được để trống số lượng")
        return false
    }

    if(quantity < 1 || quantity > 99){
        showError("quantityError","Số lượng phải từ 1 đến 99")
        return false
    }

    clearError("quantityError")
    return true
}


// ===== VALIDATE Ngày Giao 

function validateDate(){

    const value = document.getElementById("deliveryDate").value

    if(value === ""){
        showError("dateError","Vui lòng chọn ngày giao hàng")
        return false
    }

    const inputDate = new Date(value)

    const today = new Date()
    today.setHours(0,0,0,0)

    const maxDate = new Date()
    maxDate.setDate(today.getDate()+30)

    if(inputDate < today){
        showError("dateError","Ngày giao không được trong quá khứ")
        return false
    }

    if(inputDate > maxDate){
        showError("dateError","Ngày giao không quá 30 ngày từ hôm nay")
        return false
    }

    clearError("dateError")
    return true
}


// ===== VALIDATE địa chỉ

function validateAddress(){

    const address = document.getElementById("address").value.trim()

    if(address === ""){
        showError("addressError","Không được để trống địa chỉ")
        return false
    }

    if(address.length < 10){
        showError("addressError","Địa chỉ phải ≥ 10 ký tự")
        return false
    }

    clearError("addressError")
    return true
}


// ===== VALIDATE ghi chú 

function validateNote(){

    const note = document.getElementById("note").value

    if(note.length > 200){
        showError("noteError","Ghi chú tối đa 200 ký tự")
        return false
    }

    clearError("noteError")
    return true
}


// ===== VALIDATE Phương thức thanh toán

function validatePayment(){

    const payment = document.querySelector('input[name="payment"]:checked')

    if(!payment){
        showError("paymentError","Vui lòng chọn phương thức thanh toán")
        return false
    }

    clearError("paymentError")
    return true
}


// ===== TÍNH TỔNG TIỀN =====

function calculateTotal(){

    const product = document.getElementById("product").value
    const quantity = document.getElementById("quantity").value

    if(product && quantity){

        const total = prices[product] * quantity

        document.getElementById("totalPrice").textContent =
        Number(total).toLocaleString("vi-VN")
    }

}

document.getElementById("product").addEventListener("change",calculateTotal)
document.getElementById("quantity").addEventListener("input",calculateTotal)


// ===== ĐẾM KÝ TỰ GHI CHÚ =====

const note = document.getElementById("note")

note.addEventListener("input",function(){

    const length = this.value.length

    const counter = document.getElementById("charCount")

    counter.textContent = length + "/200"

    if(length > 200){

        counter.style.color = "red"

    }else{

        counter.style.color = "black"

    }

    clearError("noteError")

})


// ===== VALIDATE REALTIME BLUR =====

document.getElementById("product").addEventListener("blur",validateProduct)
document.getElementById("quantity").addEventListener("blur",validateQuantity)
document.getElementById("deliveryDate").addEventListener("blur",validateDate)
document.getElementById("address").addEventListener("blur",validateAddress)


// ===== SUBMIT FORM =====

form.addEventListener("submit",function(e){

    e.preventDefault()

    const valid =
        validateProduct() &
        validateQuantity() &
        validateDate() &
        validateAddress() &
        validateNote() &
        validatePayment()

    if(valid){

        const product = document.getElementById("product").value
        const quantity = document.getElementById("quantity").value
        const date = document.getElementById("deliveryDate").value
        const total = document.getElementById("totalPrice").textContent

        document.getElementById("orderSummary").innerHTML =

        "Sản phẩm: " + product + "<br>" +
        "Số lượng: " + quantity + "<br>" +
        "Ngày giao: " + date + "<br>" +
        "Tổng tiền: " + total + " VND"

        document.getElementById("confirmBox").style.display = "block"

    }

})


// ===== CONFIRM =====

document.getElementById("confirmBtn").onclick = function(){

    document.getElementById("confirmBox").style.display = "none"

    form.style.display = "none"

    document.getElementById("successMessage").innerHTML =
    "Đặt hàng thành công 🎉"

}


// ===== CANCEL =====

document.getElementById("cancelBtn").onclick = function(){

    document.getElementById("confirmBox").style.display = "none"

}