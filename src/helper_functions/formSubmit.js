import getCookie from './getCookie';
import history from './history';

var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

const onSubmit = (values) => {

    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }

    values.password = passwordHash.generate(values.password);
    const secret =  'basic-secret-token';
    const payload = values;
    const jwtToken = jwt.sign(({exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), data : payload}), secret, { header : header })

    document.cookie = 'jwt-token=' + jwtToken + 'expires=Thu, 18 Dec 2020 12:00:00 UTC';

    console.log('JWT Token: ' + getCookie('jwt-token'))
    // this.props.history.push('/HomeScreen')
    // console.log('Pushing...')
    history.push('/HomeScreen')
    // window.location.reload()
    }

export default onSubmit