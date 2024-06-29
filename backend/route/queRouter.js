const express = require('express');
const Vocabulary = require('../model/vocabSchema');
const router = express.Router();
const fetchUser = require('../middleware/fetchUserMiddleware');

// Helper function to shuffle array (for randomizing options)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// { $match: { userId: req.user.id } }, 
router.get('/play', fetchUser, async (req, res) => {
  console.log(req.user.id);
  try {
    // Fetch 10 random vocab words from MongoDB
    const randomVocabs = await Vocabulary.aggregate([{ $match: { userId: req.user.id } }, { $sample: { size: 10 } }]);

    // Prepare an array to hold the quiz questions
    const quizQuestions = await Promise.all(randomVocabs.map(async (correctAnswer) => {
      // Fetch 3 more random vocab words for incorrect options
      const incorrectOptions = await Vocabulary.aggregate([
        { $match: { userId: req.user.id, _id: { $ne: correctAnswer._id } } }, // Exclude correct answer
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

router.post('/create', fetchUser, async (req, res) => {
  const { vocab, meaning, sentence, description } = req.body;
  try {
    let newVocab = new Vocabulary({ vocab, meaning, sentence, description, userId : req.user.id });
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

router.get('/fetchallvocab', fetchUser, async (req, res) => {
  const vocabs = await Vocabulary.find({userId : req.user.id});
  res.send(vocabs);
})

router.put('/updatevocab/:id', fetchUser, async (req, res) => {
  const vocabId = req.params.id;
  const { vocab, meaning, sentence, description } = req.body;
  try {
    const updatedVocab = await Vocabulary.updateOne({ _id: vocabId }, { $set: { vocab, meaning, sentence, description } }, { upsert: true });
    res.status(201).send(updatedVocab);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deletevocab/:id', async (req,res) => {
  const delId = req.params.id;
  const deletedNote = await Vocabulary.findOneAndDelete({ _id: delId })
  res.send(deletedNote);
})

module.exports = router;
