class LoginModal{

    toggleModal(){
        let overlay = document.getElementById('modal__overlay');

        let modalWindow = document.getElementById('login__modal')
        let modalStatus = modalWindow.getAttribute('class');

        if(modalStatus==='login__modal--show'){
            // close modal and overlay
            modalWindow.classList.remove('login__modal--show');
            modalWindow.classList.add('login__modal--close');

            overlay.classList.remove('modal__overlay--show');
            overlay.classList.add('modal__overlay--hide');
        } else{
            // show modal and overlay
            modalWindow.classList.remove('login__modal--close');
            modalWindow.classList.add('login__modal--show');

            overlay.classList.remove('modal__overlay--hide');
            overlay.classList.add('modal__overlay--show');
        }
        
    }

}
export default LoginModal;