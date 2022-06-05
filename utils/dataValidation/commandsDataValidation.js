const Joi =require("joi")

/******************************************************
 * Validating all the data coming in when creating a new command
 * **************************************************** */
const CreateCommandBodyValid = async (body)=>{
        const schema = Joi.object({
                softwareType: Joi.string().min(3).max(10).required().lowercase(),
                operatingSys: Joi.string().min(3).max(10).required(),
                command: Joi.string().min(3).max(40).required(),
                description: Joi.string().min(3),
                authorId: Joi.string().required(),
                otherShortCut: Joi.string().min(3),
        })
        return schema.validate(body);
    }


/******************************************************
 * Validating all the data coming in when creating a new user
 * **************************************************** */
const CreateUserBodyValid = async (body)=>{
        const schema = Joi.object({
                firstName: Joi.string().min(3).max(10).required(),
                firstName: Joi.string().min(3).max(10).required(),
                email: Joi.string().email().required(),
                password: Joi.string().required()
               
        })
        return schema.validate(body);
    }

/******************************************************
 * Validating all the data coming in when updating a command
 * **************************************************** */
const UpdateCommandBodyValid = async (body)=>{
        const schema = Joi.object({
                softwareType: Joi.string().min(3).max(10).required(),
                operatingSys: Joi.string().min(3).max(10).required(),
                command: Joi.string().min(3).max(40).required(),
                description: Joi.string().min(3),
                authorId: Joi.string().min(3).required(),
                otherShortCut: Joi.string().min(3),
        })
        return schema.validate(body);
    }




    module.exports={
         CreateCommandBodyValid,
         UpdateCommandBodyValid,
         CreateUserBodyValid,
    }