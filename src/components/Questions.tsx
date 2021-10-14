import { ReactNode } from 'react';

import '../style/questions.scss'; 


type QuestionProps = {
    content: string; 
    author: {
        name: string; 
        avatar: string; 
    }; 
    children?: ReactNode; 
    isAnswered?: boolean; 
    isHighlighted?: boolean; 
}

export function Question ({
    content, 
    author, 
    isAnswered = false,
    isHighlighted = false,
    children, 
}:QuestionProps){
    return(
        <div className ={`questions ${isAnswered ? 'answered': ''} ${isHighlighted  && !isAnswered  ? 'highlighted' : ''}`}>
            <p>{content}</p>

            <footer>
                <div className = "user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div>
                 {children}
                </div>
            </footer>
        </div>
    )
}