
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg'; 

import '../style/auth.scss'; 
import { Button } from '../components/Button'; 

import '../style/button.scss';

import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function NewRoom(){
    const[newRoom, setNewRoom] = useState('');
    const {user} = useAuth(); 
    
    const history = useHistory();

    async function handleCreateRoom(event:FormEvent){
        event.preventDefault();

        if(newRoom.trim()=== ''){
            return;
        }
       const roomRef = database.ref('rooms');

       const firebaseRooms = await roomRef.push({
           title: newRoom, 
           authorId: user?.id, 
       })

       history.push(`/rooms/${firebaseRooms.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src = {illustrationImg} alt ='ilustração simbolizando perguntas e respostas'/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <img className="user-avatar" src={user?.avatar} alt='Imagem do usuario' />
                    <h2>Criar uma nova sala</h2>
                    <form  onSubmit = {handleCreateRoom}>
                        <input 
                        type="text"
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value = {newRoom}
                         />
                         <Button type="submit"> 
                           Criar sala 
                         </Button>
                    </form>
                    <p>
                       Quer entrar em sala existente ?
                       <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>

    )
}

