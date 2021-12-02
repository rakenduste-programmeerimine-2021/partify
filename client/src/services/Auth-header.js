export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user && accessToken) {
        //x-access-token
        return { 'x-access-token': user.accessToken }
    } else {
        return {}
    }

}