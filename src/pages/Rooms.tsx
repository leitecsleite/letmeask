import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'; 
import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


import '../style/rooms.scss'; 

type FirebaseQuestion = Record<string, {
    author:{
        name:string; 
        avatar:string; 
    }
    content: string; 
    isAnswered: boolean; 
    isHighlighted: boolean; 
}>

type RoomsParams = {
    id:string; 
}

type QuestionType = {
    id:string; 
    author: {
        name: string; 
        avatar: string; 
    }
    content: string; 
    isAnswered: boolean; 
    isHighlighted: boolean; 
}

export function Room(){
    const {user} = useAuth(); 
    const params = useParams<RoomsParams>(); 
 
    const [questions, setQuestion] = useState<QuestionType[]>([]); 
    const [title, setTitle] = useState(''); 

    const[newQuestion, setNewQuestion] = useState('')

    const roomId = params.id; 
    const {} = useRoom(roomId);

    useEffect(()=> {
        const roomRef = database.ref(`rooms/${roomId}`); 
        roomRef.on('value', room => {
            const databaseRoom= room.val(); 
            const firebaseQuestion:FirebaseQuestion =databaseRoom.questions ?? {}; 

            const parsedQuestions = Object.entries(firebaseQuestion).map(([key,value])=> {
                return {
                    id: key,
                    content: value.content, 
                    author: value.author, 
                    isHighlighted: value.isHighlighted, 
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title); 
            setQuestion(parsedQuestions); 
        })
    },[roomId])

    


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
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onClick = {handleSendQuestion}>
                     
                    <textarea 
                      placeholder ="O que você quer perguntar ?"
                      onChange = {event => setNewQuestion(event.target.value)}
                      value = {newQuestion}
                    />
                 
                <div className ='form-footer'>
                    {user ? (
                        <div className ='user-info'>
                           <img src={user.avatar} alt='' />
                           <span>{user.name}</span>
                        </div>
                    ):( 
                     <div>
                        <span>Para enviar uma pergunta, <button>faça o seu login</button></span> 
                     </div>  
                    )}
                     <Button type ="submit" disabled ={!user}>Enviar pergunta</Button>
                </div>
                </form>
                
                <div className = "question-list">
                {questions.map(questions => {
                    return(
                        <Question
                          key = {questions.id}
                          content = {questions.content}
                          author ={questions.author}
                        />
                    )
                })}
                </div>
            </main>
            
        </div>
    )
}