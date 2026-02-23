function login() {
    // 獲取輸入的使用者名稱和密碼
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 簡單的假定使用者名稱為 "admin"，密碼為 "password"，實際中需要儲存在安全的後端
    if (username === "AVadmin" && password === "AVpassword") {
        document.getElementById("loginResult").textContent = "登入成功！歡迎 " + username;
    } else {
        document.getElementById("loginResult").textContent = "登入失敗，請檢查使用者名稱和密碼。";
    }
}
function login() {
    // 獲取輸入的使用者名稱和密碼
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 簡單的假定使用者名稱為 "admin"，密碼為 "password"，實際中需要儲存在安全的後端
    if (username === "AVadmin" && password === "AVpass") {
        // 登入成功，轉向到啟始頁面
        window.location.href = "AV_movies/index.html";
    } else {
        document.getElementById("loginResult").textContent = "登入失敗，請檢查使用者名稱和密碼。";
    }
}
