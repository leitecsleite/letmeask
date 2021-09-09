import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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



export function useRoom (roomId: string){
    const [questions, setQuestion] = useState<QuestionType[]>([]); 
    const [title, setTitle] = useState(''); 

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
    
    return {questions, title}
}