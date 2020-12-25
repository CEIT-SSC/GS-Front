import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Terminal from 'react-console-emulator';


import * as actions from '../../store/actions';

const CLI = props => {
    const terminal = React.createRef();
    const inputRef = React.createRef();
    const [file, setFile] = useState(null);

    const {upFileSuc, upFileErr, jokesToShow, jokesSuccess, jokesErr} = props;

    const dispatch=useDispatch();

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
            dispatch(actions.uploadFile(file));
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

const mapStateToProps = (state) => {
    return {
        upFileSuc : state.fileUploader.success,
        upFileErr : state.fileUploader.error,
        jokesToShow : state.jokeFethch.jokes,
        jokesSuccess : state.jokeFethch.success,
        jokesErr : state.jokeFethch.error,
    }
}

export default connect(mapStateToProps)(CLI);