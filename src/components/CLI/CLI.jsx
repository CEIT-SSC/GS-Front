import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Terminal from 'react-console-emulator';


import * as actions from '../../store/actions';

const CLI = props => {
    const terminal = React.createRef();
    const inputRef = React.createRef();
    const [file, setFile] = useState(null);
    const [qToSubmit, setQToSubmit] = useState(null);
    const [qIndex, setQIndex] = useState(null);
    const {upFileSuc, upFileErr, jokesToShow, jokesSuccess, jokesErr , error, token ,username, isAuthenticated, 
    questions,questionsSuccess,questionsErr , scores , scoresSuccess , scoresError } = props;

    const dispatch=useDispatch();
    
    const getQuestion =(index) =>{
        if(questions===null){
            setQIndex(index);
            dispatch(actions.fetchUserQuestions(token));
        }
        else if(index <0 || index >=questions.length){
        terminal.current.pushToStdout("Invalid Index");
        }
        else{          
            const qel=questions[index];
            terminal.current.pushToStdout(qel.name);
            terminal.current.pushToStdout(qel.body);
            qel.examples.forEach((el, index2) => {
                terminal.current.pushToStdout("Example "+ (index2+1) +" :");
                terminal.current.pushToStdout("Input : "+el.input);
                terminal.current.pushToStdout("Output : "+el.output);               
            });
    }}

    const commands = {
        /**
         * fetch a number of random jokes and print them
         */
        jokes: {
            description: 'shows random number of jokes',
            usage: 'jokes <number>',
            fn: function (arg) {
                dispatch(actions.fetchJokes(arg));
            }
        },
        /**
         * open a file selector to upload files
         */
        submit: {
            description: 'upload code and results(as .txt file) together',
            usage: 'submit <question index>',
            fn: function (arg) {
                setQToSubmit(arg);
                setFile(null);
                console.log(file);
                inputRef.current.click();
            }
        },
        login : {
            description: 'log in as a user',
            usage: 'login <studentNumber> <Password>',
            fn: function (arg1, arg2) {
                const userData = {
                    studentNumber: arg1,
                    password: arg2
                };
                dispatch(actions.authUser(userData));
            }
        },
        getQuestions : {
            description : 'fetch available questions',
            usage : 'getQuestions' , 
            fn : function () {
                dispatch(actions.fetchUserQuestions(token));
            }
        },
        getQuestion : {
            description : "get details of a chosen question",
            usage : 'getQuestion <number>',
            fn : function (arg) {
                getQuestion(arg-1);
            }
        },
        scoreBoard : {
            description : "see the ranking board",
            usage : 'scoreBoard' , 
            fn :function () {
                dispatch(actions.getScoreBoard());
            }
        },
        logout : {          
            description: 'log out',
            usage : 'logout' ,
            fn : function () {
                console.log(token);
                dispatch(actions.logoutUser(token));
            }
        }
    }
    useEffect(()=> {
        if(username !== "user"){
            terminal.current.pushToStdout("Welcome "+ username);
        }
    },[username])

    useEffect (() =>{
        if(error!=null) {
            terminal.current.pushToStdout(error.message);
        }
    },[error])

    useEffect(() => {
        if(questions != null){
            if(qIndex === null){
                questions.forEach((el,index) => {
                    terminal.current.pushToStdout("Question number "+(index+1)+ " :");
                    terminal.current.pushToStdout(el.name);
                });
            } else {
                const qel=questions[qIndex];
                terminal.current.pushToStdout(qel.name);
                terminal.current.pushToStdout(qel.body);
                qel.examples.forEach((el, index2) => {
                    terminal.current.pushToStdout("Example "+ (index2+1) +" :");
                    terminal.current.pushToStdout("Input : "+el.input);
                    terminal.current.pushToStdout("Output : "+el.output);               
                });
                setQIndex(null);
            }

        }
    },[questionsSuccess])


    useEffect(() => {
        if(questionsErr != null){
            terminal.current.pushToStdout(questionsErr.message);
        }
    },[questionsErr])
    
    /**
     * print the fetched jokes, or the error message if unsuccessful
     */
    useEffect(() => {
        if(jokesToShow != null){
            terminal.current.pushToStdout(jokesToShow);
        }
    },[jokesSuccess])


    useEffect(() => {
        if(jokesErr != null){
            terminal.current.pushToStdout(jokesErr.message);
        }
    },[jokesErr])

    /**
     * upload files and show the result
     */
    useEffect(() => {
        if (file != null) {
            if(questions !== null){
                let flag = false;
                const data = new FormData();
                data.append('questionID', questions[parseInt(qToSubmit)-1]._id);
                for (let el in file) {
                    if(el !== 'length'){
                        if(file[el].name.split('.')[1] === 'txt'){
                            data.append('output', file[el]);
                            flag = true;
                        } else {
                            data.append('code', file[el]);
                        }
                    }
                }
                if (flag){
                    dispatch(actions.uploadFile(data, token));
                } else {
                    terminal.current.pushToStdout("you should provide a .txt file for outputs!");
                }
                setQToSubmit(null);
            } else {
                terminal.current.pushToStdout("run getQuestions first!");
            }
            setFile(null);
        }
    }, [file])

    useEffect(() => {
        if(upFileSuc){
            terminal.current.pushToStdout("successful");
        }
    }, [upFileSuc])

    useEffect(() => {
        if(upFileErr != null){
            terminal.current.pushToStdout(upFileErr.message);
        }
    }, [upFileErr])

    useEffect (()=>{
        if(scores){
            scores.forEach((el,index) => {
                terminal.current.pushToStdout("Rank number "+(index+1)+ " :");
                terminal.current.pushToStdout("StudentNumber: " +el.studentNumber + " Penalty: " + el.penalty + " Score: " + el.score);
                console.log(el);
            });
        }
    },[scoresSuccess])

    useEffect (()=>{
        if(scoresError){
            terminal.pushToStdout(scoresError.message);
        }
    }, [scoresError])

    return (
        <>
            <input type="file" multiple
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={(event) => { setFile(event.target.files) }}
            />
            <Terminal
                style={{ width: '70%', height: '60%' }}
                ref={terminal}
                commands={commands}
                welcomeMessage={'Welcome to the React terminal!'}
                promptLabel={token ? `${username}@GS:~$` : 'me@GS:~$'}
            />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        upFileSuc : state.fileUploader.success,
        upFileErr : state.fileUploader.error,
        jokesToShow : state.jokeFethch.jokes,
        jokesSuccess : state.jokeFethch.success,
        jokesErr : state.jokeFethch.error,
        error : state.userAuth.error,
        token : state.userAuth.token,
        username : state.userAuth.username,
        isAuthenticated : state.userAuth.isAuthenticated,
        questions : state.userQuestions.questions,
        questionsSuccess : state.userQuestions.success,
        questionsErr : state.userQuestions.error,
        scores: state.getScoreBoard.scores,
        scoresSuccess: state.getScoreBoard.success , 
        scoresError: state.getScoreBoard.error
    }
}

export default connect(mapStateToProps)(CLI);