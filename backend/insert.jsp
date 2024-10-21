<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submit Data</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        form { display: grid; gap: 10px; }
        input[type="submit"] { justify-self: start; }
    </style>
</head>
<body>
    <h1>Submit Data Form</h1>
    <form action="${pageContext.request.contextPath}/submitData" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="comments">Comments:</label>
        <textarea id="comments" name="comments" rows="4"></textarea>
        
        <input type="submit" value="Submit">
    </form>
</body>
</html>
