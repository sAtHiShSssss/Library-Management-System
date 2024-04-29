<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Library Management System</title>
    <style>
        .container {
            display: inline-flex;
            width: 1200px;
            align-items: center;
            justify-content: space-between;
        }
        .container a {
            padding: 20px;
        }
        .form {
            display: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <h2>Welcome to my Library</h2>
        <form id="containerForm">
            <a href="#" onclick="toggleForm('signinForm')">User Login</a>
            <a href="#" onclick="toggleForm('adminForm')">Admin Login</a>
        </form>
    </div>

    <div id="signinForm" class="form">
        <h2>User Login</h2>
        <form id="signin" onsubmit=" formSubmit('signin'); return false; ">
            <input type="email" name="email" placeholder="Enter email" required><br><br>
            <input type="password" name="password" placeholder="Enter password" required><br><br>
            <input type="submit" value="Sign In"><br><br>
            New User<a href="#" onclick="toggleForm('signupForm')">  Sign Up</a>
        </form>
        <p id="signinmessage"></p>
    </div>

    <div id="signupForm" class="form">
        <h2>User Registration</h2>
        <form id="signup" onsubmit=" formSubmit('signup'); return false; ">
            Enter full name<br><input type="text" name="name" required><br>
            Enter email<br><input type="email" name="email" required><br>
            Enter password<br><input type="password" name="password" required><br>
            Enter phone number<br><input type="text" name="phonenumber"  required><br>
            Enter age<br><input type="number" name="age"  required><br>
            Enter address<br><textarea name="address"></textarea><br>
            <input type="submit" value="Sign Up"><br><br>
            Existing User<a href="#" onclick="toggleForm('signinForm')">  Sign In</a>
        </form>
        <p id="signupmesage" style="color:red;"></p>
    </div>

    <div id="adminForm" class="form">
        <h2>Administrator Login</h2>
        <form id="admin" onsubmit=" formSubmit('admin'); return false; ">
            <input type="email" name="email" placeholder="Enter email" required><br><br>
            <input type="password" name="password" placeholder="Enter password" required><br><br>
            <input id="adminloginBtn" type="submit" value="Login"><br><br>
        </form>
        <p id="adminMessage"></p>
    </div>

    <script src="index.js">
    </script>
</body>
</html>
