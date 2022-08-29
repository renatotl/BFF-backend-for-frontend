const charactersService = require('./characters.service');

const findAllCharactersController = async (req, res) => {
  try {
  const allCharacters = await charactersService.findAllCharactersService();
  if (allCharacters.length == 0) {
    return res
      .status(404)
      .send({ message: 'There are no characters registered!' });
  }
  res.status(200).send(allCharacters);
} catch (err) {
  res.status(404).send({ message: "Error getting characters" });
}
};

const findCharacterByIdController = async (req, res) => {
  try { 
   const idParams = req.params.id;
   const chooseCharacters = await charactersService.findCharacterByIdServicer(
     idParams
   );
   res.status(200).send(chooseCharacters);
  } catch(err) {
   res.status(400).send({ message: err.message });
 }
 };

const createCharacterController = async (req, res) => {
  try { 
  const character = req.body;
  const newCharacter = await charactersService.createCharacterService(
    character,
  );
  res.status(201).send(newCharacter);
} catch (err) {
  res.status(400).send({ message: "Error creating character" });
}
};


const updateCharacterController = async (req, res) => {
  try { 
  const idParams = req.params.id;
  const characterEditi = req.body;
  const chosenCharacter = await charactersService.updateCharacterService(
    idParams,
    characterEditi,
  );
  res.status(200).send(chosenCharacter);
} catch (err) {
  res.status(400).send({ message: "Error updating character" });
}
};

const deleteCharacterController = async (req, res) => {
  try { 
  const idParam = req.params.id;
  await charactersService.deleteCharacterService(idParam);
  res.send({ message: 'Character was destroyed!' });
} catch (err) {
  res.status(404).send({ message: "Error deleting character" });
}
};

const searchCharacterController =   async (req,res) => {
  try {
  const  character  = req.query.name;

  const searchCharacter = await charactersService.searchCharacterService(character);

  if (character.length === 0) {
    return res
      .status(400)
      .send({ message: "Character do not exist!" });
  }
  return res.status(200).send(searchCharacter)
} catch (err) {
  res.status(404).send({ message: "Error finding character" });
}
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
