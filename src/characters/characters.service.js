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

const searchCharacterService = async(req,res) => Characters.find({
  character: { $regex: `${req || ""}`, $options: "i" },
})//regex é mongpdb puro dentro do backend/ o "i"  ele ignora letra maiuscula eminiscula isso é case senssitive
.sort({ _id: -1 })
.populate("user")



// NIN eu quero saber se os "likes.userId" se nenhum usuário conector oucriou alguma coisa. se o usuário já não deu like nesse tweet
const likesService = (id, userId) =>  
Tweet.findOneAndUpdate({// forma correta de contar likes
    _id: id,
    "likes.userId": { $nin: [userId]}//varificand se nehum usuario criou algo com esse id como um like

},
{// Se for o primeiro like, vamos dar um push no array com o id do usuário e a data do like:

  $push: {// criamos o campo likes:
      likes: { userId, created: new Date() }// registra data que foi dado o like
  }
},
{//E, por fim, precisamos colocar um rawResult: true para o MongoDB retornar o resultado dos procedimentos acima:


rawResult: true,// retotna o resultado bruto do mongoDB
},
);

module.exports = {
  findAllCharactersService,
  findCharacterByIdServicer,
  createCharacterService,
  updateCharacterService,
  deleteCharacterService,
  searchCharacterService
};
