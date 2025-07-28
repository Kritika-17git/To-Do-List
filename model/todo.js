import mongoose from 'mongoose';
const newTodos = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    checked: {
    type: Boolean,
    default: false,
  }
}
)

const Todos = mongoose.model('Todos',newTodos);
export default Todos;