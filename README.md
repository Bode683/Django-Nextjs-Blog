Django-React-Blog
This is a "Blogging Platform" which gives all general features a blog should have.

The backend is completely build on Django using Django Rest Framework, while the frontend is completed using ReactJS.



Backend Setup
Clone this repository: git clone https://github.com/Bode683/Django-Nextjs-Blog/tree/blog-v2.git.
Change the current directory to backend folder: cd ./blog/backend/.
Create a virutal environment and install all backend dependencies with pipenv: pipenv install.
Start the virtual environment: pipenv shell.
Change the working directory to blog_backend which contains the manage.py file: cd ./blog_backend.
Run python manage.py makemigrations.
Run python manage.py migrate.
Create a superuser: python manage.py createsuperuser
Run the server: python manage.py runserver.


Frontend Setup
Navigate the current working directory to blog_frontend: cd ./blog/frontend/react/core/.
Install the all frontend dependencies using npm: npm install.
Run the server: npm start.


Creating The First Post
Make sure that both Backend and Frontend Servers are running.
Open your browser and navigate to localhost:3000.
Click 'Add' on the top nav bar.
Fill the form to create a new post and then Submit it.

