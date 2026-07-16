import { questionRepository } from './question';
import { firestoreQuestionRepository } from './firestore/question';

const USE_FIRESTORE = false;

export const QuestionRepository = USE_FIRESTORE ? firestoreQuestionRepository : questionRepository;
