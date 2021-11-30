 ##PASOS PARA INSTALAR EL BACKEND
 
 1- Descarga [AppServ](https://www.appserv.org/en/) e instalalo
 
 2- una vez descargado, te tienes que dirigir en tu pc  a esta ruta "C:\AppServ\www"  y ahí creas una carperta llamada "examen_tecnico"
 
 3- Dentro de la consola dirigite a esta ruta "C:\AppServ\www\examen_tecnico" y corre este comando "git clone https://github.com/vega99/examen-practico-api.git questions_services"
 
 
 ##CONFIGURACIÓN BACKEND PARA BASE DE DATOS
 
 1- crea una base de datos con este código
 
"create database questions_answers;
use questions_answers;

create table users(
  id int primary key auto_increment,
  name varchar(100) not null,
  lastname varchar(100) not null,
  email varchar(100) not null,
  password text not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp
);

create table questions(
  id int primary key auto_increment,
  title varchar(255) not null,
  description text not null,
  user_id int not null,
  foreign key (user_id) references users(id),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp  
);

create table answers (
  id int primary key auto_increment,
  answer text not null,
  user_id int not null,
  foreign key (user_id) references users(id),
  question_id int not null,
  foreign key (question_id) references questions(id),
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp on update current_timestamp  
);

alter table questions add column answer_id int, add foreign key (answer_id) references answers(id); "

2- ya cuando sea creada la base de datos, en vscode o cualquier otro editor de texto abre el proyecto de la api (backend) que se descargó previamente en la 

carpeta "application/config/database.php y en el campo "password" coloca la contraseña que creaste en la instalación de AppServe


###Listo, el backend ya esta montado
 
 
 
 ##INSTALACIÓN DEL FRONT-END

1- Descarga [node js](https://nodejs.org/es/)

2- Clona este proyecto en cualquier directorio de tu pc

3- una vez clonado, abre ese directorio y corre este comando #npm install

4- Cuando se descarguen las dependencias corre "npm start" y el proyecto ya estará funcionando

