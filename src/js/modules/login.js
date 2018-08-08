
class Login{

    // wip: do validation
    formValidation(email, password){
        console.log('validation called');
        return true;
    }

    // check login credentials and return bool
    userLogin(loginUser){

        // wip: change endpoint
        fetch('http://localhost:3000/getUserByEmailPassword', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginUser)
          })
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
            console.log(json.status);
        });
        return false;
    }

}
export default Login;