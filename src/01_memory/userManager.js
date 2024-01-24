class UserManager {
    static #users = [];

    constructor(data){
        this.id= 
        UserManager.#users.length === 0
        ? 1
        : UserManager.#users[UserManager.#users.length - 1].id + 1; // Estamos usando operador Ternario
        this.name = data.name;
        this.photo = data.photo;
        this.email = data.email;
       
        UserManager.#users.push(this)
    }

    create(data){
        const user = {
            id: 
            UserManager.#users.length === 0
            ? 1
            : UserManager.#users[UserManager.#users.length - 1].id + 1, // Estamos usando operador Ternario
            name: data.name,
            photo: data.photo,
            email: data.email
            
        }  
        UserManager.#users.push(user);           
        //  console.log(UserManager.#users);        
    }
    read() {
        return UserManager.#users;
      }
    readOne(id){
        return UserManager.#users.find((each) => each.id === Number(id));
    }
    destroy(id) {
        try {
          let one = UserManager.#users.find((each) => each.id === Number(id));
          if (!one) {
            throw new Error("There isn't any event with id n°"+ id);
          } else {
            UserManager.#users = UserManager.#users.filter(
              (each) => each.id !== Number(id))          
                return "User "+id + " deleted successfully";              
          }
        } catch (error) {
       
          return error.message;
        }
      }
      update(id,newData){
        try {
          const userIndex = UserManager.#users.findIndex((each) => each.id === (id));
          if (userIndex === -1) {
            throw new Error("No existe un producto con el ID " + id);
          }
          UserManager.#users[userIndex] = {
            ...UserManager.#users[userIndex],
            ...newData
          };
          console.log("Usuario actualizado con éxito");
       
        
          return UserManager.#users[userIndex];
        
        } catch (error) {
          return error.message;
        }
      }


}

const Users = new UserManager({

    name: "Carlos",
    photo: "URL",
    email: "prueba2@hotmail.com"

});

Users.create({

    name: "Jose",
    photo: "URL",
    email: "prueba1@hotmail.com"

  });

console.log(Users.read());
// console.log(Users.readOne(1));
// console.log(Users.destroy(2));
// console.log(Users.read());

Users.update(2,{

  name: "Jose actualizado",
  photo: "URL",
  email: "prueba1@hotmail.com"

});

console.log(Users.read());