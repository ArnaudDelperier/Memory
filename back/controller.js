// import mongoose schema
const Score = require('./models');

const controller = {

    getAllscores: async (req, res) => {
        try {
            const data = await Score.find();

            // we sort the list in ascending order of score
            const sortedData = data.sort((a, b) => +a.time - +b.time);

            // cleaning unnecessary data for the front
            const scores = sortedData.map((score, i) => {
                return {
                    place: i + 1,
                    pseudo: score.pseudo,
                    time: score.time,
                }
              });

            res.status(200).json(scores);
        } catch(error) {
            console.trace(error);
            res.status(400).json({ getAllScores: 'une erreur est survenue' });
        }
    },

    // save new score to database
    addNewScore: async (req, res) => {
        // we deconstruct the data of the body
        let { pseudo, time } = req.body;
    
        let score = new Score({
          pseudo,
          time,
        });

        // send score to database
        try {
          score = await score.save();
          res.status(200).json({ addNewScore: 'ok' });
        } catch (error) {
          console.trace(error);
          res.status(400).json({ addNewScore: 'une erreur est survenue' });
        }
      }
}

module.exports = controller;