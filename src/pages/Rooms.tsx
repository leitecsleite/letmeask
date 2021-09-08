import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'; 
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


import '../style/rooms.scss'; 

type RoomsParams = {
    id:string; 
}


export function Room(){
    const {user} = useAuth(); 
    const params = useParams<RoomsParams>(); 
    const roomId = params.id;  

    const[newQuestion, setNewQuestion] = useState('')

    async function handleSendQuestion(event: FormEvent) {

        event.preventDefault(); 

        if(newQuestion.trim() === ''){
            return; 
        }

       if(!user){
           throw new Error("You must be logged in");
       }

       const question = {
           content: newQuestion, 
           author: {
               name: user.name, 
               avatar: user.avatar, 
           }, 

           isHighlighted: false, 
           isAnswered: false
       }; 
        
        await database.ref(`rooms/${roomId}/questions`).push(question); 

        setNewQuestion(''); 
    }

    return(
        <div className= "page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code= {roomId} />
                </div>
            </header>

            <main>
                <div className ='room-title'>
                    <h1>Sala React</h1>
                    <span>4 Perguntas</span>
                </div>

                <form onClick = {handleSendQuestion}>
                     
                    <textarea 
                      placeholder ="O que você quer perguntar ?"
                      onChange = {event => setNewQuestion(event.target.value)}
                      value = {newQuestion}
                    />
                 
                <div className ='form-footer'>
                    {user ? (
                        <div className ='form-footer'>

                        </div>
                    ):( 
                     <div>
                        <span>Para enviar uma pergunta, <button>faça o seu login</button></span> 
                     </div>  
                    )}
                     <Button type ="submit" disabled ={!user}>Enviar pergunta</Button>
                </div>
                </form>
            </main>
            
        </div>
    )
}