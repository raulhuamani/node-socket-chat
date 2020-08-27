var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');
var divTituloSala = $('#divTituloSala');

// Funciones para renderizar usuarios
function renderizarUsuarios(personas) { // [{}, {}, {}]

    console.log(personas);

    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + (i + 1) + '.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);

    html = '<h3 class="box-title">Sala de chat <small>' + sala + '</small></h3>';
    divTituloSala.html(html);
}




function renderizarMensajes(mensaje, yo) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn" >';
        if (mensaje.nombre !== 'Administrador') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        if (mensaje.nombre !== 'Administrador') {
            html += '<h5>' + mensaje.nombre + '</h5>';
        }
        html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);
    //divChatbox.append(divChatbox_html);
    scroll('divChatbox', 'li');
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

function scroll(nombrePadre, nombreHijo) {
    var padre = $(`#${nombrePadre}`); //
    var totalHeight = 0;
    // console.log(padre.find(nombreHijo).length)
    padre.find(nombreHijo).each(function() {
        //console.log(`totalHeight: ${totalHeight} - $(this).outerHeight(): ${$(this).outerHeight()}`)
        totalHeight += $(this).outerHeight();
    });

    // padre.scrollTop(totalHeight); //el scroll siempre lleva al final del div

    $(`#${nombrePadre}`).animate({
        scrollTop: totalHeight
    }, 500); //animacion!

};


// Listeners
//cuando se haga click en cualquier ancol type que se encuentre dentro de divUsuarios dispara la funcion() que obtiene el id
divUsuarios.on('click', 'a', function() {
    // this hace referencia al ancol type 'a' y al utilizar " $(this).data('id') " -> obtiene el valor de "<a data-id="' + personas[i].id +"
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {
    e.preventDefault();


    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    //console.log(txtMensaje.val());
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        //scrollBottom();
    });

});