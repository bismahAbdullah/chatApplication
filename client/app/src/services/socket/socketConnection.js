import io from 'socket.io-client'
const url ='http://localhost:3002'
const socket=io(url)
export default socket;