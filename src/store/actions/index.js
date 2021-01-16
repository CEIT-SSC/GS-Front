export {
    uploadFile
} from './fileUploader';

export { 
    fetchJokes
} from './fetchJokes';

export {
    authUser,
    logoutUser
} from './userAuth'

export {
    authSuperAdmin,
    logoutSuperAdmin
} from './adminAuth'

export {
    fetchUserQuestions
}from './fetchUserQuestions'

export {
    getUsers,
    getQAdmins,
    addUser,
    addQAdmin,
    deleteUser,
    deleteQAdmin,
    editQAdmin,
    editUser
} from './user-admin-CRUD';

export {
    addQuestion,
    getQuestions,
    deleteQuestion,
    editQuestion
} from './questions';

export {
    getScoreBoard
} from './scoreBoard';