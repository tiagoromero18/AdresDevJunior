# AdresDevJunior
Ejercicio tecnico para Adres

# Documentación de la Aplicación

## Introducción

Esta aplicación es un formulario y una vista de adquisiciones, en donde podremos agregar, editar y consultar (con filtros) adiquisiciones que obtenga cierto sector

## Arquitectura

Se conecta una base de datos SQLite a .Net la cual maneja las APIs necesarias que se conectan con endpoints a la aplicación que esta montada en Angular y conecta el front end

## Guía de Instalación

- Primero creas una carpeta nueva que llamaras como quieras en mi caso AdresNewApplication.
- Despues abres una terminal y te dirijes a esa carpeta con:
  ```bash
  cd directorio/de/tu/carpeta
- Una vez estes en la terminal de la carpeta vas a clonar el repositorio
  ```bash
  git clone http/del/repositorio
  ![image](https://github.com/user-attachments/assets/12a8f38d-0f67-4bdc-9b7a-d33bc49f8618)
- Consiguiente a esto vas a abrir Visual studio code, te dirijes al folder donde se clono tu carpeta y vas a poder ver los codigos
- Para el frontend vas a abrir una terminal dentro del mismo Visual Studio Code y te dirijes a la dirección adresApp
  ```bash
  cd adresApp
- Una vez en adresApp corres el siguiente comando `npm install`
- Despues de que este comando corra esta listo para ser corrida la aplicación con el comando `ng serve`
- A la vez abres otra consola y te dirijes a la carpeta de AcquisitionAPI
- Una vez en esta carpeta corres el comando `dotnet run`
- Ten en cuenta que manejamos angular version 19.2 y la ultima de dotnet
