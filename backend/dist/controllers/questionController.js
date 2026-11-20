import { getCurrentQuestion, getAvailableTopics } from '../services/quizService.js';
export async function handleGetNextQuestion(req, res) {
    try {
        const sessionId = req.query.sessionId || req.params.sessionId;
        if (!sessionId) {
            return res.status(400).json({ error: 'sessionId query parameter is required' });
        }
        const question = getCurrentQuestion(sessionId);
        if (!question) {
            return res.status(200).json({
                hasMore: false,
                message: 'No more questions available or quiz session is completed.'
            });
        }
        return res.status(200).json({ hasMore: true, question });
    }
    catch (err) {
        console.error('Error in handleGetNextQuestion:', err);
        return res.status(500).json({ error: err.message || 'Failed to fetch question' });
    }
}
export async function handleGetTopics(req, res) {
    try {
        const topics = getAvailableTopics();
        return res.status(200).json(topics);
    }
    catch (err) {
        console.error('Error in handleGetTopics:', err);
        return res.status(500).json({ error: err.message || 'Failed to fetch topics' });
    }
}
