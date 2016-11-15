<?php	
	if(empty($_POST['name']) && strlen($_POST['name']) == 0 || empty($_POST['input_1126']) && strlen($_POST['input_1126']) == 0 || empty($_POST['input_181']) && strlen($_POST['input_181']) == 0 || empty($_POST['email']) && strlen($_POST['email']) == 0 || empty($_POST['message']) && strlen($_POST['message']) == 0)
	{
		return false;
	}
	
	$name = $_POST['name'];
	$input_1126 = $_POST['input_1126'];
	$input_181 = $_POST['input_181'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from hidra.";
	$email_body = "You have received a new message. \n\n".
				  "Name: $name \nInput_1126: $input_1126 \nInput_181: $input_181 \nEmail: $email \nMessage: $message \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>