<?php

echo "Hello !!!";

$name = "Bundit";
$age = 23;

$arr = array("name", 23);
$assoc_arr = ["name" => "Bundit", "age" => 23];

echo $arr[0];
echo $assoc_arr["age"];
echo $arr;
echo "<br>";
var_dump($assoc_arr);
echo "<br>";
echo "Hello $name";
echo 'Hello $name';

$object = (object)$assoc_arr;
echo $object->name;

function plus($a, $b)
{
    return $a + $b;
}

$add_name = function ($name) {
    echo "Hello $name";
};

$car = (object)["color" => "red", "name" => $add_name];
//echo $car->name("test");

?>

<?php
phpinfo()
?>

