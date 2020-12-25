import React, { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Terminal from 'react-console-emulator';


import * as fileActions from '../../store/actions/fileUploader';
import * as jokeActions from '../../store/actions/fetchJokes';

const CLI = props => {
    const terminal = React.createRef();
    const inputRef = React.createRef();
    const [file, setFile] = useState(null);
    const upFileSuc = useSelector((state) => state.fileUploader.success);
    const upFileErr = useSelector((state) => state.fileUploader.error);
    const jokesToShow = useSelector((state) => state.fetchJokes.jokes);
    const jokesErr = useSelector((state) => state.fetchJokes.error);

    const dispatch=useDispatch();

    const commands = {
        /**
         * fetch a number of random jokes and print them
         */
        jokes: {
            description: 'shows random number of jokes',
            usage: 'jokes <number>',
            fn: function (arg) {
                dispatch(jokeActions.fetchJokes(arg));
            }
        },
        /**
         * open a file selector to upload files
         */
        file: {
            description: 'uploads a file to the local server',
            usage: 'file',
            fn: function (arg) {
                setFile(null);
                inputRef.current.click();

            }
        }
    }
    /**
     * print the fetched jokes, or the error message if unsuccessful
     */
    useEffect(() => {
        if(jokesToShow != null){
            terminal.current.pushToStdout(jokesToShow);
        }
    },[jokesToShow])


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
            dispatch(fileActions.uploadFile(file));
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
                promptLabel={'me@React:~$'}
            />
        </>
    );
}

export default CLI;