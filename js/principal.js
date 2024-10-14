window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const btnLogout = document.getElementById('btnLogout');


    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    const tipoDocumento=this.localStorage.getItem('tipoDocumento');
    const numeroDocumento=this.localStorage.getItem('numeroDocumento');

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    btnLogout.addEventListener('click', function(event) {
        realizarLogout(tipoDocumento, numeroDocumento);
    });

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

//Función asincrona del logout
async function realizarLogout(tipoDocumento, numeroDocumento) {

    const url = 'http://localhost:8082/login/logout'; 
    const request = {
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento
    };

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema al cerrar sesión');
            throw new Error(`Error: ${response.statusText}`);
        }

        // validar respuesta
        const result = await response.json();
        console.log('Respuesta del servidor: ', result);

        if (result.resultado) {
            localStorage.removeItem('result'); 
            window.location.replace('inicio.html');  
        } else {
            mostrarAlerta(result.mensajeError);
        }

    } catch (error) {
        console.log('Error: Ocurrió un problema al cerrar sesión', error);
        mostrarAlerta('Error: Ocurrió un problema al cerrar sesión');
    }

}