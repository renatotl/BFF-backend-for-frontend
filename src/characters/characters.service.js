const Characters = require('./Character');

const findAllCharactersService = async () => {
  const characters = await Characters.find();
  return characters;
};

const findCharacterByIdServicer = async (idParams) => {
  const character = await Characters.findById(idParams);
  return character;
};
/*
const createCharacterService = async (newCharacter,userId) => {// o mongodb não monja uma table com outra é necessário fazer manualmente neste caso a o {user:} relacionamento de tabelas
  await Characters.create({newCharacter, user: userId});
 
};*/

const createCharacterService = async (newCharacter) => {
  const characterCreated = await Characters.create(newCharacter);
  return characterCreated;
};


const updateCharacterService = async (id, characterEdited) => {

  const characterUpdate = await Characters.findByIdAndUpdate(
    id,
    characterEdited,
  );
  return characterUpdate;
  
};

const deleteCharacterService = async (id) => {
  return await Characters.findByIdAndDelete(id);
};

const searchCharacterService = async (name) => {
  return await Characters.findOne({ name: name });
};

module.exports = {
  findAllCharactersService,
  findCharacterByIdServicer,
  createCharacterService,
  updateCharacterService,
  deleteCharacterService,
  searchCharacterService
};
