

	//switch division in login page
	function toggleForm(formId) {
		var forms = document.querySelectorAll('.form');
		forms.forEach(function(form) {
			form.style.display = 'none';
		});
        document.getElementById(formId).style.display = 'block';
        
	}
	
	//Admin and User signin and signup function using AJAX 
	function formSubmit(formId)
	{
		var formData = new FormData(document.getElementById(formId));
		console.log(formData);
		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					var jsonData = JSON.parse(xhr.responseText);
					
					if(jsonData === 'AdminSuccess'){
						window.location.href = 'admin';
					}
					else if(jsonData === 'AdminError'){
						document.getElementById('adminMessage').innerText = 'Invalid email or password';
					}
					else if(jsonData === 'SignInSuccess'){
						window.location.href = 'user';
					}
					else if( jsonData === 'SignInError'){
						document.getElementById('signinmessage').innerText = 'Invalid email or password';
					}
					else if(jsonData === 'SignupSuccess'){
						window.location.href = 'user';
					}
					else if(jsonData === 'SignupError'){
						document.getElementById('signupmesage').innerText = 'Email already exists';
					}
				}
				else{
					
				}
			}
		}
		xhr.onerror = function(){
			console.error('Request Failed');
		}
		
		var url = '';
		if(formId === 'admin'){
			url = 'Admin.action';
		}
		else if(formId === 'signin'){
			url = 'signin.action';
		}
		else{
			url = 'signup.action';
		}
		
		xhr.open('post', url, true);		
		xhr.send(formData);
	}
	
   

