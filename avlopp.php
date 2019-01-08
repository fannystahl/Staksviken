<?php
// Fanny Ståhl 2018
// Avlopp.php for Stäkvikens samfällighet

// Database name: avloppsdb, Username: root, Password: , Table: kontroll 
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------
// | ID (int, AI, PRIMARY KEY) | Fname (varchar(64)) | Lname (varchar(64)) | Cdate (date) | Cpoint (varchar(100)) | Cstatus (varchar(1) | Ccomment (varchar(200) |
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------

// Setting variables
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

// Shows 404 response code if kontroll url is not accessed
if($request[0] != "kontroll"){
    http_response_code(404);
    exit;
}

// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Database connection
$conn = mysqli_connect("localhost","root","","avloppsdb") or die("Error connecting to database.");
$db_connected = mysqli_select_db($conn, "avloppsdb"); // Work with the database named 'avloppsdb' 


// HTTP method implementations of GET, POST, DELETE
switch ($method){
    case "GET":
        $sql = "SELECT ID, Fname, Lname, Cdate, Cpoint, Cstatus, Ccomment FROM Kontroll";
        if(isset($request[1])) $sql = $sql . " WHERE ID = " . $request[1] . ";";
        break;
    case "POST":
        $sql = "INSERT INTO Kontroll (Fname, Lname, Cdate, Cpoint, Cstatus, Ccomment) VALUES ('" . $input['fname'] . "', '" . $input['lname'] . "', '" . $input['cdate'] . "', '"  . $input['cpoint'] . "', '" . $input['cstatus'] . "', '" . $input['ccomment'] . "');"; 
        break;
    case "DELETE":
            if(isset($request[1])){
                $sql = "DELETE FROM Kontroll WHERE ID =" . $request[1] ." ";
            }
            break;
    case "PUT":
            break;
}

$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));

$harr = [];

if($method != "GET")  {
    $sql = "SELECT ID, Fname, Lname, Cdate, Cpoint, Cstatus, Ccomment FROM Kontroll";
    $result = mysqli_query($conn,$sql) or die(mysqli_error($conn)); 
}

while($row = mysqli_fetch_assoc($result)){
        $row_arr['ID'] = $row['ID'];
        $row_arr['Fname'] = $row['Fname'];
        $row_arr['Lname'] = $row['Lname'];
        $row_arr['Cdate'] = $row['Cdate'];
        $row_arr['Cpoint'] = $row['Cpoint'];
        $row_arr['Cstatus'] = $row['Cstatus'];
        $row_arr['Ccomment'] = $row['Ccomment'];
        array_push($harr,$row_arr);
}

mysqli_close($conn);

echo json_encode($harr);

?> 