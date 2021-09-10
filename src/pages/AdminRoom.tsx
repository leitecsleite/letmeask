import { FormEvent,  useState } from 'react';
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

export function AdminRoom(){
    const {user} = useAuth(); 
    const params = useParams<RoomsParams>(); 
 

    const[newQuestion, setNewQuestion] = useState('')

    const roomId = params.id; 
    const {title, questions} = useRoom(roomId);

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
                    <div>
                       <RoomCode code= {roomId} />
                       <Button>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className ='room-title'>
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

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