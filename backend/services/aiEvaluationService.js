const aiEvaluationService = {
  evaluateAnswers: async (answers, fieldId) => {
    try {
      // Simulate evaluation delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const numQuestions = answers.length || 1;
      const maxMarksPerQuestion = 100 / numQuestions;

      const evaluation = {
        correctAnswers: 0,
        partialAnswers: 0,
        marksObtained: 0,
        totalMarks: 100,
        percentage: 0,
        generalFeedback: 'Calculation based on response duration and content depth.',
        details: []
      };

      let totalMarksAccumulated = 0;

      answers.forEach((answer) => {
        const timeSpent = answer.timeSpent || 0;
        const text = answer.answer || '';

        // Logic: 120 seconds (2 mins) = full marks
        // Scale mark based on time spent (0 to 120)
        let marks = 0;
        if (text.trim().length > 0) {
          // If they talked, calculate marks based on time
          // (timeSpent / 120) * maxMarksPerQuestion
          marks = Math.min((timeSpent / 120) * maxMarksPerQuestion, maxMarksPerQuestion);

          // Bonus for technical words (to ensure it's not just silence)
          const words = text.split(/\s+/).length;
          if (words < 5 && timeSpent > 30) {
            // Probably long silence or white noise, penalize
            marks = marks * 0.3;
          }
        } else {
          marks = 0; // No talk = 0 marks
        }

        totalMarksAccumulated += marks;

        // Categorize for breakdown
        const scoreOutOf10 = (marks / maxMarksPerQuestion) * 10;
        if (scoreOutOf10 >= 8) evaluation.correctAnswers++;
        else if (scoreOutOf10 >= 4) evaluation.partialAnswers++;

        evaluation.details.push({
          questionId: answer.questionId,
          userAnswer: text,
          timeSpent: timeSpent,
          marks: Math.round(scoreOutOf10), // For individual question view /10
          feedback: getTimeFeedback(timeSpent, text)
        });
      });

      evaluation.marksObtained = Math.round(totalMarksAccumulated);
      evaluation.percentage = evaluation.marksObtained; // Since total is 100
      evaluation.generalFeedback = generateFeedback(evaluation.percentage);

      return evaluation;

    } catch (error) {
      console.error('Error in evaluation:', error);
      return {
        correctAnswers: 0,
        partialAnswers: 0,
        marksObtained: 0,
        totalMarks: 100,
        percentage: 0,
        generalFeedback: 'Failed to generate evaluation results.',
        details: []
      };
    }
  }
};

const getTimeFeedback = (timeSpent, text) => {
  if (text.trim().length === 0) return 'No response recorded.';
  if (timeSpent >= 100) return 'Excellent! You provided a detailed long explanation.';
  if (timeSpent >= 60) return 'Good response duration, covers significant points.';
  if (timeSpent >= 30) return 'Average explanation, could be more detailed.';
  return 'The explanation was too short. Try to elaborate more next time.';
};

const generateFeedback = (percentage) => {
  if (percentage >= 90) return 'Outstanding candidate! You demonstrate clear confidence and thorough knowledge.';
  if (percentage >= 75) return 'Great work! You provided detailed answers for most questions.';
  if (percentage >= 50) return 'Solid start, but aim for longer, more descriptive explanations.';
  return 'Practice speaking for at least 60-90 seconds per question to improve your score.';
};

module.exports = aiEvaluationService;
