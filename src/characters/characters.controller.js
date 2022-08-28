const charactersService = require('./characters.service');

const findAllCharactersController = async (req, res) => {
  const allCharacters = await charactersService.findAllCharactersService();
  if (allCharacters.length == 0) {
    return res
      .status(404)
      .send({ message: 'There are no characters registered!' });
  }
  res.send(allCharacters);
};

const findCharacterByIdController = async (req, res) => {
  try { 
   const idParams = req.params.id;
   const chooseCharacters = await charactersService.findCharacterByIdServicer(
     idParams
   );
   res.send(chooseCharacters);
  } catch(err) {
   res.status(500).send({ message: err.message });
 }
 };

const createCharacterController = async (req, res) => {
  const character = req.body;
  const newCharacter = await charactersService.createCharacterService(
    character,
  );
  res.status(201).send(newCharacter);
};


const updateCharacterController = async (req, res) => {
  const idParams = req.params.id;
  const characterEditi = req.body;
  const chosenCharacter = await charactersService.updateCharacterService(
    idParams,
    characterEditi,
  );
  res.send(chosenCharacter);
};

const deleteCharacterController = async (req, res) => {
  const idParam = req.params.id;
  await charactersService.deleteCharacterService(idParam);
  res.send({ message: 'Character was destroyed!' });
};

const searchCharacterController =   async (req,res) => {
  const  character  = req.query;

  const searchCharacter = await charactersService.searchCharacterService(character);

  if (character.length === 0) {
    return res
      .status(400)
      .send({ message: "Character do not exist!" });
  }
  return res.status(200).send(searchCharacter)
}

// const searchCharacterController = async (name, username) => {
//   const charactersFound = await Character.find({ name: { $regex: '.*' + name + '.*' }, username: username });

//   if (!charactersFound) {
//       return { found: false, characters: null, message: 'Nenhum personagem foi encontrado!' };
//   };

//   return { found: true, characters: charactersFound, message: null };
// };

module.exports = {
  findAllCharactersController,
  findCharacterByIdController,
  createCharacterController,
  updateCharacterController,
  deleteCharacterController,
  searchCharacterController
};
