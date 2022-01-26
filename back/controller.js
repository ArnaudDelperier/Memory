// import du modèle score
const Score = require('./models');

const controller = {

    addNewScore: async (req, res) => {
        let { pseudo, time } = req.body;
    
        let score = new Score({
          pseudo,
          time,
        });

        try {
          score = await score.save();
          res.status(200).json({ save: 'ok' });
        } catch (error) {
          console.trace(error);
          res.status(400).json({ save: 'une erreur est survenue' });
        }
      }
}

module.exports = controller;