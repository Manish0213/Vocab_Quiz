const express = require('express');
const Vocabulary = require('../model/vocabSchema');
const router = express.Router();

// Helper function to shuffle array (for randomizing options)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.get('/play', async (req, res) => {
  try {
    // Fetch 10 random vocab words from MongoDB
    const randomVocabs = await Vocabulary.aggregate([{ $sample: { size: 10 } }]);

    // Prepare an array to hold the quiz questions
    const quizQuestions = await Promise.all(randomVocabs.map(async (correctAnswer) => {
      // Fetch 3 more random vocab words for incorrect options
      const incorrectOptions = await Vocabulary.aggregate([
        { $match: { _id: { $ne: correctAnswer._id } } }, // Exclude correct answer
        { $sample: { size: 3 } }
      ]);

      // Prepare options array with objects and shuffle it
      const options = shuffle([
        { meaning: correctAnswer.meaning, id: correctAnswer._id },
        ...incorrectOptions.map(option => ({ meaning: option.meaning, id: option._id }))
      ]);

      // Find the index of the correct answer in the shuffled options
      const correctIndex = options.findIndex(option => option.id.equals(correctAnswer._id));

      // Prepare individual quiz question object
      return {
        question: `What is the meaning of ${correctAnswer.vocab}?`,
        options: options,
        correctAnswer: correctAnswer.meaning, // Include correct answer
        correctIndex: correctIndex // Include correct index
      };
    }));

    // Send the array of quiz questions
    res.json(quizQuestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/create', async (req, res) => {
  const { vocab, meaning } = req.body;
  try {
    let newVocab = new Vocabulary({ vocab, meaning });
    newVocab = await newVocab.save();
    res.status(201).send(newVocab);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/fetchvocab/:id', async (req, res) => {
  const id = req.params.id;
  const vacab = await Vocabulary.findOne({_id: id});
  res.send(vacab);
})

module.exports = router;
