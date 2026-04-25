const form = document.getElementById('formulario');
const formResult = document.getElementById('formResult');

const fields = [
    { id: 'nombre' },
    { id: 'apellido' },
    { id: 'email' },
    { id: 'fechaNacimiento' },
    { id: 'password' },
    { id: 'confirmPassword' }
];

const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = message;
}

function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = '';
}

function validateField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();

    let valid = true;
    let message = '';

    if (value === '') {
        valid = false;
        message = 'Este campo es obligatorio.';
    } else {
        switch (id) {
            case 'nombre':
            case 'apellido':
                if (value.length < 3) {
                    valid = false;
                    message = 'Debe tener al menos 3 caracteres.';
                } else if (!regexTexto.test(value)) {
                    valid = false;
                    message = 'Solo se permiten letras.';
                }
                break;

            case 'email':
                if (!regexEmail.test(value)) {
                    valid = false;
                    message = 'Ingrese un email válido.';
                }
                if (!value.endsWith('@ucasal.edu.ar')) {
                    valid = false;
                    message = 'Solo se permiten correos institucionales @ucasal.edu.ar';
                }
                break;

            case 'fechaNacimiento':
                const fecha = new Date(value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fecha.getFullYear();
                if (hoy.getMonth() < fecha.getMonth() || (hoy.getMonth() === fecha.getMonth() && hoy.getDate() < fecha.getDate())) {
                    edad--;
                }
                if (edad < 18) {
                    valid = false;
                    message = 'Debes tener al menos 18 años.';
                }
                else if (edad > 40) {
                    valid = false;
                    message = 'Debes tener menos de 40 años.';
                }
                break;

            case 'password':
                if (value.length < 6) {
                    valid = false;
                    message = 'La contraseña debe tener al menos 6 caracteres.';
                }
                break;

            case 'confirmPassword':
                const password = document.getElementById('password').value;
                if (value !== password) {
                    valid = false;
                    message = 'Las contraseñas no coinciden.';
                }
                break;
        }
    }

    if (valid) {
        clearError(input);
    } else {
        setError(input, message);
    }

    return valid;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    formResult.className = 'alert d-none';
    formResult.textContent = '';

    const allValid = fields.every(field => validateField(field.id));

    if (!allValid) {
        formResult.className = 'alert alert-danger';
        formResult.textContent = 'Corrige los errores en el formulario antes de enviar.';
        return;
    }

    formResult.className = 'alert alert-success';
    formResult.textContent = 'Formulario enviado correctamente.';

    form.reset();

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.classList.remove('is-valid');
    });
});