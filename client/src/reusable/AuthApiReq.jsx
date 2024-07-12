async function auth(i){
    const token=localStorage.getItem('token')
console.log(token)

const req = await fetch(`http://localhost:3000/${i}`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ token: token }),
});

const data=await req.json()
    console.log(data)
    if(!data){
        alert('you are not authorized')
        navigate('/signin');

    }
    else{
        alert('you are logged in')
    }
}
export default auth;