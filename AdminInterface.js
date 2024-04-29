	
	//switch division in admin page
	function toggleForm(formId) {
		var forms = document.querySelectorAll('.form');
		forms.forEach(function(form) {
			form.style.display = 'none';
		});
        document.getElementById(formId).style.display = 'block';
	}
	
	//add book and delete book actions using ajax
   	function adminActions(formId)
   	{
		var formData = new FormData(document.getElementById(formId));
		console.log(formData);
		var xhr = new XMLHttpRequest();
		console.log("create");
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					console.log(xhr.responseText);
					var jsonData = JSON.parse(xhr.responseText);
					console.log(jsonData);
					if(jsonData === 'bookaddedsuccess'){
						document.getElementById('addBookMessage').innerText = 'Book added successfully';
					}
					else if(jsonData === 'bookaddederror'){
						document.getElementById('addBookMessage').innerText = 'Didn\'t able to add book';
					}
					else if(jsonData === 'deletebooksuccess'){
						document.getElementById('deleteMessage').innerText = 'Book deleted successfully';
					}
					else if(jsonData === 'deletebookerror'){
						document.getElementById('deleteMessage').innerText = 'Didn\'t delete book';
					}
				}
			}
		}
		xhr.onerror = function(){
			console.error('Request Failed');
		}
		
		var url = '';
		if(formId === 'addbook'){
			url = 'addbook.action'
		}
		else if(formId === 'deletebook'){
			url = 'deletebook.action';
		}
		
		xhr.open('post', url, true);
		xhr.send(formData);
		console.log("send");
		
	}
	
	//fetch books from database using AJAX
	document.getElementById('showbooks').addEventListener('click',fetchBooks);
	var booksArray = [];
	function fetchBooks()
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'fetchbooks.action', true);
		xhr.send();
		console.log("send");
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					console.log("books");
					var books = JSON.parse(xhr.responseText);
					booksArray = books;
					displayAllBooks(books);
				}
			}
		}
	}
	//display all books
	function displayAllBooks(books)
	{
		console.log("print");
		var tablebody = document.getElementById('tablebody');
		tablebody.innerHTML = '';
		books.forEach(function(book){
			var row = document.createElement('tr');
			row.innerHTML = '<td>'+book.bookId+'</td>'+'<td>'+book.bookName+'</td>'+'<td>'+book.authorName+'</td>'+'<td>'+book.genreName+'</td>'+'<td>'+book.description+'</td>'+'<td>'+book.publishedDate+'</td>'+'<td>'+book.availableCopies+'</td>'+ '<td>'+book.totalCopies+'</td>'+ '<td>'+book.maxBorrowDays+'</td>'+ '<td>'+book.finePerDay+'</td>';
			tablebody.appendChild(row);
		});
	}
	//filter books by name, auhor, and genre
	function searchBooks()
	{
		console.log("filter");
		var bookName = document.getElementById('booknameinput').value.toLowerCase();
		var authorName = document.getElementById('authornameinput').value.toLowerCase();
		var genreName = document.getElementById('genrenameinput').value.toLowerCase();
		
		var filteredBooks = booksArray.filter(function(book){
			return (book.bookName.toLowerCase().includes(bookName) &&
					 book.authorName.toLowerCase().includes(authorName) &&
					 book.genreName.toLowerCase().includes(genreName));
		});
		displayAllBooks(filteredBooks);
	}
	
	//fetch borrowed books form database using AJAX
	document.getElementById('borrowedbooks').addEventListener('click',fetchBorrowedBooks);
	
	function fetchBorrowedBooks()
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'fetchborrowedbooks.action', true);
		xhr.send();
		console.log("send");
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					var books = JSON.parse(xhr.responseText);
					console.log("borrowed");
					displayAllBorrowedBooks(books);
				}
			}
		}
	}
	//display all borrowed books
	function displayAllBorrowedBooks(books)
	{
		var tablebody = document.getElementById('borrowtablebody');
		tablebody.innerHTML = '';
		books.forEach(function(book){
			var row = document.createElement('tr');
			row.innerHTML = '<td>'+book.bookId+'</td>'+'<td>'+book.userId+'</td>'+'<td>'+book.borrowedDate+'</td>'+'<td>'+book.lastReturnDate+'</td>'+'<td>'+book.returnDate+'</td>''<td>'+'Rs.'+book.fine+'</td>';
			tablebody.appendChild(row);
		});
	}
	

	//Get users from database and show to the admin using AJAX request
	document.getElementById('showallusers').addEventListener('click',fetchUsers);
	
	var usersArray = [];
	function fetchUsers() 
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'showallusers.action', true);
		xhr.send();
		
		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					var users = JSON.parse(xhr.responseText);
					usersArray = users;
					displayAllUsers(users);
				}
			}
		}
	}
	//display all users 
	function displayAllUsers(users) 
	{
		var tablebody = document.getElementById('userstablebody');
		tablebody.innerHTML = '';
		
		users.forEach(function(user) {
			var row = document.createElement('tr');
			row.innerHTML = '<td>' + user.userId + '</td>' + '<td>' + user.fullName + '</td>' + '<td>' + user.email + '<td>' + user.password + '</td>' + '<td>' + user.phoneNumber + '</td>' + '<td>' + user.age + '</td>' + '<td>' + user.address + '</td>' + '<td>' + user.membershipEndDate + '</td>';
			tablebody.appendChild(row);
		});
	}
	//search users by their id and name
	function searchUsers() 
	{
		var userIdInput = document.getElementById('useridinput').value.toLowerCase();
		var usernameInput = document.getElementById('nameinput').value.toLowerCase();
		
		var filteredUsers = usersArray.filter(function(user) {
			return  user.userId.toLowerCase().includes(userIdInput) &&
					user.fullName.toLowerCase().includes(usernameInput)
		});
		displayAllUsers(filteredUsers);
	}
