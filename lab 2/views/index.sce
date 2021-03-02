<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>z5217759</title>
</head>
<body>
    <h1 align="center">Timetable</h1>
    <table align="center" border="2px solid black">
        <tr align="center">
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
        </tr>
        <tr align="center">
            <td>0900</td>
            <td>CS305 Lec</td>
            <td></td>
            <td>CS305 Lab</td>
            <td></td>
            <td>CS102 Lec</td>
        </tr>
        <tr align="center">
            <td>1000</td>
            <td></td>
            <td rowspan="2">PHY201 Lec</td>
            <td></td>
            <td rowspan="2">PHY201 Lec</td>
            <td></td>
        </tr>
        <tr align="center">
            <td>1100</td>
            <td>CHEM207 Lec</td>
            <td>CHEM207 Lab</td>
            <td>CS102 Lab</td>
        </tr>
        <tr align="center">
            <td>1200</td>
            <td colspan="5">Lunch Break</td>
        </tr>
    </table>

    <hr>

    <h1 align="center">Feedback</h1>
    <form action="#">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name">
        <br>
        <label for="studentID">StudentID:</label>
        <input type="text" name="studentID" id="studentID">
        <br>
        <label for="email">Email:</label>
        <input type="email" name="email" id="email">
        <br>
        <label for="rating">Rate the Course:</label>
        <input type="radio" name="rating-poor" id="rating-poor">
        <input type="radio" name="rating-ok" id="rating-ok">
        <input type="radio" name="rating-good" id="rating-good">
        <br>
        <input type="submit" value="Submit">
        <input type="reset" value="Reset">
    </form>

    <hr>

</body>
</html>